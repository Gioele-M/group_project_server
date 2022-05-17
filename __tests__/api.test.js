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

	beforeAll(() => {
		api = server.listen(5000, () =>
			console.log('test server running on port 5000')
		);
	});

	afterAll((done) => {
		console.log('Gracefully stopping test server');
		api.close(done);
	});

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

	test('responds to post /jokes/new with status 201', (done) => {
		request(api)
			.post('/jokes/new')
			.send(testJoke)
			.set('Content-type', 'application/json')
			.expect(201);
	});
});
