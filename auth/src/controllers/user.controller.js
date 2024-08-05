import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/CustomError.js";
import User from "../models/user.model.js";
import { sendCookies } from "../utils/sendCookies.js";
import { CustomResponse } from "../utils/CustomResponse.js";
import { UserLoggedInPublisher } from "../events/publisher/user-login-publisher.js";
import { natsWrapper } from "../natsWrapper.js";
import { UserCreatedPublisher } from "../events/publisher/user-created-publisher.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(
                new CustomError(400, "validation errors ==>", errors.array())
            );
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        console.log("=======User ==>", user);
        throw new CustomError(400, "invalid credentials ----");
    }
    const isValidPassword = await user.isValidatePassword(password);
    if (!isValidPassword) {
        throw new CustomError(404, "invalid credentials");
    }
    if (isValidPassword) {
        new UserLoggedInPublisher(natsWrapper.client).publish({
            _id: user._id,
            email: user.email,
            name: user.username,
            loggedInAt: new Date(),
        });
        sendCookies(user._id, res);
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "validation result", errors.array()));
    }
    const { email, password, username } = req.body;
    const user = await User.create({
        username,
        email,
        password,
    });
    if (!user) {
        throw new CustomError(400, "failed to create user");
    }
    new UserCreatedPublisher(natsWrapper.client).publish({
        _id: user._id,
        username: user.username,
        email: user.email,
    });
    res.status(201).json(
        new CustomResponse(201, "user created sucessfully !!!", user)
    );
});

const logout = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
        throw new CustomError(404, "no user logged in");
    }
    user.accessToken = null;
    await user.save({ validateBeforeSave: false });
    const options = {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== "test",
        maxAge: 0,
    };
    res.status(200)
        .clearCookie("accessToken", options)
        .json(new CustomResponse(200, "user logged out sucessfully"));
});

const loggedInUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new CustomError(400, "bad request");
    }
    res.status(200).json({
        isAuthenticated: true,
        success: true,
        data: user,
        message: "loggedIn user details",
    });
});

const addPhoneNumber = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { phonenumber } = req.body;
    const user = await User.findByIdAndUpdate(
        userId,
        { phonenumber },
        { new: true }
    );
    if (!user) {
        throw new CustomError(404, "user not found");
    }
    res.status(200).json(
        new CustomResponse(200, "phone number added sucessfully", user)
    );
});

const addProfilePic = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    let result;
    console.log("REQ FILES ==> ", req.files);
    if (req.files) {
        result = await uploadToCloudinary(req.files.profilepic[0].path);
    }
    const profilepic = {
        url: result.url,
        public_id: result.public_id,
    };
    const user = await User.findByIdAndUpdate(
        userId,
        { profilepic },
        { new: true }
    );
    if (!user) {
        throw new CustomError(404, "user not found");
    }
    res.status(200).json(
        new CustomResponse(200, "profile picture added sucessfully", user)
    );
});

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { username, phonenumber } = req.body;
    let result;
    if (req.files) {
        result = await uploadToCloudinary(req.files.profilepic[0].path);
    }
    const profilepic = {
        url: result.url,
        public_id: result.public_id,
    };
    const user = await User.findByIdAndUpdate(
        userId,
        {
            username,
            phonenumber,
            profilepic,
        },
        { new: true }
    );
    if (!user) {
        throw new CustomError(400, "failed to update");
    }
    res.status(200).json(new CustomResponse(200, "updated sucessfully", user));
});

export {
    registerUser,
    loggedInUserDetails,
    login,
    logout,
    addPhoneNumber,
    addProfilePic,
    updateUser,
};
