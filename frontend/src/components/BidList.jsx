import React from "react";
import { Calendar, CheckCircle, DollarSign, User } from "lucide-react";

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

const BidList = ({
    bids = [],
    onHire,
    isGigOpen,
    isOwner,
    isLoading,
}) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-10">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    if (bids.length === 0) {
        return (
            <div className="rounded border bg-white p-6 text-center text-gray-500">
                No bids yet. Be patient!
            </div>
        );
    }

    const hiredBid = bids.find((b) => b.status === "hired");


    return (
        <div className="space-y-4">
            {bids.map((bid) => {
                return (
                    <div
                        key={bid._id}
                        className={`rounded border p-4 bg-white ${hiredBid ? "border-green-400" : "border-gray-200"
                            }`}
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                                    <User size={16} />
                                </div>
                                <span className="font-medium uppercase">
                                    {bid.freelancerId?.name}
                                </span>
                            </div>

                            <StatusBadge status={bid.status} />
                        </div>

                        <p className="mb-4 text-sm text-gray-600">
                            {bid.message}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 font-semibold text-blue-600">
                                <DollarSign size={16} />{bid.price}
                            </div>

                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="h-4 w-4" />
                                <span className="ml-1.5">
                                    {new Date(bid.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}

                                </span>
                            </div>

                        </div>
                        {isOwner &&
                            isGigOpen &&
                            !hiredBid &&
                            bid.status === "pending" && (
                                <button onClick={() => onHire(bid._id)}
                                    className="bg-violet-500 hover:bg-violet-600 duration-300 cursor-pointer mt-3 w-full text-white px-3 py-1 rounded-lg"
                                >
                                    Hire
                                </button>
                            )}

                    </div>
                );
            })}
        </div>
    );



};

export default BidList;
