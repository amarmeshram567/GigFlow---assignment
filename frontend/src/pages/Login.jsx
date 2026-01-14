import { Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const Login = () => {

    const { setUser } = useAppContext()

    const [state, setState] = useState('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    // const from = location.state?.from?.pathname || "/gigs";

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await api.post(`/api/auth/${state}`, {
                name, email, password
            })

            if (data.success) {
                navigate("/")
                setUser(data.user)
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
                <h2 className="mb-2 text-center text-2xl font-bold">
                    {state === 'login' ? "Welcome Back" : "Create and account"}
                </h2>
                <p className="mb-6 text-center text-sm text-gray-500">
                    {state === 'login' ? "Login to your GigFlow account" : "Join GigFlow start your freelancing journey"}
                </p>

                <form onSubmit={handleSubmit} className='space-y-4'>

                    {
                        state === 'register' && (
                            <div>
                                <label htmlFor="name" className='mb-1 block text-sm font-medium'>Name</label>
                                <div className="relative">
                                    <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        id='name'
                                        type="text"
                                        placeholder='type here'
                                        className='w-full rounded border border-gray-200 py-2 pl-9 pr-3 focus:outline-none   focus:ring-2 focus:ring-blue-500'
                                    />
                                </div>
                            </div>
                        )
                    }
                    <div>
                        <label htmlFor="email" className='mb-1 block text-sm font-medium'>Email</label>
                        <div className="relative">
                            <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id='email'
                                type="email"
                                placeholder='type here'
                                className='w-full rounded border border-gray-200 py-2 pl-9 pr-3 focus:outline-none   focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className='mb-1 block text-sm font-medium'>Password</label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
                            <input
                                id='password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='type here'
                                className='w-full rounded border border-gray-200 py-2 pl-9 pr-3 focus:outline-none   focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50'
                    >
                        {state === 'register' ? "Create Account" : "Login"}
                    </button>
                </form>
                {state === 'register' ? (
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have account?{" "}

                        <span onClick={() => setState("login")} className='text-blue-600 hover:underline cursor-pointer'> click here</span>
                    </p>
                ) : (
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Create an account?{" "}

                        <span onClick={() => setState("register")} className='text-blue-600 hover:underline cursor-pointer'> click here</span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
