const request = require('supertest');
const server = require('../app');

describe('API server', () => {
	let api;
	let testJoke = {
		id: 4,
		jokeText: 'This is a hilarious joke',
		jokeEmoji: '#',
		jokeReactions: {
			emoji1: 0,
			emoji2: 0,
			emoji3: 0,
		},
		comments: [
			{
				commentID: 1,
				commentText: 'Based on user input as well!',
				commentReactions: {
					emoji1: 0,
					emoji2: 0,
					emoji3: 0,
				},
			},
			{
				commentID: 2,
				commentText: 'Based on user input as well!',
				commentReactions: {
					emoji1: 0,
					emoji2: 0,
					emoji3: 0,
				},
			},
			{
				commentID: 3,
				commentText: 'Based on user input as well!',
				commentReactions: {
					emoji1: 0,
					emoji2: 0,
					emoji3: 0,
				},
			},
		],
	};

	let testComment = {
		commentID: 3,
		commentText: 'Based on user input as well!',
		commentReactions: {
			emoji1: 0,
			emoji2: 0,
			emoji3: 0,
		},
	};

	let fakeComment = {
		commentID: 3,
		commentText: 'Based on user input as well!',
		commentReactions: {
			emoji1: 0,
			emoji2: 0,
			emoji3: 0,
		},
	};

	let patchJoke = {
		// id: 3,
		jokeText: 'This is a changed joke text',
		jokeEmoji: '#',
		jokeReactions: {
			emoji1: 1,
			emoji2: 3,
			emoji3: 4,
		},
		comments: [
			{
				commentID: 3,
				commentText: 'This is a changed comment',
				commentReactions: {
					emoji1: 2,
					emoji2: 5,
					emoji3: 1,
				},
			},
		],
	};

	let patchComment = {
		comments: [
			{
				commentID: 1,
				commentText: 'This is a changed comment',
				commentReactions: {
					emoji2: 5,
					emoji3: 1,
				},
			},
		],
	};

	beforeAll(() => {
		api = server.listen(5000, () =>
			console.log('test server running on port 5000')
		);
	});

	afterAll((done) => {
		console.log('Gracefully stopping test server');
		api.close(done);
	});

	// -------- GET
	test('it responds to get / with status 200', (done) => {
		request(api).get('/').expect(200, done);
	});

	test('it responds to get /jokes with status 200', (done) => {
		request(api).get('/jokes').expect(200, done);
	});

	test('retrieves a joke by id', (done) => {
		request(api)
			.get('/jokes/2')
			.expect(
				{
					id: 2,
					jokeText: 'Based on user input, refer to input in html',
					jokeEmoji: '#',
					jokeReactions: {
						emoji1: 0,
						emoji2: 0,
						emoji3: 0,
					},
					comments: [
						{
							commentID: 1,
							commentText: 'Only two comments!',
							commentReactions: {
								emoji1: 0,
								emoji2: 0,
								emoji3: 0,
							},
						},
						{
							commentID: 2,
							commentText: 'Based on user input as well!',
							commentReactions: {
								emoji1: 0,
								emoji2: 0,
								emoji3: 0,
							},
						},
					],
				},
				done
			);
	});

	test('responds to non-existent joke with a status 404', (done) => {
		request(api)
			.get('/jokes/394')
			.expect(404)
			.expect({ message: 'This joke does not exist' }, done);
	});

	test('it responds to get /jokes/:id/comments with status 200', (done) => {
		request(api).get('/jokes/2/comments').expect(200, done);
	});

	test('responds to non-existent joke with a status 404', (done) => {
		request(api)
			.get('/jokes/394/comments')
			.expect(404)
			.expect({ message: 'This joke does not exist' }, done);
	});

	// -------- POST

	test('responds to post /jokes/new with status 201', (done) => {
		request(api)
			.post('/jokes/new')
			.send(testJoke)
			.set('Content-type', 'application/json')
			.expect(201, done);
	});

	test('responds to post /jokes/:id/comments/new with status 201', (done) => {
		request(api)
			.post('/jokes/1/comments/new')
			.send(testComment)
			.set('Content-type', 'application/json')
			.expect(201, done);
	});

	test('responds to non-existent joke with a status 404', (done) => {
		request(api)
			.post('/jokes/394/comments/new')
			.expect(404)
			.expect({ message: 'This joke does not exist' }, done);
	});

	// -------- DELETE

	test('responds to delete /jokes/:id with status 204', async () => {
		await request(api).delete('/jokes/4').expect(204);

		const updatedJokes = await request(api).get('/jokes');

		expect(updatedJokes.body.length).toBe(3);
	});

	test('responds to delete non-existent joke with status 404', (done) => {
		request(api).delete('/jokes/394').expect(404, done);
	});

	test('responds to delete comment with 204', (done) => {
		request(api)
			.delete('/jokes/1/comments')
			.send(testComment)
			.set('Content-type', 'application/json')
			.expect(204, done);
	});

	test('responds to delete non-existent joke comment with status 404', (done) => {
		request(api)
			.delete('/jokes/1/comments')
			.send(fakeComment)
			.expect(404)
			.expect({ message: 'Could not find comment' }, done);
	});

	test('responds to delete comment in non-existent post with status 404', (done) => {
		request(api)
			.delete('/jokes/394/comments')
			.send(testComment)
			.expect(404)
			.expect({ message: 'The reference joke id is not valid' }, done);
	});

	// -------- PATCH
	test('responds to patch jokes/:id with 202', (done) => {
		request(api).patch('/jokes/3').send(patchJoke).expect(202, done);
	});

	test('responds to patch non-existent joke with 404', (done) => {
		request(api)
			.patch('/jokes/394')
			.send(patchJoke)
			.expect(404)
			.expect({ message: 'This joke does not exist' }, done);
	});

	// test('responds to patching emoji in jokes/:id with 202', (done) => {
	// 	request(api).patch('/jokes/3').send(patchComment).expect(202, done);
	// });

	test('responds to patch non existent joke comments with 404', (done) => {
		request(api).patch('/jokes/394/comments').send(patchJoke).expect(404, done);
	});
});
