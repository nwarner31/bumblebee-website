

import request from "supertest";
import mongoose from 'mongoose';
import app from '../app';

describe('Users Endpoints', function () {
    const userData = {email: 'test@user.com', password: 'testuser', name: 'test', addresses: [{street1: 'test', city: 'test', state: 'test'}]};
    beforeAll(async () => {
        const dbURI = process.env.TEST_DB_URL || 'mongodb://localhost:27017/bumblebee_test';
        //await mongoose.connect(dbURI);
    });
    afterAll(async () => {
        // Disconnect Mongoose after all tests are done
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    });
    describe('Register Function Tests', function () {
        afterEach(async () => {
            await mongoose.connection.dropDatabase();
        })
        it('should successfully register when correct correct information provided', async () => {
           const response = await request(app).post('/user/register').send(userData);
           expect(response.statusCode).toBe(200);
           expect(response.body.message).toBe('Register successful');
           expect(response.header['set-cookie'].length).toBe(1);
        });
        it('should fail to register if no email is provided', async () => {
            const registerUser = Object.assign({}, userData, {email: undefined});
            const response = await request(app).post('/user/register').send(registerUser);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('User validation failed: email: An email is required');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to register if no password is provided', async () => {
            const registerUser = Object.assign({}, userData, {password: undefined});
            const response = await request(app).post('/user/register').send(registerUser);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('A password is required');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to register if no name is provided', async () => {
            const registerUser = Object.assign({}, userData, {name: undefined});
            const response = await request(app).post('/user/register').send(registerUser);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('User validation failed: name: A name is required');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to register if no street 1 is provided', async () => {
            const userAddress = Object.assign({}, userData.addresses[0], {street1: undefined});
            const registerUser = Object.assign({}, userData, {addresses: [userAddress]});
            const response = await request(app).post('/user/register').send(registerUser);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('User validation failed: addresses.0.street1: An address requires a street 1');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to register if no city is provided', async () => {
            const userAddress = Object.assign({}, userData.addresses[0], {city: undefined});
            const registerUser = Object.assign({}, userData, {addresses: [userAddress]});
            const response = await request(app).post('/user/register').send(registerUser);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('User validation failed: addresses.0.city: An address requires a city');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to register if no state is provided', async () => {
            const userAddress = Object.assign({}, userData.addresses[0], {state: undefined});
            const registerUser = Object.assign({}, userData, {addresses: [userAddress]});
            const response = await request(app).post('/user/register').send(registerUser);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('User validation failed: addresses.0.state: An address requires a state');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to register if there is a registered user with the given email', async () => {
            await request(app).post('/user/register').send(userData);
            // Timeout is to ensure that the prior registration is saved to the database
            setTimeout(async () => {
                const response = await request(app).post('/user/register').send(userData);
                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('User validation failed: email: An email must be unique');
                expect(response.header['set-cookie']).toBe(undefined);
            }, 2000)

        });
    });
    describe('Login Function Tests', function () {
        beforeAll(async () => {
            await request(app).post('/user/register').send(userData);
        });
        afterAll(async () => {
            await mongoose.connection.dropDatabase();
        });
        it('should successfully login with the correct credentials', async () => {
            const response = await request(app).post('/user/login').send({email: userData.email, password: userData.password});
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.header['set-cookie'].length).toBe(1);
        });
        it('should fail to login with no email provided', async () => {
            const response = await request(app).post('/user/login').send({password: userData.password});
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('No email provided');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to login with no password provided', async () => {
            const response = await request(app).post('/user/login').send({email: userData.email});
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('No password provided');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to login with a bad email provided', async () => {
            const response = await request(app).post('/user/login').send({email: 'bob@test.com', password: userData.password});
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Invalid email or password');
            expect(response.header['set-cookie']).toBe(undefined);
        });
        it('should fail to login with a bad password provided', async () => {
            const response = await request(app).post('/user/login').send({email: userData.email, password: 'badpassword'});
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Invalid email or password');
            expect(response.header['set-cookie']).toBe(undefined);

        });
    });
    describe('Logout Function Tests', function () {
        it('should return successful if there is a session', async () => {
        const registerResponse = await request(app).post('/user/register').send(userData);
        const sessionCookie = registerResponse.header['set-cookie'][0];
        const response = await request(app).post('/user/logout').set('Cookie', sessionCookie);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Logout successful');

    });
        it('should return error if no session present', async () => {
            const response = await request(app).post('/user/logout');
            expect(response.statusCode).toBe(401);
        });

    });

});

