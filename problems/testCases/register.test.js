import request from "supertest";
import app from "../../app.js";

it("returns a 201 on sucessfull signup", async () => {
    return request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
            email: "test@test.com",
            password: "password",
        })
        .expect(201);
});

it("returns a 400 with an invalid email", async () => {
    return request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
            email: "test",
            password: "password",
        })
        .expect(400);
});

it("returns a 400 with an invalid password", async () => {
    return request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
            email: "test@test.com",
            password: "p",
        })
        .expect(400);
});

it("returns a 400 with missing email and password", () => {
    return request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
        })
        .expect(400);
});

it("disallows duplicate emails", async () => {
    await request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
            email: "test@test.com",
            password: "password",
        })
        .expect(201);

    await request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
            email: "test@test.com",
            password: "password",
        })
        .expect(400);
});
