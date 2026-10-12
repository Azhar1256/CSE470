// API smoke tests against an in-memory MongoDB. Run with: npm test
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
const { default: app } = await import('../index.js');

let mongo;
before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});
after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

const user = { firstName: 'Test', lastName: 'Player', email: 'player@example.com', password: 'secret123' };
let token;

test('sign up returns a token and never the password hash', async () => {
  const res = await request(app).post('/user/signup').send(user).expect(201);
  assert.ok(res.body.token);
  assert.equal(res.body.result.name, 'Test Player');
  assert.equal(res.body.result.password, undefined);
  token = res.body.token;
});

test('duplicate sign up is rejected', async () => {
  await request(app).post('/user/signup').send(user).expect(400);
});

test('sign in checks the password', async () => {
  await request(app).post('/user/signin').send({ email: user.email, password: 'wrong' }).expect(400);
  const res = await request(app).post('/user/signin').send({ email: user.email, password: user.password }).expect(200);
  assert.equal(res.body.result.password, undefined);
});

test('creating a post requires a valid token', async () => {
  await request(app).post('/posts').send({ title: 'x' }).expect(401);
  const forged = 'x'.repeat(600); // long tokens used to bypass verification
  await request(app).post('/posts').set('Authorization', `Bearer ${forged}`).send({ title: 'x' }).expect(401);
});

test('create, list, search, like and delete a post', async () => {
  const auth = { Authorization: `Bearer ${token}` };
  const created = await request(app).post('/posts').set(auth)
    .send({ title: 'Clutch ace', message: '1v5 on Bind', tags: ['valorant', 'clutch'], name: 'Test Player' }).expect(201);
  const id = created.body._id;

  const list = await request(app).get('/posts?page=1').expect(200);
  assert.equal(list.body.data.length, 1);
  assert.equal(list.body.numberOfPages, 1);

  const search = await request(app).get('/posts/search?searchQuery=none&tags=valorant').expect(200);
  assert.equal(search.body.data.length, 1);

  const liked = await request(app).patch(`/posts/${id}/likePost`).set(auth).expect(200);
  assert.equal(liked.body.likes.length, 1);

  await request(app).delete(`/posts/${id}`).set(auth).expect(200);
  const after = await request(app).get('/posts?page=1').expect(200);
  assert.equal(after.body.data.length, 0);
});
