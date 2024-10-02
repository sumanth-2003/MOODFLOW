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
        sleepTime: '22:00',
        foodIntake: '',
        waterIntake: '',
        additionalHealthData: ''
    });
    const { data: session } = useSession();
    const [healthData, setHealthData] = useState([]);

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
            const newRecord = await response.json();
            setHealthData((prevData) => [...prevData, newRecord.healthRecord]);
            alert('Data submitted successfully');
        } else {
            alert('Failed to submit data');
        }
    };

    useEffect(() => {
        const fetchHealthData = async () => {
            const response = await fetch('/api/health');
            const data = await response.json();
            setHealthData(data.healthRecords);
        };

        fetchHealthData();
    }, []);

    const calculateSleepDuration = (sleepTime, wakeTime, createdAt) => {
        const sleep = new Date(createdAt);
        const wake = new Date(createdAt);
        const [sleepHour, sleepMinute] = sleepTime.split(':').map(Number);
        const [wakeHour, wakeMinute] = wakeTime.split(':').map(Number);
        sleep.setHours(sleepHour, sleepMinute, 0, 0);
        wake.setHours(wakeHour, wakeMinute, 0, 0);
        if (wake < sleep) {
            wake.setDate(wake.getDate() + 1);
        }
        const duration = (wake - sleep) / (1000 * 60 * 60);
        return duration;
    };

    const sleepData = healthData.map((entry) => {
        const duration = calculateSleepDuration(entry.sleepTime, entry.wakeTime, entry.createdAt);
        return {
            date: new Date(entry.createdAt).toLocaleDateString(),
            sleepDuration: duration,
            waterIntake: entry.waterIntake
        };
    });

    const sleepChartData = {
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

    const hydrationChartData = {
        labels: sleepData.map(entry => entry.date),
        datasets: [
            {
                label: 'Water Intake (liters)',
                data: sleepData.map(entry => entry.waterIntake),
                borderColor: '#82ca9d',
                fill: false,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-blue-50 to-teal-50 py-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-teal-400 bg-clip-text text-transparent text-center my-8">
                Health Data Input
            </h1>
            <form onSubmit={handleSubmit} className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaBed className="text-2xl mr-2" />
                        <label className="font-semibold text-purple-700">Yesterday&apos;s Sleep Time</label>
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
                        <FaBed className="text-2xl mr-2" />
                        <label className="font-semibold text-purple-700">Wake Up Time</label>
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
                        <FaUtensils className="text-2xl mr-2" />
                        <label className="font-semibold text-purple-700">Food Intake</label>
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
                        <label className="font-semibold text-purple-700">Water Intake (liters)</label>
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
                        <label className="font-semibold text-purple-700">Additional Health Data</label>
                    </div>
                    <textarea
                        name="additionalHealthData"
                        value={formData.additionalHealthData}
                        onChange={handleChange}
                        className="input-field p-2 border rounded w-full"
                    ></textarea>
                </div>
                <div className="flex justify-center lg:col-span-2">
                    <button type="submit" className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-500 transition duration-300">
                        Submit
                    </button>
                </div>
            </form>

            {sleepData.length > 0 && (
                <div className="mt-8 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">Sleep Data for the Past Days</h2>
                        <Line data={sleepChartData} />
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-teal-700 text-center mb-4">Hydration Intake (liters)</h2>
                        <Line data={hydrationChartData} />
                    </div>
                </div>
            )}
        </div>
    );
}