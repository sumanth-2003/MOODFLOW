"use client";
import { useEffect, useState } from 'react';
import { FaBed, FaUtensils, FaWater, FaHeartbeat } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getSession, useSession } from 'next-auth/react';

export default function HealthPage() {
    const [formData, setFormData] = useState({
        wakeUpTime: '06:00',
        sleepTime: '10:00',
        foodIntake: '',
        waterIntake: '',
        additionalData: ''
    });
    const { data: session, status } = useSession();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

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
            setHealthData(data);
        };

        fetchHealthData();
    }, []);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return new Date(1970, 0, 1, hours, minutes);
    };

    const sleepData = healthData.map((entry) => ({
        date: new Date(entry.date),
        wakeUpTime: formatTime(entry.wakeUpTime),
        sleepTime: formatTime(entry.sleepTime),
    }));

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
                        name="wakeUpTime"
                        value={formData.wakeUpTime}
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
                        name="additionalData"
                        value={formData.additionalData}
                        onChange={handleChange}
                        className="input-field p-2 border rounded w-full"
                    ></textarea>
                </div>
                <div className="flex justify-center lg:col-span-2">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Submit</button>
                </div>
            </form>
            {sleepData && <div className="mt-8">
                <h2 className="text-2xl font-bold text-center mb-4">Sleep Data for the Past 7 Days</h2>
                <div className="flex justify-center">
                    <LineChart width={600} height={300} data={sleepData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                        <YAxis />
                        <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
                        <Legend />
                        <Line type="monotone" dataKey="wakeUpTime" stroke="#8884d8" name="Wake Up Time" />
                        <Line type="monotone" dataKey="sleepTime" stroke="#82ca9d" name="Sleep Time" />
                    </LineChart>
                </div>
            </div>}
        </div>
    );
}
