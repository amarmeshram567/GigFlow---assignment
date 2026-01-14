import { useEffect, useState } from "react";
import { FileText, Plus, X } from "lucide-react";
import CreateGigForm from "../components/CreateGigForm";
import { useAppContext } from "../context/AppContext";
import GigList from "../components/GigList";

const MyGig = () => {
    const { user, gigs, fetchGigs } = useAppContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [myGigs, setMyGigs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log(myGigs)

    // Load gigs if not already loaded
    useEffect(() => {
        const loadGigs = async () => {
            setIsLoading(true);
            await fetchGigs();
            setIsLoading(false);
        };
        if (!gigs || gigs.length === 0) loadGigs();
        else setIsLoading(false);
    }, [fetchGigs, gigs]);

    // Filter my gigs
    useEffect(() => {
        if (user && gigs && gigs.length > 0) {
            const filtered = gigs.filter(g => (g.ownerId?._id || g.ownerId) === user._id);
            setMyGigs(filtered);
        }
    }, [gigs, user]);

    return (
        <div className="min-h-screen bg-white pb-10">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            My Gigs
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage your posted gigs and review bids
                        </p>
                    </div>

                    <div>
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:opacity-90"
                        >
                            <Plus className="h-4 w-4" />
                            Create New Gig
                        </button>
                    </div>
                </div>

                {isDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 sm:max-w-lg w-full relative">
                            <h2 className="font-display text-xl font-bold mb-4">Create New Gig</h2>
                            <CreateGigForm
                                onSuccess={() => {
                                    setIsDialogOpen(false);
                                    fetchGigs(); // refresh gigs
                                }}
                            />
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <X className='h-5 w-5' />
                            </button>
                        </div>
                    </div>
                )}

                {isLoading ? (

                    <div className="flex min-h-screen items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                    </div>

                ) : (
                    <GigList gigs={gigs} emptyMessage="You haven't created any gigs yet" />
                )}
            </main>
        </div>
    );
};

export default MyGig;
