import express from "express";
import {addTeacher, updateTeacher, deleteTeacher, rechercheTeacher, listerTeachers} from "../services/teacherService.js";


const app = express();

app.get("/", (req, res) => {
    res.json(listerTeachers());
});
app.get("/:id",(req, res)=> {
    const teacher = rechercheTeacher(req.params.id);
    if (!teacher) {
        return res.status(404).json({
            message: "Enseignant introuvable"
        });
    }
    res.json(teacher);
});

app.post('/',(req,res)=>{
    const teacher = addTeacher(req.body);
    res.status(201).json(teacher);
});
app.post('/:id',(req,res)=>{
    const teacher = addTeacher(req.params.id,req.body);
    res.status(201).json(teacher);
})

app.put('/:id',(req,res)=>{
    const teacher = updateTeacher(req.params.id,req.body);
    if(!teacher){
        return res.status(404).json({
            message:'Enseignant non trouve'
        })
    }
    res.json(teacher);
})
export default app;