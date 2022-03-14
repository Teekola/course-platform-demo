import { getUsers, getUser, createUser } from "../../../prisma/queries/users";
import peppers from "../../../lib/peppers";
const crypto = require('crypto');

const PASSWORD_SECRET = process.env.PASSWORD_SECRET;

export default async function handler(req, res) {
    const { method } = req;

    // Get all users
    if (method === "GET") {
        try {
            const allUsers = await getUsers();
            return res.status(200).json({ users: allUsers });
        } catch (error) {
            console.error("Could not get users", error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    // Create new user
    else if (method === "POST") {
        const { body } = req;
        const { email, password } = body;

        // Check for bad request
        console.log(email);
        console.log(password);
        if (!email) return res.status(400).json({ message: "missing email" });
        if (!password) return res.status(400).json({ message: "missing password" });

        // Create the id
        const id = crypto.createHash('sha256').update(email).digest('hex');

        // Check if the id (so email) is available
        const get_user = await getUser(id);
        if (get_user) return res.status(400).json({ message: "This email is already in use. Do you want to login instead?" });

        /////////////////////////////////////////
        // CREATE PASSWORD HASH
        /////////////////////////////////////////

        // Pick random element from peppers array
        const pepper = peppers[Math.floor(Math.random() * peppers.length)];
        // Create random salt
        const salt = crypto.randomBytes(32).toString('hex');
        // Construct the password to be stored
        const storedPassword = pepper + password + salt;

        // Hash the password
        const hash = crypto.createHmac('sha256', PASSWORD_SECRET).update(storedPassword).digest('hex');

        /////////////////////////////////////////
        // CREATE USER
        /////////////////////////////////////////

        // Create user payload
        const userData = {
            id,
            email,
            hash,
            salt,
            name: body.name ? body.name : ""
        }

        try {
            const create_user = await createUser(userData);
            return res.status(201).json(create_user);
        } catch (error) {
            console.error("Could not create new user", error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}