const express = require('express');
const app = express();
const cors = require('cors');
const data = require('./data')



// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	// .get requires the page
	res.status(200).send('Hello Auguste!'); //This is what's put on the page
});

// Get all jokes
app.get('/jokes', (req, res) => {
	res.status(200).send(data.objectTypeJokeMany);
	// --------- remember to define jokes
});

// Get individual joke
app.get('/jokes/:id', (req, res) => {
	try {
		const jokeId = parseInt(req.params.id);
        //find the joke ID instead
        
		//const joke = data.objectTypeJokeMany[jokeId - 1];

        const joke = data.objectTypeJokeMany.find(e=> e.id == req.params.id)

		if (!joke) {
			throw new Error('This joke does not exist');
		} else {
			res.status(200).send(joke);
		}
	} catch (err) {
		res.status(404).send({ message: err.message });
	}
});





// Post new joke
app.post('/jokes/new', (req, res) => {
    // Adjust to get index of last item as if elements are deleted will overlap
	//const newJokeId = data.objectTypeJokeMany.length + 1
    
    const newJokeId = data.objectTypeJokeMany[data.objectTypeJokeMany.length - 1].id + 1

	const newJoke = { ...req.body, id: newJokeId }
	data.objectTypeJokeMany.push(newJoke);
	res.status(201).send(`The joke was posted! Joke id: ${newJokeId}`);
}
)

// Post requires the whole object in the body of the request!



// Delete specific joke
app.delete('/jokes/:id', (req, res) => {
    // from req body 
    // either : data.find(?) -> look for array method that matches object

    // Longer solution
    // req.body.id -> find this id in array -> get index -> remove by index

    // Replace empty object instead of splicing? 
    data.objectTypeJokeMany.splice(req.params.id -1, 1)
    
    console.log('Joke was deleted')
    res.status(204).end()
});

module.exports = app;



