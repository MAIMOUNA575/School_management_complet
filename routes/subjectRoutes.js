import express from 'express';
import { addSubject, updateSubject, deleteSubject, rechercheSubject, listerSubjects } from '../services/subjectService.js';

const app = express();
app.use(express.json())
app.get('/',(req,res)=> {
    res.json(listerSubjects());
});
app.get('/:id',(req,res)=> {
    const subject = rechercheSubject(req.params.id);
    if (!subject) {
        return res.status(404).json({
            message: "Matière introuvable"
        });
    }
    res.json(subject);
});

app.post('/',(req,res)=>{
    const subject = addSubject(req.body);
    res.status(201).json(subject);
});
app.post('/:id',(req,res)=>{
    const subject = addSubject(req.params.id,req.body);
    res.status(201).json(subject);
})

app.put('/:id',(req,res)=>{
    const subject = updateSubject(req.params.id,req.body);
    if(!subject){
        return res.status(404).json({
            message:'Matiere non trouvee'
        })
    }
    res.json(subject)
})

app.delete('/:id',(req,res)=>{
    const subject = deleteSubject(req.params.id);
    if(!subject){
        return res.status(404).json({
            message : 'Sujet non trouve'
        })
    }
    res.json(subject)
})
export default app;