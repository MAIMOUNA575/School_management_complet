import express from "express";
import { liste_Teacher, recherche_Teacher, add_Teacher, add_Teacher_id, update_Teacher, delete_Teacher} from "../controler/teacherControler";



const router = express.Router();


router.get("/", liste_Teacher);

router.get("/:id",recherche_Teacher);

router.post('/',add_Teacher);

router.post('/:id',add_Teacher_id)

router.put('/:id',update_Teacher)


router.delete('/:id',delete_Teacher)


export default router;