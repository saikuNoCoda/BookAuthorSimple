const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

app.use(cors());

const mongooseConnection = "your connection string";

mongoose.connect(mongooseConnection,(err) => {
    if(err) console.log(err);
});

mongoose.connection.once('open', () => {
    console.log("connected to database");
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
