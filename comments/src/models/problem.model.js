import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        difficulty: String,
        inputs: [],
        output: [],
        boilerPlate: {},
        boilerPlateFull: {},
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
