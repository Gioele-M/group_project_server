const express = require('express');
const app = express();
const cors = require('cors');
const dayjs = require('dayjs');
const data = require('./data');
let jokes = data.objectTypeJokeMany;
let comments = data.objectTypeCommentMany;
let singleComment = data.objectTypeComment;

// middlewares
app.use(cors());
app.use(express.json());

//Refactor code as in
//Functions for repeated bits - If else in ? :

function returnTimeStamp() {
	return dayjs().format('ddd, MMM D, YYYY h:mm A');
}

// Server running
app.get('/', (req, res) => {
	// .get requires the page
	res.status(200).send('Hello Auguste!');
});

// Get all server endpoints
app.get('/endpoints', (req, res) => {
	res.status(200).send(listEndpoints(app));
});

// Get all jokes
app.get('/jokes', (req, res) => {
	res.status(200).send(jokes);
});

// Get individual joke
app.get('/jokes/:id', (req, res) => {
	try {
		// determine :id based on id of objects stored in array (not index, this causes shifting)
		const joke = jokes.find((e) => e.id == req.params.id);

		if (!joke) {
			throw new Error('This joke does not exist');
		} else {
			res.status(200).send(joke);
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

// Get joke's comments
app.get('/jokes/:id/comments', (req, res) => {
	try {
		// determine :id and search for comments
		const joke = jokes.find((e) => e.id == req.params.id);

		//Throw error if there's no joke w that id
		if (!joke) {
			throw new Error('This joke does not exist');
		} else {
			//Get the object comments from joke and post
			res.status(200).send(joke.comments);
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

// Post new joke
app.post('/jokes/new', (req, res) => {
	// Adjust to get index of last item as if elements are deleted will overlap

	const newJokeId = jokes[jokes.length - 1].id + 1;

	const newJoke = { ...req.body, id: newJokeId, timeStamp: returnTimeStamp() };
	jokes.push(newJoke);
	res.status(201).send(`The joke was posted! Joke id: ${newJokeId}`);
});

//Post new comment
app.post('/jokes/:id/comments/new', (req, res) => {
	try {
		// determine :id and search for comments
		const joke = jokes.find((e) => e.id == req.params.id);

		//Throw error if there's no joke w that id
		if (!joke) {
			throw new Error('This joke does not exist');
		} else {
			//Get the object comments from joke, check last comment ID, add ID to response body, append comment, send success response
			const newCommentId =
				joke.comments[joke.comments.length - 1].commentID + 1;
			joke.comments.push({
				...req.body,
				commentID: newCommentId,
				timeStamp: returnTimeStamp(),
			});
			res.status(201).send(req.body.commentText + '. Was posted');
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

// Delete specific joke
app.delete('/jokes/:id', (req, res) => {
	try {
		const idToRemove = req.params.id;
		//When testing try if for..of scope is accessible, then declare there
		let objToRemove;
		let indexToRemove;

		// Check if the joke with requested ID is present in array, if it is get object reference and index
		for (const joke of jokes) {
			if (joke.id == idToRemove) {
				objToRemove = joke;
				indexToRemove = jokes.indexOf(joke);
			}
		}

		//If the object exists, remove it and send success status
		if (objToRemove) {
			jokes.splice(indexToRemove, 1);
			res.status(204).send('Joke was removed');
		} else {
			//else throw error
			throw new Error(
				'This reference is not valid, joke was already deleted or non existent'
			);
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

//Delete comment
//Get joke from id, get comment body, match it with joke comment list, remove comment, send successful status

app.delete('/jokes/:id/comments', (req, res) => {
	try {
		//Get joke from id
		//When testing try if for..of scope is accessible, then declare there
		let objToRemove;

		// Check if the joke with requested ID is present in array, if it is get object reference and index
		for (const joke of jokes) {
			if (joke.id == req.params.id) {
				objToRemove = joke;
			}
		}

		//If the joke object exists get the comments and find comment to remove by id
		if (objToRemove) {
			let { comments } = objToRemove;

			//Store index to remove
			let indexToRemove;
			for (const comment of comments) {
				if (comment.commentID == req.body.commentID) {
					indexToRemove = comments.indexOf(comment);
				}
			}

			//Remove comment by index
			if (indexToRemove || indexToRemove == 0) {
				comments.splice(indexToRemove, 1);
				res.status(204).send(`Comment ${req.body.commentText} was deleted`);
			} else {
				throw new Error('Could not find comment');
			}
		} else {
			throw new Error('The reference joke id is not valid');
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

// Patching endpoints
// Change text content of joke
app.patch('/jokes/:id', (req, res) => {
	try {
		//Check that the joke exists, if it does return object reference,if it doesn't throw error
		let objToChange;

		for (const joke of jokes) {
			if (joke.id == req.params.id) {
				objToChange = joke;
			}
		}
		if (!objToChange) throw new Error('This joke does not exist');

		//Go through all the parameters and update the ones sent

		if (req.body.jokeText) {
			objToChange.jokeText = req.body.jokeText;

			res.status(202).send('Joke changes accepted');
			res.end();
		} else if (req.body.jokeEmoji) {
			objToChange.jokeEmoji = req.body.jokeEmoji;

			res.status(202).send('Joke giphy added');
		} else if (req.body.jokeReactions.emoji1) {
			objToChange.jokeReactions.emoji1 += 1;
			res.status(202).send('Emoji added');
		} else if (req.body.jokeReactions.emoji2) {
			objToChange.jokeReactions.emoji2 += 1;
			res.status(202).send('Emoji added');
		} else if (req.body.jokeReactions.emoji3) {
			objToChange.jokeReactions.emoji3 += 1;
			res.status(202).send('Emoji added');
		}

		// // This is best done in a switch statement so not to risk having multiple parameters sent at one time so causing issues

		// if (req.body.jokeText) {
		// 	objToChange.jokeText = req.body.jokeText;
		// 	console.log('Text was updated!');
		// 	res.status(202).send('Joke changes accepted');
		// }

		// if (req.body.jokeReactions.emoji1) {
		// 	objToChange.jokeReactions.emoji1 += 1;
		// 	res.status(202).send('Emoji added');
		// }

		// if (req.body.jokeReactions.emoji2) {
		// 	objToChange.jokeReactions.emoji2 += 1;
		// 	res.status(202).send('Emoji added');
		// }

		// if (req.body.jokeReactions.emoji3) {
		// 	objToChange.jokeReactions.emoji3 += 1;
		// 	res.status(202).send('Emoji added');
		// }

		// This works, other parameters to be added?
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

app.patch('/jokes/:id/comments', (req, res) => {
	try {
		//Check that the joke exists, if it does return object reference,if it doesn't throw error
		let objToChange;

		for (const joke of jokes) {
			if (joke.id == req.params.id) {
				objToChange = joke;
			}
		}
		if (!objToChange) throw new Error('This joke does not exist');

		//Get the comments and determine if comment is there

		let { comments } = objToChange;

		//Get reference to comment to change
		let commentToChange;

		for (const comment of comments) {
			if (comment.commentID == req.body.commentID) {
				commentToChange = comment;
			}
		}
		if (!commentToChange) {
			throw new Error('Could not find this comment');
		}

		//Check what element was sent to be patched and update accordingly

		if (req.body.commentText) {
			commentToChange.commentText = req.body.commentText;
			res.status(202).send('Comment updated');
		} else if (req.body.commentReactions.emoji1) {
			commentToChange.commentReactions.emoji1 += 1;
			res.status(202).send('Emoji added');
		} else if (req.body.commentReactions.emoji2) {
			commentToChange.commentReactions.emoji2 += 1;
			res.status(202).send('Emoji added');
		} else if (req.body.commentReactions.emoji3) {
			commentToChange.commentReactions.emoji3 += 1;
			res.status(202).send('Emoji added');
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});

module.exports = app;
