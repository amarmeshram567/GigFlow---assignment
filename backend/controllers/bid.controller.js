const mongoose = require("mongoose");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");


const submitBid = async (req, res) => {
    try {
        const { message, price, gigId } = req.body;

        const freelancerId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(gigId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gig Id"
            })
        }


        if (!message || !price || !gigId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newBid = await Bid.create({
            gigId,
            freelancerId,
            message,
            price
        })

        res.status(201).json({
            success: true,
            message: "Bid created",
            bid: newBid
        })


    } catch (error) {
        console.log("Error for submitBid controller: ", error.message)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


// const getBidsForGig = async (req, res) => {

//     try {
//         const gigId = req.params.gigId;
//         const userId = req.user.userId

//         const gig = await Gig.findById(gigId)

//         if (!gig) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Gig not found"
//             })
//         }


//         const ownerId = gig.ownerId._id ? gig.ownerId._id : gig.ownerId;


//         if (ownerId.toString() !== userId.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Forbidden"
//             })
//         }

//         // if (!ownerId.equals(userId)) {
//         //     return res.status(403).json({
//         //         success: false,
//         //         message: "Forbidden"
//         //     })
//         // }


//         const bids = await Bid.find({ gigId: gig._id }).populate("freelancerId", "name email")

//         res.status(200).json({
//             success: true,
//             bids
//         })

//     } catch (error) {
//         console.log("Error for getBidsForGig controller: ", error.message)
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         })
//     }
// }

const getBidsForGig = async (req, res) => {
    try {
        const { gigId } = req.params;
        const userId = req.user.userId;

        const gig = await Gig.findById(gigId);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: "Gig not found",
            });
        }

        let query = { gigId: gig._id };

        // If user is NOT the owner → only show their bid
        if (gig.ownerId.toString() !== userId.toString()) {
            query.freelancerId = userId;
        }

        const bids = await Bid.find(query)
            .populate("freelancerId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bids,
        });
    } catch (error) {
        console.error("getBidsForGig error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



const hireBid = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const bidId = req.params.bidId;
        const userId = req.user.userId

        const bid = await Bid.findById(bidId).session(session);

        if (!bid) {
            return res.status(404).json({
                success: false,
                message: "Bid not found"
            })
        }

        const gig = await Gig.findOne({
            _id: bid.gigId,
            status: 'open'
        }).session(session)

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: "Gig already assigned"
            })
        }

        if (!gig.ownerId.equals(userId)) {
            return res.status(404).json({
                success: false,
                message: "Forbidden"
            })
        }

        // update gig single
        await Gig.updateOne(
            { _id: gig._id },
            { status: "assigned" },
            { session }
        )

        // update bid single
        await Bid.updateOne(
            { _id: bid._id },
            { status: "hired" },
            { session }
        )

        // update bid many
        await Bid.updateMany(
            { gigId: gig._id, _id: { $ne: bid._id } },
            { status: "rejected" },
            { session }
        )

        await session.commitTransaction();
        session.endSession()

        res.status(200).json({
            success: true,
            message: "Freelancer hired successfully"
        })

    } catch (error) {

        await session.abortTransaction();
        session.endSession()

        console.log("Error for hireBid controller: ", error.message)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


module.exports = {
    submitBid,
    getBidsForGig,
    hireBid
}