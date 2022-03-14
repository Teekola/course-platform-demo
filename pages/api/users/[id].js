import { getUser, deleteUser } from "../../../prisma/queries/users";

export default async function handler(req, res) {
    const { method, query } = req;
    const id = query.id;
    
    // Get user by id
    if (method === "GET") {
        try {
            const get_user = await getUser(id);
            if (get_user) return res.status(200).json(get_user);
            return res.status(404).end();
            
        } catch (error) {
            console.error("Could not get user", error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    // Delete user
    else if (method === "DELETE") {
        try {
            const delete_user = await deleteUser(id);
            console.log(delete_user);
            return res.status(200).json({ delete_user });
        } catch (error) {
            console.error("Could not delete user", error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}