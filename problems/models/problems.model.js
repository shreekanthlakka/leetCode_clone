import mongoose from "mongoose";

const problemsSchema = new mongoose.Schema(
    {
        usersId: {},
        problemName: {},
        problemDescription: {},
        problemImage: {},
        problemCode: {},
        problemTestCases: {},
        problemLanguage: {},
        problemDifficulty: {},
        problemTime: {},
        problemViews: {},
        problemLikes: {},
        problemDislikes: {},
        problemComments: {},
        problemTags: {},
        problemSolved: {},
        problemRating: {},
    },
    { timeStamps: true }
);
