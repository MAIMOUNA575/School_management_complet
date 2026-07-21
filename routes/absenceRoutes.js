import express from "express";
import { lister_Absence, rechercher_Absence, add_Absence, add_Absence_id, update_Absence, delete_Absence } from "../controler/absenceControler.js";

const router = express.Router();




router.get("/",lister_Absence)

router.get("/:id",rechercher_Absence);

router.post('/',add_Absence);

router.post('/:id',add_Absence_id);

router.put('/:id',update_Absence);

router.delete('/:id',delete_Absence);


export default router;