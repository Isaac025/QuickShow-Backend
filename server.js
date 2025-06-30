const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { clerkMiddleware } = require("@clerk/express");
const { inngest, functions } = require("./inngest/index");
const { serve } = require("inngest/express");
const showRouter = require("./routes/showRouter");
//middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "QuickShow API SERVER" });
});

//connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "quickShow" });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

connectDB();
