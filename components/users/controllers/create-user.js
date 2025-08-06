import { createUser } from "../services/create-user.js";

export const createUserController=async(req,res) => {
    try {
        const userData=req.body
        await createUser(userData)
        res.json({message:'ok'})
    } catch (e) {
        res.status(500).json({message:'Internal server error'})
    }
}