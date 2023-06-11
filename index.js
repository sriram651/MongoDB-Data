const MongoClient = require('mongodb').MongoClient;

// Remember to insert the values of the user_name and password in the data file before executing.
const data = require("./data.json");

// Enter the desired DB Name here...
const dbName = "Users";

// Enter the desired Collection Name here - Make sure that the collection is present in the given DB.
const collectionName = "users";

const MONGODB = `mongodb+srv://${data.userName}:${data.password}@cluster0.8moomsn.mongodb.net/${dbName}?retryWrites=true&w=majority`;

MongoClient.connect(MONGODB, function(err, client) {
    return client;
}).then((client) => {
    console.log("MongoDB Connected!");

    // Fetching the collection object in order to insert in it.
    const collection = client.db(dbName).collection(collectionName);
    pushToMongoDB(collection);
});

function pushToMongoDB(collection) {
    collection.insertMany(data.json, () => {
        client.close();
    }).then(() => {
        console.log(`Pushed ${data.json.length} documents to database`);
    });
}