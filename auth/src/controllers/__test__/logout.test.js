import request from "supertest";
import app from "../../app.js";
import { printCollectionData } from "../../test/setup.js";
import User from "../../models/user.model.js";

it("cleares the cookie after sign out", async () => {
    const registerRes = await request(app)
        .post("/api/v1/users/register")
        .send({
            username: "test",
            email: "test@test.com",
            password: "123456",
        })
        .expect(201);

    let loginRes = await request(app)
        .post("/api/v1/users/login")
        .send({
            email: "test@test.com",
            password: "123456",
        })
        .expect(200);

    const cookie = loginRes.get("Set-Cookie");
    const token = loginRes.body.token;

    const logoutRes = await request(app)
        .post("/api/v1/users/logout")
        .set("Authorization", `Bearer ${token}`)
        .set("Cookie", cookie)
        .send({})
        .expect(200);

    console.log("res ===>", logoutRes.get("Set-Cookie")[0]);
    expect(
        logoutRes
            .get("Set-Cookie")[0]
            .split(";")
            .filter((ele) => !ele.trim().startsWith("Expires="))
            .join(";")
    ).toEqual("accessToken=; Max-Age=0; Path=/; HttpOnly");
});
