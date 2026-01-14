import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GigCard from "../components/GigCard";
import { useAppContext } from "../context/AppContext";



const Gigs = () => {

    const { gigs } = useAppContext()

    const [search, setSearch] = useState("");
    const [filteredGigs, setFilteredGigs] = useState(gigs);
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        if (!search) {
            setFilteredGigs(gigs)
            setSearching(false)
            return;
        }

        setSearching(true);
        const timer = setTimeout(() => {
            const filtered = gigs.filter(
                gig => gig.title.toLowerCase().includes(search.toLowerCase()) || gig.description.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredGigs(filtered)
            setSearching(false)
        }, 1000)

        return () => clearTimeout(timer);
    }, [search, gigs])

    return (
        <div className="container h-screen mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Browse Gigs</h1>
                    <p className="text-gray-500 text-sm mt-1.5">Find your next opportunity</p>
                </div>
                <div className="mb-6 max-w-md">
                    <input
                        type="text"
                        placeholder="Search gigs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded border border-gray-300 px-2 py-1.5 outline-blue-500"
                    />
                </div>
            </div>

            {searching ? (
                <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-10">
                    {filteredGigs.map((gig) => (
                        <GigCard key={gig._id} gig={gig} />
                    ))}
                </div>
            )}

            {/* Gigs Grid */}
            {filteredGigs.length === 0 && (
                <p className="text-gray-500 text-center">
                    {search ? `No gigs found for "${search}"` : "No gigs available"}
                </p>
            )}
        </div>
    );
};

export default Gigs;
