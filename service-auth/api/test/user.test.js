const express = require('express');
const request = require('supertest');
const User = require("../models/user.model");
const { connectDB } = require('../config/database');

const app = express();

beforeAll(async () => {
    connectDB();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // User route
    const userRoute = require('../routes/user.route');
    app.use('/users', userRoute);
});

afterAll(async () => {
    await User.destroy({ 
        where: { email: "maxrichet78@gmail.com" }
    });
});

describe('All tests for user controller', () => {
  describe('POST /users/register', () => {
    it('should create a new account', async () => {
        const testItem = {
            firstname: "Max", 
            lastname: "Richet", 
            email: "maxrichet78@gmail.com", 
            password: "123456",
            role: true
        }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
  });

  describe('POST /users/register with email already exist in db', () => {
    it('should return an error', async () => {
        const testItem = { 
            firstname: "Max", 
            lastname: "Richet", 
            email: "maxrichet78@gmail.com", 
            password: "123456",
            role: true
        }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(409);
    });
  });

  describe('POST /users/register with wrong format email', () => {
    it('should return an error', async () => {
        const testItem = { 
            firstname: "Max", 
            lastname: "Richet", 
            email: "wrongEmail", 
            password: "123456",
            role: "0"
        }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /users/register with empty informations', () => {
    it('should return an error', async () => {
        const testItem = { 
            firstname: "Max", 
            lastname: "Richet", 
            email: "        ", 
            password: "",
            role: "0"
        }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /users/login', () => {
    it('should connect to an account', async () => {
        const testItem = { email: "maxrichet78@gmail.com", password: "123456" }
        const res = await request(app)
            .post('/users/login')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(200);
    });
  });

  describe("POST /users/login with email don't exist in db", () => {
    it('should return an error', async () => {
        const testItem = { email: "email@gmail.com", password: "123456" }
        const res = await request(app)
            .post('/users/login')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /users/login with wrong password', () => {
    it('should return an error', async () => {
        const testItem = { email: "maxrichet78@gmail.com", password: "wrongpass" }
        const res = await request(app)
            .post('/users/login')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(401);
    });
  });
});