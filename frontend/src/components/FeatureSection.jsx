import { ArrowRight, Briefcase, CheckCircle, DollarSign, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FeatureSection = () => {

    const features = [
        {
            icon: Briefcase,
            title: "Post Gigs",
            description: "Create job listings and find the perfect freelancer for your project."
        },
        {
            icon: Users,
            title: "Bid & Compete",
            description: "Browse opportunities and submit competitive bids to win projects."
        },
        {
            icon: DollarSign,
            title: "Hire & Pay",
            description: "Review bids, hire talent, and manage payments securely."
        }
    ]

    const benefits = [
        "No platform fees for posting gig",
        "Direct communication with freelancers",
        "Secure authentication via JWT",
        "Real-time bid notifications"
    ]

    return (
        <>
            <div className='border-y border-gray-200 bg-white py-20'>
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">How It Works</h2>
                        <p className="text-gray-600">Simple steps to get your project done</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {
                            features.map((features, index) => (
                                <div key={index} className='group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg'>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                        <features.icon className='h-6 w-6' />
                                    </div>
                                    <div className="absolute right-6 top-6 text-5xl font-bold text-gray-200">{index + 1}</div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-800">{features.title}</h3>
                                    <p className="text-gray-600">{features.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-800">Why Choose GigFlow?</h2>
                            <p className="mb-8 text-lg text-gray-600">
                                We've built a platform that puts both clients and freelancers first, with no hidden fees and transparent processes.
                            </p>
                            <ul className="space-y-4">
                                {
                                    benefits.map(benefit => (
                                        <li key={benefit} className="flex items-center gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                                <CheckCircle className='h-4 w-4 text-blue-600' />
                                            </div>
                                            <span className="text-gray-800">{benefit}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-100" />
                                        <div className="flex-1 space-y-2">
                                            <div className='h-4 w-3/4 rounded bg-gray-200' />
                                            <div className="h-3 w-1/2 rounded bg-gray-200" />
                                        </div>
                                    </div>
                                    <div className='h-20 rounded-lg bg-gray-200/50' />
                                    <div className="flex items-center justify-between">
                                        <div className="h-8 w-24 rounded bg-blue-200/50" />
                                        <div className="h-8 w-20 rounded bg-blue-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-blue-100" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 bg-blue-500 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white">Ready to Start?</h2>
                    <p className="mb-8 text-lg text-white/80">
                        Join thousands of freelancers and clients on GigFlow today.
                    </p>
                    <Link to="/register">
                        <button className='inline-flex items-center gap-2 px-6 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800'>
                            Create Your Account <ArrowRight className='h-4 w-4' />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default FeatureSection;
