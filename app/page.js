import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaArrowRight } from 'react-icons/fa';

export const metadata = {
    title: 'MoodFlow - Your Mental Health Companion',
    description: 'MoodFlow offers tools to help you manage mental health and wellbeing, including journaling, meditation, and access to professional therapists.'
};

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-blue-50 to-teal-50 py-8">
            <div className="text-center mb-16">
                <h1 className="text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-teal-400 bg-clip-text text-transparent my-4 drop-shadow-lg">
                    Welcome to MoodFlow
                </h1>
                <p className="text-2xl text-gray-800 mb-4 font-medium">
                    Your mental health and wellbeing companion
                </p>
                <p className="text-xl text-purple-800">
                    Discover tools to support your mental health journey.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                        <Image className="rounded-lg" src="https://easydrawingguides.com/wp-content/uploads/2020/08/Open-Book-Step-10.png" alt="Dream Analysis" width={300} height={200} />
                        <div className="flex flex-col flex-grow justify-end w-full text-center mt-auto">
                            <h2 className="text-3xl font-bold text-purple-700 mt-4 transition-colors">
                                Analysis Journal
                            </h2>
                            <p className="text-gray-600 mt-2 pb-4">Connect the Dots in Your Life Story</p>
                            <Link href="/journal">
                                <button className="my-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-colors">
                                    <p className='inline-flex items-center'>Start Journaling&nbsp; <FaArrowRight /></p>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                        <Image className="rounded-lg" src="https://i.pinimg.com/736x/5d/c2/5a/5dc25a28453c5e9f2caef5a224e248b2.jpg" alt="Health Snapshot" width={300} height={200} />
                        <div className="flex flex-col flex-grow justify-end w-full text-center mt-auto">
                            <h2 className="text-3xl font-bold text-purple-700 mt-4 transition-colors">
                                Health Snapshot
                            </h2>
                            <p className="text-gray-600 mt-2 pb-4">Analyze your Food, Hydration & Sleep</p>
                            <Link href="/health">
                                <button className="my-4 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors">
                                    <p className='inline-flex items-center'>Start Health Analysis&nbsp; <FaArrowRight /></p>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                        <Image className="rounded-lg mt-4" src="https://media.istockphoto.com/id/1180078592/vector/business-handshake-icon-handshake-of-business-partners-business-handshake-successful-deal.jpg?s=612x612&w=0&k=20&c=j9sl8MLcSTCTSXG2vvP7zuakvjCJ_rJJEYI3U3iVQE4=" alt="Therapy" width={300} height={200} />
                        <div className="flex flex-col flex-grow justify-end w-full text-center mt-auto">
                            <h2 className="text-3xl font-bold text-purple-700 mt-4 transition-colors">
                                Healing Starts Here
                            </h2>
                            <p className="text-gray-600 mt-2 pb-4">Connect with a professional</p>
                            <Link href="/consult">
                                <button className="my-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-500 transition-colors">
                                    <p className='inline-flex items-center'>Start Consulting&nbsp; <FaArrowRight /></p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-16 flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="lg:w-1/2 w-full">
                    <img className="w-full h-auto object-cover" src="https://static.vecteezy.com/system/resources/previews/024/105/801/original/mood-swings-woman-emotions-change-psychology-disorder-mental-problem-stress-anxiety-and-life-crisis-bipolar-emotion-emotional-balance-modern-flat-cartoon-style-illustration-vector.jpg" alt="MoodFlow" />
                </div>
                <div className="lg:w-1/2 w-full p-6 lg:pl-8 lg:py-8">
                    <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-700 to-teal-400 bg-clip-text text-transparent text-center lg:text-left mb-4 drop-shadow-lg" style={{ lineHeight: 'normal' }}>
                        Why Choose MoodFlow?
                    </h2>
                    <p className="text-lg text-gray-700 text-center lg:text-left mb-6 font-medium">
                        MoodFlow offers a set of tools to help you manage mental health & wellbeing.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Personalized journaling prompts to help you reflect on your day</li>
                        <li>Guided meditations to help you relax and unwind</li>
                        <li>Access to professional therapists for personalized support</li>
                        <li>Track your mood and identify patterns over time</li>
                        <li>Join a supportive community of like-minded individuals</li>
                    </ul>
                </div>
            </div>

            <footer className="mt-16 bg-purple-700 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold">Connect </h3>
                            <p className="text-md mt-2">Your mental health companion.</p>
                            <p className="text-sm mt-1">Email: support@moodflow.com</p>
                            <p className="text-sm">Phone: +1 123 456 7890</p>
                        </div>
                        <div className="flex space-x-6 text-2xl">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                    <div className="text-center text-sm mt-6">
                        &copy; 2024 MoodFlow. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}