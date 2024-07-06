import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Languages } from "@shreekanthlakka/common";

const problemSubmitSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

problemSubmitSchema.set("versionKey", "version");
problemSubmitSchema.plugin(updateIfCurrentPlugin);
const ProblemSubmit = mongoose.model("ProblemSubmit", problemSubmitSchema);

export default ProblemSubmit;
