import { GenerateFullBoilerPlateCodeArgs } from "@shreekanthlakka/common";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const generateFullBoilerPlateCodeArgs = (title, parsedTestCases) => {
    const Dirname = dirname(fileURLToPath(import.meta.url));
    console.log("dir name => ", Dirname);

    const boilerplatePath = path.join(
        "/mnt/shared/problems",
        `fullboilerplate/${title}`
    );

    // outputObj = {
    //     type: "list<int>",
    //     variableName: "r1",
    //     result: "[1,2,3]",
    // };

    const outputObj = {};
    outputObj.type = parsedTestCases[0].output.split(" ")[0].toLowerCase();
    outputObj.variableName = parsedTestCases[0].output
        .split(" ")[1]
        .split("=")[0]
        .toLowerCase();
    outputObj.result = parsedTestCases[0].output.split(" ")[1].split("=")[1];

    const inputs = parsedTestCases[0].inputs.map((ele) => ({
        type: ele.input.split(" ")[0].toLowerCase(),
        variableName: ele.input.split(" ")[1].split("=")[0],
        value: ele.input.split(" ")[1].split("=")[1],
    }));

    const parse = new GenerateFullBoilerPlateCodeArgs(
        title,
        title,
        inputs,
        outputObj
    );
    const js = parse.generateJavascript();
    const cpp = parse.generateCpp();
    const rust = parse.generateRust();
    const py = parse.generatePython();

    if (!fs.existsSync(boilerplatePath)) {
        fs.mkdirSync(boilerplatePath, { recursive: true });
    }

    fs.writeFileSync(path.join(boilerplatePath, "function.cpp"), cpp);
    fs.writeFileSync(path.join(boilerplatePath, "function.js"), js);
    fs.writeFileSync(path.join(boilerplatePath, "function.rs"), rust);
    fs.writeFileSync(path.join(boilerplatePath, "function.py"), py);

    return {
        boilerplateFullDirPath: boilerplatePath,
        cpp: path.join(
            `/mnt/shared/problems/boilerplate/${title}/function.cpp`,
            "./"
        ),
        js: path.join(
            `/mnt/shared/problems/boilerplate/${title}/function.js`,
            "./"
        ),
        rust: path.join(
            `/mnt/shared/problems/boilerplate/${title}/function.rs`,
            "./"
        ),
        py: path.join(
            `/mnt/shared/problems/boilerplate/${title}/function.py`,
            "./"
        ),
    };
};

export { generateFullBoilerPlateCodeArgs };
