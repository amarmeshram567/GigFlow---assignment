import { ArrowRight, Briefcase, LayoutDashboard, TextIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';



const Hero = () => {

    const { isAuthenticated } = useAppContext()

    return (
        <div className='relative h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-white to-white py-20 lg:py-32'>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600">
                        <Briefcase className='h-4 w-4' />
                        The Modern Freelance Marketplace
                    </div>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl lg:text-6xl">
                        Connect, Bid, and <span className="text-blue-600">Get Hired</span>
                    </h1>
                    <p className='mb-8 text-lg text-gray-600 sm:text-xl'>
                        GigFlow brings clients and freelancers together. Post your project, receive competitive bids, and hire the best talent for your needs.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        {
                            isAuthenticated ? (
                                <Link to='/gigs'>
                                    <button className="w-full text-white bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 duration-200 flex items-center justify-center gap-2 mt-5">
                                        <LayoutDashboard className='h-4 w-4' />  Browse Gigs
                                    </button>
                                </Link>
                            ) : (
                                <Link to='/login'>
                                    <button className="w-full sm:w-auto text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                                        Get Started Free <ArrowRight className='h-4 w-4' />
                                    </button>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-50 blur-3xl"></div>
        </div>
    );
}

export default Hero;
