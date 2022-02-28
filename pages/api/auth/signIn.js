export default function handler(req, res) {
    // Retrieve username and password from the request body
    const { username, password } = req.body;

    // TODO:
    // 1) Add salt
    // Repeat until iterated through all peppers or match
    //      2) pick a pepper and add to the password
    //      3) get the hashvalue
    //      4) compare to the DB hashvalue
    if (username === "johndoe" && password === "123") {
        res.status(200).json({ id: 1, name: 'John Doe' });
    } else {
        res.status(401).json({ error: "wrong username or password" });
    }
} 