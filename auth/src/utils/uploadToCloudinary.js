import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadToCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return;
        const result = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto",
        });
        fs.unlinkSync(localfilepath);
        return result;
    } catch (error) {
        fs.unlinkSync(localfilepath);
        return null;
    }
};

const destroyFromCloudinary = async (file) => {
    try {
        if (!file) return;
        const res = await cloudinary.uploader.destroy(file);
        console.log("destroy  ==>", res);
        return res;
    } catch (error) {
        return null;
    }
};

export { uploadToCloudinary, destroyFromCloudinary };
