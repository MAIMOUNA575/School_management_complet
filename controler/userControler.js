import {addUser,updateUser,deleteUser,rechercheUser,listerUsers} from "../services/userService.js";


function lister_User(req,res){
    res.json(listerUsers());
}

function recherche_User(req,res){
    const user = rechercheUser(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json(user);
}

function add_User(req,res){
    const user = addUser(req.body);
    res.status(201).json(user);
}

function add_User_id(req,res){
    const user = addUser(req.params.id,req.body);
    res.status(201).json(user);
}

function update_User(req,res){
    const user = updateUser(req.params.id, req.body);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json(user);
}

function delete_User(req,res){
    const user = deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json(user);
}

export {lister_User, recherche_User, add_User, add_User_id, update_User, delete_User}