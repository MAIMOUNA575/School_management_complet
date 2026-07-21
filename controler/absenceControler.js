import { listerStudents,addStudent,updateStudent,deleteStudent,rechercheStudent, } from "../services/studentService.js";

function lister_Absence(req,res){
    res.json(listerAbsence());
}


function rechercher_Absence(req,res){
    const student = rechercheStudent(req.params.id);
    if (!student) {
        return res.status(404).json({
            message: "Etudiant introuvable"
        });
    }
    res.json(student);
}

function add_Absence(req,res){
    const absence = addAbsence(req ,res);
    res.status(201).json(absence);
}

function add_Absence_id(req,res){
    const absence = addAbsence(req.params.id, req.body);
    res.status(201).json(absence);
}

function update_Absence(req,res){
    const absence = updateAbsence(req.params.id,req.body);
    if(!absence){
        return res.status(404).json({
            message:'Absence NON trouver'
        })
    }
    res.json(absence);
}

function delete_Absence(req,res){
    const absence = deleteAbsence(req.params.id);
    if(!absence){
        return res.status(404).json({
            message:'Absence non trouve'
        })
    }
    res.json(absence);
}


export {lister_Absence, rechercher_Absence, add_Absence, add_Absence_id, update_Absence, delete_Absence}
