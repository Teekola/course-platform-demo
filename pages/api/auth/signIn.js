export default function handler(req, res) {
    const { username, password } = req.body;
    if (username === "johndoe" && password === "123") {
        res.status(200).json({ id: 1, name: 'John Doe' });
    } else {
        res.status(401).json({ error: "wrong username or password" });
    }
} 