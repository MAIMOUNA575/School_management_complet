import {addStudent, updateStudent, deleteStudent, rechercheStudent, listerStudents} from "../services/studentService.js";


function lister_Student(req,res){
    res.json(listerStudents());
}

function recherche_Student (req,res){
    const student = rechercheStudent(req.params.id);
    if(!student){
        return res.status(404).json({
            message:'Etudiant introuvable'
        })
    }
    res.json(student)
}

function add_Student(req,res){
    const student = addStudent(req.body);
    res.status(201).json(student);
}

function add_Student_id(req,res){
    const student = addStudent(req.params.id,req.body);
    res.status(201).json(student);
}

function update_Student(req,res){
    const student = updateStudent(req.params.id,req.body);
    if(!student){
        return res.status(404).json({
            message:'Etudiant non trouve'
        })
    }
    res.json(student);
}

function delete_Student(req,res){
    const student = deleteStudent(req.params.id);
    if(!student){
        return res.status(404).json({
            message: 'Etudiant non trouve'
        })
    }
    res.json(user);
}

export {lister_Student, recherche_Student, add_Student, add_Student_id, update_Student, delete_Student}
