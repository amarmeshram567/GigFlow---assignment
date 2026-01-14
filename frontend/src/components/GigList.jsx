import { FileX } from "lucide-react";
import GigCard from "./GigCard";

const GigList = ({ gigs, emptyMessage = "No gigs found" }) => {
    if (!gigs || gigs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center mb-4">
                    <FileX className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {emptyMessage}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                    Check back later or try adjusting your search criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
            ))}
        </div>
    );
}


export default GigList