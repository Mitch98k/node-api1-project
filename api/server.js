// BUILD YOUR SERVER HERE
const express = require('express');
const User = require("./users/model.js");

const server = express();

server.use(express.json());

// post request
server.post('/api/users', async (req, res) => {
    const user = req.body;

    if (!user.name || !user.bio) {
        res.status(400).json({ message: 'Please privide name and bio for the user' });
    } else {
        try {
            const newUser = await User.insert(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ message: 'There was an error while saving the user to the database'})
        }
    }
});

// get requests
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'The users information could not be retrieved' })
    }
});
server.get('/api/users/:id', async (req, res) => {
    const {id} = req.params;

        try {
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({ message: 'the user with the specified ID does not exist'});
            } else {
            res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json({ message: 'the user information could not be retrieved'});
        }
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
