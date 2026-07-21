import {addTeacher, updateTeacher, deleteTeacher, rechercheTeacher, listerTeachers} from "../services/teacherService.js";


function liste_Teacher (req,res){
    res.json(listerTeachers());
}

function recherche_Teacher (req,res){
    const teacher = rechercheTeacher(req.params.id);
    if (!teacher) {
        return res.status(404).json({
            message: "Enseignant introuvable"
        });
    }
    res.json(teacher);
}

function add_Teacher(req,res){
    const teacher = addTeacher(req.body);
    res.status(201).json(teacher);
}

function add_Teacher_id (req,res){
    const teacher = addTeacher(req.params.id,req.body);
    res.status(201).json(teacher);
}

function update_Teacher(req,res){
    const teacher = updateTeacher(req.params.id,req.body);
    if(!teacher){
        return res.status(404).json({
            message:'Enseignant non trouve'
        })
    }
    res.json(teacher);
}

function delete_Teacher(req,res){
    const teacher = deleteTeacher(req.params.id),
    if(!teacher){
        return req.status(404).json({
            message : 'Professeur non trouve'
        })
    }
    res.json(teacher)
}

export {liste_Teacher, recherche_Teacher, add_Teacher, add_Teacher_id, update_Teacher, delete_Teacher}
