"use client";
import { useEffect, useState } from 'react';
import { FaBed, FaUtensils, FaWater, FaHeartbeat } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { useSession } from 'next-auth/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function HealthPage() {
    const [formData, setFormData] = useState({
        wakeTime: '06:00',
        sleepTime: '10:00',
        foodIntake: '',
        waterIntake: '',
        additionalHealthData: ''
    });
    const { data: session, status } = useSession();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (session) {
            formData.username = session.user.username;
        }
        const response = await fetch('/api/health', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert('Data submitted successfully');
        } else {
            alert('Failed to submit data');
        }
    };

    const [healthData, setHealthData] = useState([]);

    useEffect(() => {
        const fetchHealthData = async () => {
            const response = await fetch('/api/health');
            const data = await response.json();
            setHealthData(data.healthRecords);
        };

        fetchHealthData();
    }, []);

    const calculateSleepDuration = (sleepTime, wakeTime) => {
        const sleepDate = formatTime(sleepTime);
        const wakeDate = formatTime(wakeTime);
        let duration = (wakeDate - sleepDate) / (1000 * 60 * 60); 
        
        if (duration < 0) {
            duration += 24;
        }
        return duration;
    };

    const formatTime = (time) => {
        if (!time) return null;
        const [hours, minutes] = time.split(':');
        return new Date(1970, 0, 1, hours, minutes);
    };

    const sleepData = [];
    for (let i = 0; i < healthData.length - 1; i++) {
        const currentRecord = healthData[i];
        const nextRecord = healthData[i + 1];

        const currentDate = new Date(currentRecord.createdAt);
        const nextDate = new Date(nextRecord.createdAt);

        if (currentDate.toDateString() === nextDate.toDateString() && currentRecord.sleepTime && nextRecord.wakeTime) {
            const duration = calculateSleepDuration(currentRecord.sleepTime, nextRecord.wakeTime);
            sleepData.push({
                date: currentDate.toLocaleDateString(),
                sleepDuration: duration
            });
        }
    }

    console.log(sleepData)

    const data = {
        labels: sleepData.map(entry => entry.date),
        datasets: [
            {
                label: 'Sleep Duration (hours)',
                data: sleepData.map(entry => entry.sleepDuration),
                borderColor: '#8884d8',
                fill: false,
            },
        ],
    };

    return (
        <div className="container mx-auto p-4" style={{ minHeight: '95vh' }}>
            <h1 className="text-3xl font-bold text-center mb-8">Health Data Input</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaBed className="text-2xl mr-2" />
                        <label className="font-semibold">Wake Up Time</label>
                    </div>
                    <input
                        type="time"
                        name="wakeTime"
                        value={formData.wakeTime}
                        onChange={handleChange}
                        className="input-field p-2 border rounded w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaBed className="text-2xl mr-2" />
                        <label className="font-semibold">Sleep Time</label>
                    </div>
                    <input
                        type="time"
                        name="sleepTime"
                        value={formData.sleepTime}
                        onChange={handleChange}
                        className="input-field p-2 border rounded w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaUtensils className="text-2xl mr-2" />
                        <label className="font-semibold">Food Intake</label>
                    </div>
                    <input
                        type="text"
                        name="foodIntake"
                        value={formData.foodIntake}
                        onChange={handleChange}
                        className="input-field p-2 border rounded w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaWater className="text-2xl mr-2" />
                        <label className="font-semibold">Water Intake (in liters)</label>
                    </div>
                    <input
                        type="number"
                        name="waterIntake"
                        value={formData.waterIntake}
                        onChange={handleChange}
                        className="input-field p-2 border rounded w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaHeartbeat className="text-2xl mr-2" />
                        <label className="font-semibold">Additional Health Data</label>
                    </div>
                    <textarea
                        name="additionalHealthData"
                        value={formData.additionalHealthData}
                        onChange={handleChange}
                        className="input-field p-2 border rounded w-full"
                    ></textarea>
                </div>
                <div className="flex justify-center lg:col-span-2">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Submit</button>
                </div>
            </form>
            {sleepData.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-center mb-4">Sleep Data for the Past Days</h2>
                    <div className="flex justify-center">
                        <Line data={data} />
                    </div>
                </div>
            )}
        </div>
    );
}
