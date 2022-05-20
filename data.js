
let objectTypeJoke ={
    id: 1, // Will be incremental
    jokeText: 'I went to the zoo the other day, there was only one dog in it...',
    jokeEmoji: '#', //url to emoji(?) Give user possibility to insert emoji, blank if null
    jokeReactions: {
        emoji1: 20,
        emoji2: 5,
        emoji3: 8 // This will be accessed and modified with patch (? can we do += 1 instead of retrieving this)
    },
    comments: [
        // Will this point to the endpoints or stores the object themselves?
        // for the moment it stores an array of comments objects
        {
            commentID: 1, 
            commentText: 'It was a shitzu!',
            commentReactions:{
                emoji1: 25, 
                emoji2: 10,
                emoji3: 5 
            },
        },
        {
            commentID: 2, 
            commentText: 'Ahahahaha how funny boi',
            commentReactions:{
                emoji1: 30, 
                emoji2: 0,
                emoji3: 2 
            },
        }

    ]
}


let objectTypeComment ={
    commentID: 1, //Incremental per post (index+1)
    commentText: 'Based on user input as well!',
    commentReactions:{
        emoji1: 0, //same as joke obj
        emoji2: 0,
        emoji3: 0 
    }
}

let objectTypeJokeMany = [
    {
        id: 1, // Will be incremental
        jokeText: 'I went to the zoo the other day, there was only one dog in it...',
        jokeEmoji: '#', //url to emoji(?) Give user possibility to insert emoji, blank if null
        jokeReactions: {
            emoji1: 20,
            emoji2: 5,
            emoji3: 8 // This will be accessed and modified with patch (? can we do += 1 instead of retrieving this)
        },
        comments: [
            // Will this point to the endpoints or stores the object themselves?
            // for the moment it stores an array of comments objects
            {
                commentID: 1, 
                commentText: 'It was a shitzu!',
                commentReactions:{
                    emoji1: 25, 
                    emoji2: 10,
                    emoji3: 5 
                },
            },
            {
                commentID: 2, 
                commentText: 'Ahahahaha how funny boi',
                commentReactions:{
                    emoji1: 30, 
                    emoji2: 0,
                    emoji3: 2 
                },
            }
    
        ]
    },
    {
        id: 2, // Will be incremental
        jokeText: 'A woman gets on a bus with her baby. The driver says, “Ugh! That’s the ugliest baby I’ve ever seen. The woman stalks off to the rear of the bus and sits down. She turns to the man sitting next to her and says, “The driver just insulted me!”',
        jokeEmoji: '#', //url to emoji(?) Give user possibility to insert emoji, blank if null
        jokeReactions: {
            emoji1: 10,
            emoji2: 12,
            emoji3: 5 // This will be accessed and modified with patch (? can we do += 1 instead of retrieving this)
        },
        comments: [
            // Will this point to the endpoints or stores the object themselves?
            // for the moment it stores an array of comments objects
            {
                commentID: 1, 
                commentText: 'The man says, “You go and give him a telling off. I’ll hold your monkey for you.”',
                commentReactions:{
                    emoji1: 10, 
                    emoji2: 5,
                    emoji3: 5 
                },
            },
            {
                commentID: 2, 
                commentText: 'Dyslexic man walks into a bra!',
                commentReactions:{
                    emoji1: 150, 
                    emoji2: 0,
                    emoji3: 0 
                },
            },
           
        ]
    },
    {
        "id": 3, 
        "jokeText": "Police arrested two kids yesterday, one was drinking battery acid, the other was eating fireworks.",
        "jokeEmoji": "#",
        "jokeReactions": {
            "emoji1": 0,
            "emoji2": 0,
            "emoji3": 0 
        },
        "comments": [
            {
                "commentID": 1, 
                "commentText": "They charged one – and let the other one off!!",
                "commentReactions":{
                    "emoji1": 0, 
                    "emoji2": 0,
                    "emoji3": 0 
                },
            }
        ]
    }
]




const sampleRequestJoke = {
    "jokeText": "This is a sample text",
    "jokeEmoji": "#",
    "jokeReactions": {
        "emoji1": 0,
        "emoji2": 0,
        "emoji3": 0 
    },
    "comments": [
        {
            "commentID": 1, 
            "commentText": "This is a sample too!",
            "commentReactions":{
                "emoji1": 0, 
                "emoji2": 0,
                "emoji3": 0 
            }
        }
    ]
}

const sampleRequestComment= {
    "commentID": 123,
    "commentText": "Test comment",
    "commentReactions": {
      "emoji1": 0,
      "emoji2": 0,
      "emoji3": 0
    }
}

const sampleRequestJokeEmoji = {
    "jokeReactions": {
      "emoji1": 1
    }
  }

const sampleRequestCommentEmoji ={
    "commentID": 1,
    "commentReactions": {
      "emoji1": 1
    }
  }



let objectTypeCommentMany = [
    {
        commentID: 1, 
        commentText: 'This is comment 1',
        commentReactions:{
            emoji1: 0, //same as joke obj
            emoji2: 0,
            emoji3: 0 
        }
    },
    {
        commentID: 1, 
        commentText: 'This is comment 2',
        commentReactions:{
            emoji1: 0, 
            emoji2: 0,
            emoji3: 0 
        }
    },
    {
        "commentID": 1, 
        "commentText": "This is comment 3!",
        "commentReactions":{
            "emoji1": 0, 
            "emoji2": 0,
            "emoji3": 0 
        }
    }
]

//--------------------------




//--------------------------






module.exports = {objectTypeJoke, objectTypeComment, objectTypeJokeMany, sampleRequestJoke, sampleRequestComment,  objectTypeCommentMany}
