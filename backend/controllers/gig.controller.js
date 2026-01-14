const Gig = require("../models/Gig");



const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;
        const ownerId = req.user.userId

        if (!title || !description || !budget) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const gig = await Gig.create({
            title, description, budget, ownerId
        })

        res.status(201).json({
            success: false,
            message: "Gig created",
            gig,
        })

    } catch (error) {
        console.log("Error gig controller: ", error.message)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


const getGigs = async (req, res) => {
    try {
        const { search } = req.query;

        const query = {
            status: 'open',
            ...(search && { title: { $regex: search, $options: "i" } })
        };

        const gigs = await Gig.find(query).populate("ownerId", "name email")

        res.status(200).json({
            success: true,
            message: "Gigs fetched successfully",
            gigs
        })

    } catch (error) {
        console.log("Error getGig controller: ", error.message)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


module.exports = {
    createGig,
    getGigs
}