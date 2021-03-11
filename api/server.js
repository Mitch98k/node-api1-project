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
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
