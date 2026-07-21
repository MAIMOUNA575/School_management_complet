import { addGrade, updateGrade, deleteGrade, rechercheGrade, listerGrades } from '../services/gradeService.js';


function lister_Grade (req,res){
    res.json(listerGrades());
}

function recherche_Grade (req,res){
    const grade = rechercheGrade(req.params.id);
    if (!grade) {
        return res.status(404).json({
            message: 'Grade introuvable'
        });
    }
    res.json(grade);
}

function add_Grade(req,res){
    const grade = addGrade(req,res);
    res.status(201).json(grade);
}

function add_Grade_id(req,res){
    const grade = addGrade(req.params.id,req.body);
    res.status(201).json(grade);
}

function update_Grade(req,res){
    const grade = updateGrade(req.params.id,req.body);
    if(!grade){
        return res.status(404).json({
            message :'Note non trouvee '
        })
    }
    res.json(grade);
}

function delete_Grade(req,res){
    const grade = deleteGrade(req.params.id);
    if(!grade){
        return res.status(404).json({
            message :'Note non trouvee '
        })
    }
    res.json(grade);
}

export {lister_Grade, recherche_Grade, add_Grade, add_Grade_id, update_Grade, delete_Grade}