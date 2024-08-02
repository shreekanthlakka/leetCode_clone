# LeetCode clone

## Services

    Auth Service
    Main Service
    author Service(admin) -- for adding problems , for testing default role is admin for now , will change 
    Common Service
    Notification Service / Email Service --> for sending emails to natify
    Comment Service
    Payment Service 
    execution Service --> this service executes the code in contanerised env and logs the result 

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

## author service

    ### Model
        title:String
        description:String
        inputs: [],
        output: [],
        boilerPlate: {},
        boilerPlateFull: {},
        userId:String
        testCases:[]

### Model Problem Model

   
    problemDislikes: {},
    problemComments: {},
    problemTags: {},
    problemSolved: {},
    problemRating: {},
    testCaseId:{}
