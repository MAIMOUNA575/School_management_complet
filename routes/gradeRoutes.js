import express from 'express';
import { addGrade, updateGrade, deleteGrade, rechercheGrade, listerGrades } from '../services/gradeService.js';

const app = express();

app.get('/', (req, res) => {
    res.json(listerGrades());
});
app.get('/:id', (req, res) => {
    const grade = rechercheGrade(req.params.id);
    if (!grade) {
        return res.status(404).json({
            message: 'Grade introuvable'
        });
    }
    res.json(grade);
});

app.post('/',(req,res)=>{
    const grade = addGrade(req,res);
    res.status(201).json(grade);
});
app.post('/:id',(req,res)=>{
    const grade = addGrade(req.params.id,req.body);
    res.status(201).json(grade);
})

app.put('/:id',(req,res)=>{
    const grade = updateGrade(req.params.id,req.body);
    if(!grade){
        return res.status(404).json({
            message :'Note non trouvee '
        })
    }
    res.json(grade);
})

app.delete('/:id',(req,res)=>{
    const grade = deleteGrade(req.params.id);
    if(!grade){
        return res.status(404).json({
            message :'Note non trouvee '
        })
    }
    res.json(grade);
})
export default app;