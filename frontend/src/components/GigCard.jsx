import { ArrowRight, Calendar, DollarSign, User } from "lucide-react";
import { Link } from "react-router-dom";

const StatusBadge = ({ status }) => {
    const base = "rounded-full px-3 py-1 text-xs font-medium capitalize";

    const styles =
        status === "open"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700";

    return <span className={`${base} ${styles}`}>{status || "unknown"}</span>;
};

const GigCard = ({ gig }) => {
    if (!gig) return null;

    const id = gig._id || "no-id";
    const title = gig.title || "Untitled Gig";
    const description = gig.description || "No description provided";
    const budget = gig.budget ?? 0;
    const status = gig.status || "open";

    // console.log(gig)

    return (
        <Link to={`/gigs/${id}`}>
            <div className="group flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md">
                <div>
                    <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                            {title}
                        </h3>
                        <StatusBadge status={status} />
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-3.5 w-3.5" />
                        <span>{gig.ownerId.name}</span>
                    </div>

                    <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
                    <div className="flex items-center gap-1 font-semibold text-blue-600">
                        <DollarSign size={16} />
                        {budget}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                            {new Date(gig.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GigCard;
