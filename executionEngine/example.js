import fs from "fs";
import path from "path";

const startJob = async () => {
    const data = "console.log(1+2)";
    const filePath = path.resolve("test.js");

    console.log("Writing to file:", filePath);

    // Write to file asynchronously
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("File written successfully.");

        // Read from file after writing
        try {
            const d = fs.readFileSync(filePath, "utf-8");
            console.log(d, "<== file content");
        } catch (err) {
            console.error("Error reading file:", err);
        }
    });
};
startJob();

export { startJob };
