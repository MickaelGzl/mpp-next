import { User } from "db/sequelize";

export default async function updateAvatar(req,res){
    const data = JSON.parse(req.body)
    console.log(data.id)
    console.log(data.avatar)

    try{
        const user = await User.findOne({where: {id: data.id}})
        await user.update({avatar: data.avatar})
        const message = `Avatar modifié.`;
        return res.status(200).json({message})
    }
    catch(err){
        const message = "Erreur serveur. Réessayer dans quelques instants.";
        res.status(500).json({message})
    }
}