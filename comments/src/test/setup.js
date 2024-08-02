import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";

let mongo;
beforeAll(async () => {
    process.env.JWT_SECRET = "sree";
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

const printCollectionData = async (collectionName) => {
    const collection = mongoose.connection.db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    console.log(`Contents of ${collectionName}:`, documents);
};

global.signin = async () => {
    const email = "test@test.com";
    const password = "test123";
    const username = "test";
    const response = await request(app)
        .post("/api/v1/users/register")
        .send({
            username,
            email,
            password,
        })
        .expect(201);
    const loginresponse = await request(app)
        .post("/api/v1/users/login")
        .send({
            email,
            password,
        })
        .expect(200);
    const cookie = loginresponse.get("Set-Cookie");
    return cookie;
};

export { printCollectionData };
