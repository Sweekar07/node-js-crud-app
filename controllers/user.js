import { User } from '../models/user.js';

export async function getAllUsers(req, res) {
    User.findAll().then(users => {
        res.status(200).json({ users: users })
    })
    .catch(err => console.log("Error while retrieving all Users:\n", err))
}
