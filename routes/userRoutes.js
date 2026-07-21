import express from "express";
import{lister_User, recherche_User, add_User, add_User_id, update_User, delete_User} from '../controler/userControler.js'

const router = express.Router();


router.get("/", lister_User);

router.get("/:id", recherche_User);

router.post("/",add_User);

router.post('/:id',add_User_id)



router.put("/:id", update_User);


router.delete("/:id",delete_User);

export default router;