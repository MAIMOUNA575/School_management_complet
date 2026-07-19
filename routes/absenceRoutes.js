import express from "express";
import {addStudent, updateStudent, deleteStudent, rechercheStudent, listerStudents} from "../services/studentService.js";

const app = express();

app.get("/", (req, res) => {
    res.json(listerStudents());
});
app.get("/:id", (req, res) => {
    const student = rechercheStudent(req.params.id);
    if (!student) {
        return res.status(404).json({
            message: "Etudiant introuvable"
        });
    }
    res.json(student);
});


app.post('/',(req,res)=>{
    const absence = addAbsence(req ,res);
    res.status(201).json(absence);
});
app.post('/:id', (req,res)=>{
    const absence = addAbsence(req.params.id, req.body);
    res.status(201).json(absence);
});


app.put('/:id',(req,res)=>{
    const absence = updateAbsence(req.params.id,req.body);
    if(!absence){
        return res.status(404).json({
            message:'Absence NON trouver'
        })
    }
    res.json(absence);
});

app.delete('/:id',(req,res)=>{
    const absence = deleteAbsence(req.params.id);
    if(!absence){
        return res.status(404).json({
            message:'Absence non trouve'
        })
    }
    res.json(absence);
});
export default app;