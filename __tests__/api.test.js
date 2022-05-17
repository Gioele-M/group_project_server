const request = require('supertest');
const server = require('../app');

describe('API server', () => {
	let api;
	let testJoke = {
		id: 1,
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
});
