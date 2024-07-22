const addProblemValidation = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Title is should not be empty",
        },
        exists: {
            errorMessage: "Title is required",
        },
        trim: true,
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Description is should not be empty",
        },
        exists: {
            errorMessage: "Description is required",
        },
        trim: true,
    },
    testCases: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Test Cases is should not be empty",
        },
        exists: {
            errorMessage: "Test Cases is required",
        },
        custom: {
            options: (value) => {
                if (value.length < 1) {
                    throw new Error("atleast one TestCase is required");
                }
                if (value.every((ele) => ele.inputs.length === 0)) {
                    throw new Error(
                        "atleast one input is required for every testCase"
                    );
                }
            },
        },
    },
};

export { addProblemValidation };
