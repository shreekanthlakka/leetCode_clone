# LeetCode clone

## Services

    Auth Service
    Main Service
    Problem Service(admin)
    Common Service
    Notification Service / Email Service
    Comment Service
    Payment Service

## Auth Service

### model

    username: { type: String },
    email: { type: String },
    password: { type: String },
    loggedInAt: [Date],
    accessToken: {
        type: String,
        select: false,
    },
    role:['admin' , 'user']
    forgotPasswordToken: String,
    forgotPasswordExpiry: String,

### user Routes

    router.route("/login").post(login);
    router.route("/register").post(checkSchema(userValidationSchema),registerUser);
    router.route("/logout").post(isLoggedIn, logout);
    router.route("/getLoggedInUser").get(isLoggedIn, loggedInUserDetails);

## Main Service

    ### Model
        userId: String
        problemId: String
        language: enum
        code: String

    ### Routes
        router.route("/submit" , customRole('user' , 'admin'),main_controller)

## problem service

### Model Problem Model

    <!-- usersId: {}, -->

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
    testCaseId:{}
