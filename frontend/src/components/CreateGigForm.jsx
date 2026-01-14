import { useState } from "react";
import { DollarSign, FileText, Tag, Send } from "lucide-react";
import { useAppContext } from "../context/AppContext";


const CreateGigForm = ({ onSuccess }) => {
    const { createGig } = useAppContext()
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createGig({
                title: formData.title,
                description: formData.description,
                budget: Number(formData.budget),
            });

            setFormData({ title: "", description: "", budget: "", category: "" });
            if (onSuccess) onSuccess();
        } catch (error) {
            // Error handled by context
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className='space-y-2'>
                <label htmlFor="title" className="text-sm font-medium">
                    Gig Title
                </label>
                <div className="relative mt-1">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g., Build a React Dashboard"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full pl-10 pr-3 h-10 rounded-md border border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="Describe your project requirements, deliverables, and timeline..."
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="mt-1 w-full p-2 rounded-md border border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Budget */}

            {/* Budget */}
            <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium">
                    Budget ($)
                </label>
                <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        id="budget"
                        type="number"
                        placeholder="500"
                        min="1"
                        value={formData.budget}
                        onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full pl-10 pr-3 h-10 rounded-md border border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:opacity-90"
                disabled={isLoading}
            >
                {isLoading ? (
                    "loading..."
                ) : (
                    <>
                        <Send className="h-4 w-4" />
                        Post Gig
                    </>
                )}
            </button>
        </form>
    );
}


export default CreateGigForm