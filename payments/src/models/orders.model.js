import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        price: {
            type: Number,
        },
        stripeId: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
