import { asyncHandler } from "@shreekanthlakka/common";

const addProblem = asyncHandler(async (req, res) => {
    const { title, description, testCases } = req.body;
    // const boilerPlateCode = generateBoilerPlateCode(title, testCases);
});

export { addProblem };
