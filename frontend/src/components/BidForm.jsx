import React, { useState } from "react";
import { DollarSign, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const BidForm = ({ gigId, onSuccess }) => {
    const { submitBid } = useAppContext();

    const [message, setMessage] = useState("");
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim() || !price) {
            toast.error("Please fill all fields");
            return;
        }

        setIsLoading(true);
        try {
            await submitBid({
                gigId,
                message,
                price: Number(price),
            });

            setMessage("");
            setPrice("");
            onSuccess?.(); // reload bids
        } catch (error) {
            // error already handled in context
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Send size={18} className="text-blue-600" />
                Place Your Bid
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Your Proposal
                    </label>
                    <textarea
                        placeholder="Describe why you're the best fit for this gig..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full resize-none rounded border border-gray-300 px-3 py-2 outline-blue-500"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Your Price
                    </label>
                    <div className="relative">
                        <DollarSign
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded border border-gray-300 pl-9 pr-3 py-2 outline-blue-500"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {isLoading ? "Submitting..." : "Submit Bid"}
                </button>
            </form>
        </div>
    );
};

export default BidForm;
