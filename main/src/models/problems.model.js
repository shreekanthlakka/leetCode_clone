import mongoose from "mongoose";

const problemsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        difficulty: {
            type: String,
        },
        testCases: [
            {
                inputs: [{}],
                output: {},
            },
        ],
        inputs: [{}],
        output: {},
        boilerPlate: {},
        boilerPlateFull: {},
        userId: String,
    },
    { timestamps: true }
);

const Problems = mongoose.model("Problems", problemsSchema);

export default Problems;
