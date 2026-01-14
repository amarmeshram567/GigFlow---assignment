import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { ArrowLeft, Calendar, DollarSign, MessageSquare, User } from "lucide-react";
import BidList from "../components/BidList";
import BidForm from "../components/BidForm";
import api from "../services/api";

const StatusBadge = ({ status }) => {
    const base = "rounded-full px-3 py-1 text-xs font-medium capitalize";

    const styles =
        status === "hired"
            ? "bg-green-100 text-green-700"
            : status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700";

    return <span className={`${base} ${styles}`}>{status}</span>;
};

const GigDetails = () => {
    const { id: gigId } = useParams();
    const { user, isAuthenticated, gigs, fetchBidsForGig, hireBid } = useAppContext();

    const [gig, setGig] = useState(null);
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isOwner = gig?.ownerId?.email === user?.email;

    const canBid = isAuthenticated && !isOwner && gig?.status === "open";

    const hasAlreadyBid = bids.some((b) => b.freelancerId?.email === user?.email);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // 1️⃣ Try to find in context gigs first
            let foundGig = gigs.find((g) => g._id?.toString() === gigId || g.id?.toString() === gigId);

            // 2️⃣ If not found, fetch all gigs from API
            if (!foundGig) {
                const { data } = await api.get("/api/gigs");
                foundGig = data.gigs.find((g) => g._id?.toString() === gigId || g.id?.toString() === gigId);
            }

            if (!foundGig) {
                toast.error("Gig not found");
                setGig(null);
                return;
            }

            setGig(foundGig);

            // Fetch bids for this gig
            const bidsData = await fetchBidsForGig(gigId);
            setBids(bidsData);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load gig details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (gigs.length > 0) {
            loadData();
        }
    }, [gigId, gigs]);


    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    if (!gig) {
        return (
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-16 text-center">
                    <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                        Gig not found
                    </h1>
                    <p className="mt-2 text-gray-500">
                        The gig you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        to="/gigs"
                        className="inline-block px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
                    >
                        Browse Gigs
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <Link
                    to="/gigs"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Gigs
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Gig Header */}
                        <div className="bg-card border border-gray-200 rounded-xl p-6 shadow-xs">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className="font-display text-2xl font-bold text-gray-800">{gig.title}</h1>
                                <StatusBadge status={gig.status} />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-1.5">
                                    <DollarSign className="h-4 w-4" />
                                    <span className="font-semibold text-gray-600">{gig.budget}</span>
                                </div>
                                <div className="flex items-center text-gray-600 font-semibold gap-1.5">
                                    <User className="h-4 w-4" />
                                    <span>{gig.ownerId?.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="max-w-none">
                                <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-500 font-normal text-sm whitespace-pre-wrap">{gig.description}</p>
                            </div>
                        </div>

                        {/* Bids Section */}
                        <div className="bg-card border border-gray-200 rounded-xl p-6 shadow-card">
                            <h2 className="font-display text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Bids ({bids.length})
                            </h2>
                            {
                                bids.length === 0 ? (
                                    <p className="text-gray-600">
                                        {isOwner ? "No one bid on your gig yet." : "You haven't submitted a bid yet."}
                                    </p>
                                ) : (
                                    <BidList
                                        bids={bids}
                                        isOwner={isOwner}
                                        isGigOpen={gig.status === "open"}
                                        onHire={hireBid}
                                    />
                                )
                            }
                        </div>

                        {isOwner && (
                            <div className="bg-blue-100 text-blue-700 flex items-center justify-center border border-gray-100 rounded-xl p-6 text-center">
                                <p className="text-primary font-medium">
                                    This is your gig. Review bids below and hire a freelancer.
                                </p>
                            </div>
                        )}

                    </div>

                    <div className="space-y-6">
                        {!canBid && !hasAlreadyBid && (
                            <div className="bg-card border border-gray-200 rounded-xl p-6 shadow-card">
                                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Submit Your Bid</h2>
                                <BidForm gigId={gig._id} onSuccess={loadData} />
                            </div>
                        )}

                        {hasAlreadyBid && (
                            <div className="bg-green-100 text-green-700 border border-gray-200 rounded-xl p-6 text-center">
                                <p className="text-success font-medium">
                                    You have already submitted a bid for this gig.
                                </p>
                            </div>
                        )}

                        {!isAuthenticated && (
                            <div className="bg-card border border-border rounded-xl p-6 text-center shadow-card">
                                <p className="text-muted-foreground mb-4">Sign in to submit a bid for this gig.</p>
                                <Link
                                    to="/login"
                                    className="inline-block px-4 py-2 rounded-md bg-gradient-primary text-white hover:opacity-90"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default GigDetails;

