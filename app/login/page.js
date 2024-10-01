"use client"
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams()
    const nextParam = searchParams.get('next')
    const next = nextParam || '/';

    useEffect(() => {
        console.log(next)
        if (session) {
            router.push(next || '/');
        }
    }, [session]);

    const handleInputChange = () => {
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            redirect: false,
            username,
            password,
            callbackUrl: next,
        });

        if (!res.ok) {
            if(res.error == 'CredentialsSignin')
                setError("Invalid Username or Password");
        } else {
            await router.push(next || '/');
            toast.success('Login Successful!');
        }
    };

    return (
        <div className="space-y-4 m-lg-4 m-12">
            <div className="bg-white">
                <div className="flex justify-center">
                    <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)' }}>
                        <div className="flex items-center h-full px-20 bg-zinc-900 bg-opacity-40">

                        </div>
                    </div>
                    <div className="flex items-center w-full max-w-md px-6 py-16 mx-auto lg:w-2/4">
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-center text-zinc-700">MindFlow</h2>
                                <p className="mt-3 text-zinc-500">Sign in to access your account</p>
                            </div>
                            <div className="mt-8">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm text-zinc-600">Username</label>
                                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onFocus={handleInputChange} placeholder="Your Username" className="block w-full px-4 py-2 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="text-sm text-zinc-6000">Password</label>
                                            <a href="#" className="text-sm text-zinc-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                        </div>
                                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={handleInputChange} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mt-6">
                                        {error && <p className="text-red-500">{error}</p>}
                                    </div>
                                    <div className="mt-6">
                                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">Sign in</button>
                                    </div>
                                </form>
                                <p className="mt-6 text-sm text-center text-zinc-400">Don&apos;t have an account yet? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
