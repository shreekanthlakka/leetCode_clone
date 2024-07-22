import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        difficulty: {
            type: String,
            default: "easy",
        },
        inputs: [],
        output: [],
        boilerPlate: {},
        boilerPlateFull: {},
        userId: {
            type: String,
        },
        testCases: [
            {
                inputs: [{}],
                output: {},
            },
        ],
    },
    { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
