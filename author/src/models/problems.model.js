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
        testCases: [
            {
                inputs: [{}],
                output: "",
            },
        ],
        boilerPlate: {},
        boilerPlateFull: {},
        // sampleInput: {},
        // sampleOutput: {},
    },
    { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
