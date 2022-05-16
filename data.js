
let objectTypeJoke ={
    id: 1, // Will be incremental
    jokeText: 'Based on user input, refer to input in html',
    jokeEmoji: '#', //url to emoji(?) Give user possibility to insert emoji, blank if null
    jokeReactions: {
        emoji1: 0,
        emoji2: 0,
        emoji3: 0 // This will be accessed and modified with patch (? can we do += 1 instead of retrieving this)
    },
    comments: [
        // Will this point to the endpoints or stores the object themselves?
        // for the moment it stores an array of comments objects
        {
            commentID: 1, 
            commentText: 'Based on user input as well!',
            commentReactions:{
                emoji1: 0, 
                emoji2: 0,
                emoji3: 0 
            },
        },
        {
            commentID: 2, 
            commentText: 'Based on user input as well!',
            commentReactions:{
                emoji1: 0, 
                emoji2: 0,
                emoji3: 0 
            },
        },
        {
            commentID: 3, 
            commentText: 'Based on user input as well!',
            commentReactions:{
                emoji1: 0, 
                emoji2: 0,
                emoji3: 0 
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
        jokeText: 'Based on user input, refer to input in html',
        jokeEmoji: '#', //url to emoji(?) Give user possibility to insert emoji, blank if null
        jokeReactions: {
            emoji1: 0,
            emoji2: 0,
            emoji3: 0 // This will be accessed and modified with patch (? can we do += 1 instead of retrieving this)
        },
        comments: [
            // Will this point to the endpoints or stores the object themselves?
            // for the moment it stores an array of comments objects
            {
                commentID: 1, 
                commentText: 'Based on user input as well!',
                commentReactions:{
                    emoji1: 0, 
                    emoji2: 0,
                    emoji3: 0 
                },
            },
            {
                commentID: 2, 
                commentText: 'Based on user input as well!',
                commentReactions:{
                    emoji1: 0, 
                    emoji2: 0,
                    emoji3: 0 
                },
            },
            {
                commentID: 3, 
                commentText: 'Based on user input as well!',
                commentReactions:{
                    emoji1: 0, 
                    emoji2: 0,
                    emoji3: 0 
                },
            }
    
        ]
    },
    {
        id: 2, // Will be incremental
        jokeText: 'Based on user input, refer to input in html',
        jokeEmoji: '#', //url to emoji(?) Give user possibility to insert emoji, blank if null
        jokeReactions: {
            emoji1: 0,
            emoji2: 0,
            emoji3: 0 // This will be accessed and modified with patch (? can we do += 1 instead of retrieving this)
        },
        comments: [
            // Will this point to the endpoints or stores the object themselves?
            // for the moment it stores an array of comments objects
            {
                commentID: 1, 
                commentText: 'Based on user input as well!',
                commentReactions:{
                    emoji1: 0, 
                    emoji2: 0,
                    emoji3: 0 
                },
            },
            {
                commentID: 2, 
                commentText: 'Based on user input as well!',
                commentReactions:{
                    emoji1: 0, 
                    emoji2: 0,
                    emoji3: 0 
                },
            },
            {
                commentID: 3, 
                commentText: 'Based on user input as well!',
                commentReactions:{
                    emoji1: 0, 
                    emoji2: 0,
                    emoji3: 0 
                },
            }
    
        ]
    },
    {
        "id": 3, 
        "jokeText": "Based on user input, refer to input in html",
        "jokeEmoji": "#",
        "jokeReactions": {
            "emoji1": 0,
            "emoji2": 0,
            "emoji3": 0 
        },
        "comments": [
            {
                "commentID": 1, 
                "commentText": "Based on user input as well!",
                "commentReactions":{
                    "emoji1": 0, 
                    "emoji2": 0,
                    "emoji3": 0 
                },
            }
        ]
    }
]




const sampleRequest = {
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








module.exports = {objectTypeJoke, objectTypeComment, objectTypeJokeMany, sampleRequest}
