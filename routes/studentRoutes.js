import express from "express";
import {addStudent, updateStudent, deleteStudent, rechercheStudent, listerStudents} from "../services/studentService.js";

const app = express();
app.use(express.json())
app.get('/',(req,res)=>{
    res.json(listerStudents());
});
app.get('/:id',(req,res)=>{
    const student = rechercheStudent(req.params.id);
    if(!student){
        return res.status(404).json({
            message:'Etudiant introuvable'
        })
    }
    res.json(student)
})

app.post('/',(req,res)=>{
    const student = addStudent(req.body);
    res.status(201).json(student);
});
app.post('/:id',(req,res)=>{
    const student = addStudent(req.params.id,req.body);
    res.status(201).json(student);
})

app.put('/:id',(req,res)=>{
    const student = updateStudent(req.params.id,req.body);
    if(!student){
        return res.status(404).json({
            message:'Etudiant non trouve'
        })
    }
    res.json(student);
})

app.delete('/:id',(req,res)=>{
    const student = deleteStudent(req.params.id);
    if(!student){
        return res.status(404).json({
            message: 'Etudiant non trouve'
        })
    }
    res.json(user);
})

export default app;