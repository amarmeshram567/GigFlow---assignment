import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";


export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)

    const [gigs, setGigs] = useState([])

    const [bids, setBids] = useState([])

    const fetchGigs = useCallback(async () => {
        setIsLoading(true)
        try {
            const { data } = await api.get('/api/gigs');
            if (data.success) {
                setGigs(data.gigs)
            }
        } catch (error) {
            toast.error("Failed to fetch gigs", error.message)
        }
        finally {
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {
        fetchGigs()
    }, [fetchGigs])

    // create gig
    const createGig = useCallback(async (gigData) => {
        try {
            const { data } = await api.post('/api/gigs', gigData);
            if (data.success) {
                setGigs((prev) => [data.gig, ...prev])
                toast.success("Gig created successfully")
                return data.gig;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create gig")
        }
    }, []);

    const fetchBidsForGig = useCallback(async (gigId) => {
        try {
            const { data } = await api.get(`/api/bids/${gigId}`);
            return data.success ? data.bids : [];
        } catch {
            return [];
        }
    }, []);


    // const submit bid
    const submitBid = useCallback(async (bidData) => {
        try {
            const { data } = await api.post("/api/bids", bidData);
            if (data.success) {
                setBids((prev) => [...prev, data.bid])
                toast.success("Bid submitted successfully")
                return data.bid
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit bid");
        }
    }, [])


    // hired bid 
    const hireBid = useCallback(async (bidId) => {
        const { data } = await api.patch(`/api/bids/${bidId}/hire`);

        if (data.success) {
            setBids(prev =>
                prev.map(bid =>
                    bid._id === bidId
                        ? { ...bid, status: "hired" }
                        : { ...bid, status: "rejected" }
                )
            );
            toast.success("Freelancer hired");
        }
    }, []);




    const logout = async () => {
        try {
            const { data } = api.post('/api/auth/logout')
            if (data.success) {
                setUser(null)
            }
        } catch (error) {
            setUser(null)
            error.response?.data?.message || "Something went wrong"
        }
    }



    const value = {
        user,
        setUser,
        isAuthenticated: !!user,
        showUserLogin,
        setShowUserLogin,
        logout,
        isLoading,

        setIsLoading,
        gigs,
        fetchGigs,
        createGig,

        bids,
        fetchBidsForGig,
        submitBid,
        hireBid
    }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}