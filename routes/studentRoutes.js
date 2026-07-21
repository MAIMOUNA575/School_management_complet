import express from "express";
import {lister_Student, recherche_Student, add_Student, add_Student_id, update_Student, delete_Student} from '../controler/studentControler'


const router = express.Router();



router.get('/',lister_Student);

router.get('/:id',recherche_Student);

router.post('/',add_Student);

router.post('/:id',add_Student_id);

router.put('/:id',update_Student);

router.delete('/:id',delete_Student);

export default router;