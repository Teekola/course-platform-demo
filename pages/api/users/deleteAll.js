import { deleteAllUsers } from "../../../prisma/queries/users";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(400).json({ error: "wrong method" });
    if (req.body.signature !== "flajfoöw3j890uo9uso8gaio9u8ejjaij3ojgij") return res.status(401).json({ error: "unauthorized" });

    const delete_all_users = await deleteAllUsers();
    return res.status(200).json({ message: "all users deleted" });
}