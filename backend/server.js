require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const gigRouter = require("./routes/gig.routes");
const bidRouter = require("./routes/bid.routes");


const app = express();

const port = process.env.PORT || 5000

const allowedOrigins = [
    'http://localhost:5173'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB()


app.get("/", (req, res) => {
    res.send("Server live")
})

app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/bids", bidRouter);


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})



