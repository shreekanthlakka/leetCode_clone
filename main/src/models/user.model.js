import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        plan: {
            type: String,
            enum: ["Pro", "Free"],
            default: "Free",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
