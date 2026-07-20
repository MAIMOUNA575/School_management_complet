import express from "express";

import {addUser,updateUser,deleteUser,rechercheUser,listerUsers} from "../services/userService.js";

const app = express();
app.use(express.json())
app.get("/", (req, res) => {
    res.json(listerUsers());
});
app.get("/:id", (req, res) => {
    const user = rechercheUser(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json(user);
});

app.post("/", (req, res) => {
    const user = addUser(req.body);
    res.status(201).json(user);
});
app.post('/:id',(req,res)=>{
    const user = addUser(req.params.id,req.body);
    res.status(201).json(user);
})



app.put("/:id", (req, res) => {
    const user = updateUser(req.params.id, req.body);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json(user);
});





app.delete("/:id", (req, res) => {
    const user = deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json(user);
});

export default app;