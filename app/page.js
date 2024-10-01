import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'MoodFlow - Your Mental Health Companion',
    description: 'MoodFlow offers tools to help you manage mental health and wellbeing, including journaling, meditation, and access to professional therapists.'
};

export default function Home() {
    return (
        <div className="container mx-auto my-4 p-4">
            <h1 className="text-4xl font-bold text-center my-4">Welcome to MoodFlow</h1>
            <p className="text-center mb-8 text-lg">Your mental health and wellbeing companion</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/journaling" className="block p-4 text-center border bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image className="rounded-t-lg mx-auto" src="https://static.vecteezy.com/system/resources/previews/002/889/592/original/cartoon-man-dreams-of-money-house-and-luxury-car-while-sleeping-illustration-free-vector.jpg" alt="Journaling" width={300} height={200} />
                    <h2 className="text-2xl font-semibold mt-2">Dream Analysis</h2>
                    <p className="mt-1 text-gray-600">Express your dreams and thoughts</p>
                </Link>
                <Link href="/meditation" className="block p-4 text-center border bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image className="rounded-t-lg mx-auto" src="https://i.pinimg.com/736x/5d/c2/5a/5dc25a28453c5e9f2caef5a224e248b2.jpg" alt="Meditation" width={300} height={200} />
                    <h2 className="text-2xl font-semibold mt-2">Health Snapshot</h2>
                    <p className="mt-1 text-gray-600">Analyse your Food, Hydration & Sleep</p>
                </Link>
                <Link href="/therapy" className="block p-4 text-center border bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image className="rounded-t-lg mx-auto" src="https://media.istockphoto.com/id/1180078592/vector/business-handshake-icon-handshake-of-business-partners-business-handshake-successful-deal.jpg?s=612x612&w=0&k=20&c=j9sl8MLcSTCTSXG2vvP7zuakvjCJ_rJJEYI3U3iVQE4=" alt="Therapy" width={300} height={200} />
                    <h2 className="text-2xl font-semibold mt-2">Healing Starts Here</h2>
                    <p className="mt-1 text-gray-600">Connect with a professional</p>
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row items-center mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="lg:w-1/2 w-full">
                    <img className="w-full h-auto object-cover" src="https://static.vecteezy.com/system/resources/previews/024/105/801/original/mood-swings-woman-emotions-change-psychology-disorder-mental-problem-stress-anxiety-and-life-crisis-bipolar-emotion-emotional-balance-modern-flat-cartoon-style-illustration-vector.jpg" alt="MoodFlow" />
                </div>
                <div className="lg:w-1/2 w-full p-6 lg:pl-8 lg:py-8">
                    <h2 className="text-3xl font-bold text-center lg:text-left mb-4 text-gray-800">Why Choose MoodFlow?</h2>
                    <p className="text-center lg:text-left mb-6 text-lg text-gray-600">MoodFlow offers a set of tools to help you manage mental health & wellbeing.</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
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
