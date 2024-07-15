import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Languages } from "@shreekanthlakka/common";

const submissionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        problemId: {
            type: String,
        },
        title: String,
        typedCode: String,
        language: Object.values(Languages),
        executedCide: String,
        testCasesResults: [
            {
                inputs: [],
                output: String,
                result: String,
                status: {
                    type: String,
                    default: "Pending",
                },
            },
        ],
    },
    { timestamps: true }
);

submissionSchema.set("versionKey", "version");
submissionSchema.plugin(updateIfCurrentPlugin);
const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
