export default function handler(req, res) {
    // Retrieve username and password from the request body
    const { username, password } = req.body;

    // TODO:
    // 1) Fetch from the DB the hash and the salt matching the username
    // 2) Add the salt to the password
    // Repeat until iterated through all peppers or match
    //      3) pick a pepper and add to the password
    //      4) get the hashvalue
    //      5) compare to the DB hashvalue
    if (username === "johndoe" && password === "123") {
        res.status(200).json({ id: 1, name: 'John Doe' });
    } else {
        res.status(401).json({ error: "wrong username or password" });
    }
} 