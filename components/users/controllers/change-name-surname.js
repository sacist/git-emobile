import { changeNameSurname } from "../services/change-name-surname.js";

export const changeNameSurnameController=async (req,res) => {
    try {
        const {name,surname,id}=req.body
        if(!name||!surname||!id||typeof name!=='string'||typeof surname!=='string'||typeof id!=='number'){
            res.status(400).json({ message: 'Client error' })
        }
        await changeNameSurname(name,surname,id)
        res.json({message:'ok'})
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
}