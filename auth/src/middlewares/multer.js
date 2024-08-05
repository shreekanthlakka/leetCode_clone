import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, "./public/temp");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        console.log("DIR ++>", dir);
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Math.floor(Math.random() * 90000)}#${file.originalname}`);
    },
});

const uploadDiskStorage = multer({ storage: DiskStorage });

export { uploadDiskStorage };
