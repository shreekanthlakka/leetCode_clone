# LeetCode clone

## Services

    Auth Service
    Main Service
    Problem Service(admin)
    Common Service
    Notification Service / Email Service
    Comment Service

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
    forgotPasswordToken: String,
    forgotPasswordExpiry: String,
