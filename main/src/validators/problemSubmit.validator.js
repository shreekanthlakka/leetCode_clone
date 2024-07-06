import { Languages } from "@shreekanthlakka/common";

const problemSubmitSchema = {
    problemId: {
        in: ["body"],
        exists: {
            errorMessage: "Problem ID is required",
        },
        notEmpty: {
            errorMessage: "problemid cannot be empty",
        },
    },
    // userId: {
    //     in: ["body"],
    //     exists: {
    //         errorMessage: "userid required",
    //     },
    //     notEmpty: {
    //         errorMessage: "userId cannot be empty",
    //     },
    // },
    title: {
        in: ["body"],
        exists: {
            errorMessage: "title required",
        },
        notEmpty: {
            errorMessage: "title cannot be empty",
        },
        trim: true,
    },
    typedCode: {
        in: ["body"],
        exists: {
            errorMessage: "code required",
        },
        notEmpty: {
            errorMessage: "code cannot be empty",
        },
        trim: true,
    },
    language: {
        in: ["body"],
        exists: {
            errorMessage: "language required",
        },
        notEmpty: {
            errorMessage: "language cannot be empty",
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                if (!Object.values(Languages).includes(value)) {
                    throw new Error("language is not valid");
                }
                return true;
            },
        },
    },
};

export { problemSubmitSchema };
