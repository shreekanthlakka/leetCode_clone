# LeetCode clone

## Problem Submission Rules
    title --> no spaces, camelCaseing and this title appears as function name in boilerplate code given to diff languages
    description 
    TestCases --> can have any number of testcase , should follow the same variables names in all the test cases
    inputs --> consider the following types while giving inputs 
    output --> variabletype result=value 
     mapTypeToCpp(type) {
        switch (type) {
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "std::string";
            case "bool":
                return "bool";
            case "list<int>":
                return "std::vector<int>";
            case "list<float>":
                return "std::vector<float>";
            case "list<string>":
                return "std::vector<std::string>";
            case "list<bool>":
                return "std::vector<bool>";
            default:
                return "unknown";
        }
    }

    mapTypeToRust(type) {
        switch (type) {
            case "int":
                return "i32";
            case "float":
                return "f64";
            case "string":
                return "String";
            case "bool":
                return "bool";
            case "list<int>":
                return "Vec<i32>";
            case "list<float>":
                return "Vec<f64>";
            case "list<string>":
                return "Vec<String>";
            case "list<bool>":
                return "Vec<bool>";
            default:
                return "unknown";
        }
    }

    doent support rust as of now only js and cpp

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

### 
    

   
    problemDislikes: {},
    problemComments: {},
    problemTags: {},
    problemSolved: {},
    problemRating: {},
    testCaseId:{}
