import { addSubject, updateSubject, deleteSubject, rechercheSubject, listerSubjects } from '../services/subjectService.js';


function lister_Suject(req,res){
    res.json(listerSubjects());
}

function recherche_Subject(req,res){
    const subject = rechercheSubject(req.params.id);
    if (!subject) {
        return res.status(404).json({
            message: "Matière introuvable"
        });
    }
    res.json(subject);
}

function add_Subject(req,res){
    const subject = addSubject(req.body);
    res.status(201).json(subject);
}

function add_Subject_id(req,res){
    const subject = addSubject(req.params.id,req.body);
    res.status(201).json(subject);
}

function update_Subject(req,res){
    const subject = updateSubject(req.params.id,req.body);
    if(!subject){
        return res.status(404).json({
            message:'Matiere non trouvee'
        })
    }
    res.json(subject)
}

function delete_Subject(req,res){
    const subject = deleteSubject(req.params.id);
    if(!subject){
        return res.status(404).json({
            message : 'Sujet non trouve'
        })
    }
    res.json(subject)
}

export {lister_Suject, recherche_Subject, add_Subject, add_Subject_id, update_Subject, delete_Subject}
