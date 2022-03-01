import { getUsers } from "../../../prisma/queries/users";
import { createUser } from "../../../prisma/queries/users";
import peppers from "../../../lib/peppers";
const crypto = require('crypto');

const PASSWORD_SECRET = process.env.PASSWORD_SECRET;

export default async function handler(req, res) {
    const { method } = req;

    // Get all users
    if (method === "GET") {
        try {
            const allUsers = getUsers();
            console.log(allUsers);
            return res.status(200).json({ users: allUsers });
        } catch (error) {
            console.error("Could not get users", error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    // Create new user
    else if (method === "POST") {
        const { body } = req;

        const { email, password } = JSON.parse(body);

        // Pick random element from peppers array
        const pepper = peppers[Math.floor(Math.random() * peppers.length)];
        // Create random salt
        const salt = crypto.randomBytes(32).toString('hex');
        // Construct the password to be stored
        const storedPassword = pepper + password + salt;

        // Hash the password
        const hash = crypto.createHmac('sha256', PASSWORD_SECRET).update(storedPassword).digest('hex');

        const userData = {
            email,
            hash,
            salt,
            name: body.name? body.name : ""
        }

        try {
            const newUser = await createUser(userData);
            return res.status(201).json({ created: newUser });
        } catch (error) {
            console.error("Could not create new user", error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}