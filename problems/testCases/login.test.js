import request from "supertest";
import app from "../../app.js";
import { natsWrapper } from "../../natsWrapper.js";

it("fails with a not registered email", async () => {
    await request(app)
        .post("/api/v1/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(400);
});

it("fails when an incorrect password is suplied", async () => {
    await request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
            email: "test@test.com",
            password: "password",
        })
        .expect(201);

    await request(app)
        .post("/api/v1/users/login")
        .send({
            email: "test@test.com",
            password: "p",
        })
        .expect(400);
});

//implement this test

// it("responds with a cookie when given valid credenrials", async () => {
//     await request(app)
//         .post("/api/v1/users/register")
//         .send({
//             username: "test",
//             email: "test@test.com",
//             password: "password",
//         })
//         .expect(201);
//     const response = await request(app)
//         .post("/api/v1/users/login")
//         .send({
//             email: "test@test.com",
//             password: "password",
//         })
//         .expect(200);
//     expect(response.get("Set-Cookie")).toBeDefined();
// });

// it("publishes an event", async () => {
//     await request(app)
//         .post("/api/v1/users/register")
//         .send({
//             username: "test",
//             email: "test@test.com",
//             password: "password",
//         })
//         .expect(201);

//     // expect(natsWrapper.client.publish).toHaveBeenCalled();

//     const response = await request(app)
//         .post("/api/v1/users/login")
//         .send({
//             email: "test@test.com",
//             password: "password",
//         })
//         .expect(200);
//     expect(response.get("Set-Cookie")).toBeDefined();
//     // expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
// });

/**
 * 
 *    "setupFilesAfterEnv": [
            "./src/test/setup.js"
        ],
 */
