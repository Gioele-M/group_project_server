const express = require('express')
const app = express()
const cors = require('cors')
const data = require('./data')
let jokes = data.objectTypeJokeMany


// middlewares
app.use(cors());
app.use(express.json());



// To be deleted
app.get('/', (req, res) => {
	// .get requires the page
	res.status(200).send('Hello Auguste!'); //This is what's put on the page
});


// Get all jokes
app.get('/jokes', (req, res) => {
	res.status(200).send(jokes);
	// --------- remember to define jokes
});

// Get individual joke
app.get('/jokes/:id', (req, res) => {
	try {
		// determine :id based on id of objects stored in array (not index, this causes shifting)
        const joke = jokes.find(e=> e.id == req.params.id)

		if (!joke) {
			throw new Error('This joke does not exist')
		} else {
			res.status(200).send(joke)
		}
	} catch (err) {
		res.status(404).send({ message: err.message })
	}
});





// Post new joke
app.post('/jokes/new', (req, res) => {
    // Adjust to get index of last item as if elements are deleted will overlap
	//const newJokeId = jokes.length + 1
    
    const newJokeId = jokes[jokes.length - 1].id + 1

	const newJoke = { ...req.body, id: newJokeId }
	jokes.push(newJoke);
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


    //Find object reference by ID and remove it, throw error if no object with asked id 

    try{
        const idToRemove = req.params.id
        let objToRemove 
        let indexToRemove

        // Check if the joke with requested ID is present in array, if it is get object reference and index
        for(const joke of jokes){
            if(joke.id == idToRemove){
                objToRemove = joke
                indexToRemove = jokes.indexOf(joke)
            }
        }

        //Could be done better
        //If the object exists, remove it and send success status
        if(objToRemove){
            jokes.splice(indexToRemove, 1)
    
            console.log(`Joke ${req.params.id} was deleted`)
            res.status(204).end()
        }else{
            //else throw error
            throw new Error('This reference is not valid, joke was already deleted or non existent')
        }

    }catch(err){
        console.log('Something went wrong ' + err.message)
        res.status(404).end()
    }
    
});






module.exports = app



