import { getUser } from "../../../prisma/queries/users";

export default async function handler(req, res) {
    const { method, query } = req;

    // Get user
    if (method === "GET") {
        try {
            const user = await getUser(query.email);
            return res.status(200).json({ user });
        } catch (error) {
            console.error("Could not get user", error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}