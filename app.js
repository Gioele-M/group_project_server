const express = require('express');
const app = express();
//import cors and app.use cors
const cors = require('cors');

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	// .get requires the page
	res.send('Hello Auguste!'); //This is what's put on the page
});

// Get all jokes
app.get('/jokes', (req, res) => {
	res.send(jokes);
	// --------- remember to define jokes
});

// Get individual joke
app.get('/jokes/:id', (req, res) => {
	try {
		const jokeId = parseInt(req.params.id);
		const joke = jokes[jokeId - 1];

		if (!joke) {
			throw new Error('This joke does not exist');
		} else {
			res.send(joke);
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

// Post new joke
app.post('jokes/new', (req, res) => {
	const newJokeId = cats.length + 1;

	const newJoke = { ...req.body, id: newJokeId };
	jokes.push(newJoke);
	res.status(201).send(newJoke);
});

// Delete specific joke
app.delete('/jokes/:id', (req, res) => {});

module.exports = app;
