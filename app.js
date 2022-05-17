const express = require('express')
const app = express()
const cors = require('cors')
const data = require('./data')
let jokes = data.objectTypeJokeMany
let comments  = data.objectTypeCommentMany
let singleComment = data.objectTypeComment

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


// Get joke's comments
app.get('/jokes/:id/comments', (req, res)=>{
    try{
        // determine :id and search for comments
        const joke = jokes.find(e=> e.id == req.params.id)

        //Throw error if there's no joke w that id
        if (!joke) {
			throw new Error('This joke does not exist')
		} else {
            //Get the object comments from joke and post
            res.status(200).send(joke.comments)
        }


    }catch(err){
        res.status(404).send({message: err.message})
    }
})








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


//Post new comment
app.post('/jokes/:id/comments', (req, res)=>{
    try{
        // determine :id and search for comments
        const joke = jokes.find(e=> e.id == req.params.id)

        //Throw error if there's no joke w that id
        if (!joke) {
			throw new Error('This joke does not exist')
		} else {
            //Get the object comments from joke, check last comment ID, add ID to response body, append comment, send success response
            const newCommentId = joke.comments[joke.comments.length - 1].commentID + 1
            joke.comments.push({...req.body, commentID : newCommentId})
            res.status(201).send(req.body.commentText + '. Was posted')
        }
        
    }catch(err){
        res.status(404).send('Error message: '+{message: err.message})
    }
})








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
        res.status(404).send({message: err.message})
    }
    
});



// Patching endpoints
// Change text content of joke

app.patch('/jokes/:id', (req, res)=>{
    try{
        //Get joke id requested
        let textIdToChange = req.params.id

        //Check that the joke exists, if it does return object reference,if it doesn't throw error
        let objToChange

        for(const joke of jokes){
            if(joke.id == textIdToChange){
                objToChange = joke
                console.log('Object was found')
            }
        }
        if(!objToChange) throw new Error('This joke does not exist')


        console.log(objToChange)

        //Go through all the parameters and update the ones sent

        if(req.body.jokeText){
            objToChange.jokeText = req.body.jokeText
            console.log('Text was updated!')
            res.status(202).send('Joke changes accepted')
        }

        // This works, other parameters to be added?


    }catch(err){
        res.status(404).send({message: err.message})
    }

})








module.exports = app



