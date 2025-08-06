import { getAllUsers } from "../services/get-all-users-paginated.js";

export const getAllUsersController = async (req, res) => {
    try {
        const { page } = req.query
        if (typeof page!=='number'||page <= 0) {
            res.status(400).json({ message: 'Client error' })
        }
        const users = await getAllUsers(page, 10)
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

