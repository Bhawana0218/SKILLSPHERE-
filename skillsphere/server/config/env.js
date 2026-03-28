import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("ENV LOADED:", process.env.RAZORPAY_KEY_ID);