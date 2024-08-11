import fs from "fs";

const LanguageExtension = Object.freeze({
    javascript: "js",
    cplusplus: "cpp",
    rust: "rs",
    python: "py",
});

const getFullBoilerPlateCode = (title, language) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `/mnt/shared/problems/fullboilerplate/${title}/function.${LanguageExtension[language]}`,
            (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data.toString());
            }
        );
    });
};

export { getFullBoilerPlateCode };
