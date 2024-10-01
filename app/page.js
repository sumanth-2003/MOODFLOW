import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-4">Welcome to MoodFlow</h1>
            <p className="text-center mb-8 text-lg">Your mental health and wellbeing companion</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/journaling" className="block p-4 text-center border bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image className="rounded-t-lg mx-auto" src="https://static.vecteezy.com/system/resources/previews/002/889/592/original/cartoon-man-dreams-of-money-house-and-luxury-car-while-sleeping-illustration-free-vector.jpg" alt="Journaling" width={300} height={200} />
                    <h2 className="text-2xl font-semibold mt-2">Dream Analysis</h2>
                    <p className="mt-1 text-gray-600">Express your dreams and thoughts</p>
                </Link>
                <Link href="/meditation" className="block p-4 text-center border bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image className="rounded-t-lg" src="/images/meditation.jpg" alt="Meditation" width={300} height={200} />
                    <h2 className="text-2xl font-semibold mt-2">Health Snapshot</h2>
                    <p className="mt-1 text-gray-600">Analyse your Food, Hydration & Sleep</p>
                </Link>
                <Link href="/therapy" className="block p-4 text-center border bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image className="rounded-t-lg" src="/images/therapy.jpg" alt="Therapy" width={300} height={200} />
                    <h2 className="text-2xl font-semibold mt-2">Therapy</h2>
                    <p className="mt-1 text-gray-600">Connect with a professional</p>
                </Link>
            </div>
            <div className="flex items-center mt-8 bg-white">
                <div className="w-1/2">
                    <img className="w-full h-auto rounded-md" src="https://static.vecteezy.com/system/resources/previews/024/105/801/original/mood-swings-woman-emotions-change-psychology-disorder-mental-problem-stress-anxiety-and-life-crisis-bipolar-emotion-emotional-balance-modern-flat-cartoon-style-illustration-vector.jpg" alt="MoodFlow" />
                </div>
                <div className="w-1/2 pl-8">
                    <h2 className="text-3xl font-bold text-center mb-4">Why Choose MoodFlow?</h2>
                    <p className="text-center mb-4 text-lg">MoodFlow offers a set of tools to help you manage mental health & wellbeing.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Personalized journaling prompts to help you reflect on your day</li>
                        <li>Guided meditations to help you relax and unwind</li>
                        <li>Access to professional therapists for personalized support</li>
                        <li>Track your mood and identify patterns over time</li>
                        <li>Join a supportive community of like-minded individuals</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
