import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, DollarSign, Calendar, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const StatusBadge = ({ status = "pending" }) => {
    const base = "rounded-full px-3 py-1 text-xs font-medium capitalize";

    const statusStyles = {
        hired: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-yellow-100 text-yellow-700",
    };

    return (
        <span className={`${base} ${statusStyles[status] || statusStyles.pending}`}>
            {status}
        </span>
    );
};


const MyBids = () => {
    const { user, gigs, fetchBidsForGig } = useAppContext();
    const [myBids, setMyBids] = useState([]);
    const [loadingBids, setLoadingBids] = useState(true);


    useEffect(() => {
        if (!user || !gigs?.length) return;

        const loadBids = async () => {
            setLoadingBids(true);
            try {
                let allBids = [];

                for (const gig of gigs) {
                    // Backend already ensures security
                    const bids = await fetchBidsForGig(gig._id);

                    if (bids?.length) {
                        allBids.push(...bids);
                    }
                }

                setMyBids(allBids);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingBids(false);
            }
        };

        loadBids();
    }, [user, gigs, fetchBidsForGig]);




    if (loadingBids) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    if (!myBids || myBids.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    No bids yet
                </h3>
                <p className="text-muted-foreground mb-6">
                    Start bidding on gigs to see them here.
                </p>
                <Link
                    to="/gigs"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                    Browse Gigs
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4 container  mx-auto px-4 py-8">
            <h1 className="font-display text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                My Bids
            </h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {myBids.map((bid) => (
                    <Link
                        key={bid._id}
                        to={`/gigs/${bid.gigId}`}
                        className="block bg-card border border-gray-200 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group"
                    >
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 font-semibold mb-1">
                                    Gig #{bid.gigId.slice(-7).toUpperCase()}
                                </p>
                                <p className="text-gray-500 line-clamp-2 text-sm">{bid.message}</p>
                            </div>
                            <StatusBadge status={bid.status} />
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <DollarSign className="h-4 w-4" />
                                    <span className="font-semibold text-foreground">{bid.price}</span>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(bid.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center text-blue-500 gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                View Gig
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyBids;
