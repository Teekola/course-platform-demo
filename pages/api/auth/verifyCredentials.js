const crypto = require('crypto');
import { getUser } from '../../../prisma/queries/users';
import peppers from '../../../lib/peppers';

const PASSWORD_SECRET = process.env.PASSWORD_SECRET;

export default async function handler(req, res) {
    // Retrieve email and password from the request body
    const { email, password } = req.body;

    // Fetch the hash and the salt from the DB with the username
    const user = await getUser(email);

    if (!user) return res.status(401).json({ error: "wrong username" });

    const salt = user.salt;
    const correct = user.hash;

    // Add salt
    const saltedInput = password + salt;

    // Initialize variables for the string to be hashed and the hashed value
    let pepperedSaltedInput, test;

    // Go through all peppers in order, calculate the hash,
    // and compare it to the correct hash
    let success;
    peppers.forEach((pepper) => {
        pepperedSaltedInput = pepper + saltedInput;
        test = crypto.createHmac('sha256', PASSWORD_SECRET).update(pepperedSaltedInput).digest('hex');
        if (test === correct) {
            success = true;
        }
    })
    // If the credentials did not match, return unauthorized
    if (!success) return res.status(401).json({ error: "wrong username or password" });

    // The credentials matched, return the user object
    return res.status(200).json({ id: user.id, name: user.name, email: user.email });
} 