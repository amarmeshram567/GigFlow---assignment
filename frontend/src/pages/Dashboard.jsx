import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import api from '../services/api';
import toast from 'react-hot-toast';



const Dashboard = () => {

    const { user } = useAppContext()

    const [activeTab, setActiveTab] = useState("my-gigs")
    const [myGigs, setMyGigs] = useState([])
    const [myBids, setMyBids] = useState([])
    const [hiredProjects, setHiredProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [showCreate, setShowCreate] = useState(false)
    const [newGig, setNewGig] = useState({
        title: "",
        description: "",
        budget: ""
    })

    const tabs = [
        "my-gigs", "my-bids", "hired"
    ]

    // const fetchDashboard = async () => {
    //     setIsLoading(true)
    //     try {
    //         const { data } = await api.get('/api/gigs')
    //         if (data.success) {
    //             setMyGigs(data.gigs || [])
    //         }

    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    //     finally {
    //         setIsLoading(false)
    //     }
    // }

    const fetchDashboard = async () => {
        if (!user?._id) return;
        setIsLoading(true);

        try {
            const { data } = await api.get("/api/gigs");
            if (!data.success) return;

            const allGigs = data.gigs || [];

            // My Gigs
            const ownedGigs = allGigs.filter(gig => gig.ownerId?._id === user._id);
            setMyGigs(ownedGigs);

            // My Bids & Hired → NOT POSSIBLE with current API
            setMyBids([]);
            setHiredProjects([]);

        } catch (error) {
            toast.error("Failed to load dashboard");
        } finally {
            setIsLoading(false);
        }
    };



    const handleCreateGig = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const { data } = await api.post('/api/gigs', {
                title: newGig.title,
                description: newGig.description,
                budget: parseFloat(newGig.budget)
            })
            if (data.success) {
                setMyGigs(prev => [...prev, data.gig])
                setNewGig({
                    title: "",
                    description: "",
                    budget: ""
                })
                setShowCreate(false)
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create gig")
        }
        finally {
            setIsSubmitting(false)
        }
    }

    console.log("my bids", myBids)
    console.log("my gigs", myGigs)


    useEffect(() => {
        if (user) {
            fetchDashboard()
        }
    }, [user])


    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        )
    }

    return (
        <div className='container h-screen mx-auto px-4 py-8'>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Manage your gigs and bids</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                >
                    Post a Gig
                </button>
            </div>

            {/* create Gig Modal */}
            {showCreate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded bg-white p-6">
                        <h2 className="mb-4 text-xl font-semibold">Create New Gig</h2>
                        <form onSubmit={handleCreateGig} className='space-y-3'>
                            <input
                                type="text"
                                placeholder="Title"
                                value={newGig.title}
                                onChange={(e) =>
                                    setNewGig({ ...newGig, title: e.target.value })
                                }
                                className="w-full rounded border border-gray-300 px-3 py-2 outline-blue-500"
                            />
                            <textarea
                                placeholder='Description'
                                value={newGig.description}
                                onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                                className='w-full rounded border border-gray-300 px-3 py-2 outline-blue-500'
                            />
                            <input
                                type="number"
                                placeholder='Budget'
                                value={newGig.budget}
                                onChange={(e) => setNewGig({ ...newGig, budget: e.target.value })}
                                className='w-full rounded border border-gray-300 px-3 py-2 outline-blue-500'
                            />
                            <div className='flex gap-3'>
                                <button
                                    type='button'
                                    onClick={() => setShowCreate(false)}
                                    className='flex-1 rounded  bg-red-600 hover:bg-red-500 text-white px-4 py-2'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='flex-1 rounded bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating..." : "Create Gig"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="mb-6 flex gap-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 ${activeTab === tab ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
                    >
                        {tab.replace("-", " ").toLocaleUpperCase()}
                    </button>
                ))}
            </div>

            {/* My Gigs */}
            {activeTab === "my-gigs" && (
                <div className="space-y-4">
                    {myGigs.length === 0 ? (
                        <p className="text-gray-500">No gigs posted yet.</p>
                    ) : (
                        myGigs.map((gig) => (
                            <Link to={`/gigs/${gig._id}`}
                                key={gig._id}
                                className='block rounded border border-gray-200 p-4 hover:shadow'>
                                <h3 className="font-semibold">{gig.title}</h3>
                                <p className="text-sm text-gray-500">
                                    Budget: ${gig.budget}
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            )}

            {/* My Bids */}
            {activeTab === "my-bids" && (
                <div className="space-y-4">
                    {myBids.length === 0 ? (
                        <p className="text-gray-500">No active bids.</p>
                    ) : (
                        myBids.map(bid => (
                            <div key={bid._id} className="rounded border border-gray-200 p-4">
                                <h3 className="font-semibold">{bid.gigTitle}</h3>
                                <p className="text-sm text-gray-500">
                                    Bid: ${bid.price} | Status: {bid.status}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Hired */}
            {activeTab === 'hired' && (
                <div className="space-y-4">
                    {hiredProjects.length === 0 ? (
                        <p className="text-gray-500">
                            No hired projects yet.
                        </p>
                    ) : (
                        hiredProjects.map((project) => (
                            <div key={project._id} className="rounded border border-gray-200 p-4">
                                <h3 className="font-semibold">{project.gigTitle}</h3>
                                <p className="text-sm text-green-600">
                                    Hired | ${project.price}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
