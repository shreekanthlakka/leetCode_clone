import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        userId: String,

        stripeId: String,
        customerId: String,
        amount: Number,
        customer_details: {},
        payment_intent: String,
        payment_status: String,
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
