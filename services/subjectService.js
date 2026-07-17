import db from "../db/data.js";




// ajouter un sujet
function addSubject(nom, teacher_id) {
    if (!nom || !teacher_id) {
        console.error("Le nom et l'id professeur sont obligatoires.");
        return false;
    }

    const existing = db.prepare(`SELECT * FROM subjects WHERE nom = ?`)
        .get(nom);
    if (existing) {
        console.error('Une matière avec ce nom existe déjà.');
        return false;
    }

    const teacher = db.prepare(`SELECT * FROM teachers WHERE id = ?`)
        .get(teacher_id);
    if (!teacher) {
        console.error('Aucun professeur trouvé avec cet identifiant.');
        return false;
    }

    db.prepare(`INSERT INTO subjects (nom, teacher_id) VALUES (?, ?)`)
        .run(nom, teacher_id);
    return true;
}




// lister tous les sujets
function listerSubjects() {
    return db.prepare(`SELECT * FROM subjects`).all();
}





// rechercher un sujet par id
function rechercheSubject(id) {
    if (!id) {
        console.error('L\'identifiant est obligatoire.');
        return null;
    }

    const subject = db.prepare(`SELECT * FROM subjects WHERE id = ?`)
        .get(id);
    if (!subject) {
        console.error('Aucune matière trouvée avec cet identifiant.');
        return null;
    }
    return subject;
}



// modifier un sujet
function updateSubject(id, nom) {
    if (!id || !nom) {
        console.error('L\'identifiant et le nom sont obligatoires.');
        return false;
    }

    const existing = db.prepare(`SELECT * FROM subjects WHERE id = ?`)
        .get(id);
    if (!existing) {
        console.error('Aucune matière trouvée avec cet identifiant.');
        return false;
    }

    db.prepare(`UPDATE subjects SET nom = ? WHERE id = ?`)
        .run(nom, id);
    return true;
}




// supprimer un sujet
function deleteSubject(id) {
    if (!id) {
        console.error('L\'identifiant est obligatoire.');
        return false;
    }

    const existing = db.prepare(`SELECT * FROM subjects WHERE id = ?`)
        .get(id);
    if (!existing) {
        console.error('Aucune matière trouvée avec cet identifiant.');
        return false;
    }

    db.prepare(`DELETE FROM subjects WHERE id = ?`)
        .run(id);
    return true;
}




// affecter un professeur a une matiere
function affecteSubject(id, teacher_id) {
    if (!id || !teacher_id) {
        console.error('L\'identifiant et le professeur sont obligatoires.');
        return false;
    }

    const subject = db.prepare(`SELECT * FROM subjects WHERE id = ?`)
        .get(id);
    if (!subject) {
        console.error('Aucune matière trouvée avec cet identifiant.');
        return false;
    }

    const teacher = db.prepare(`SELECT * FROM teachers WHERE id = ?`)
        .get(teacher_id);
    if (!teacher) {

        console.error('Aucun professeur trouvé avec cet identifiant.');
        return false;
    }

    db.prepare(`UPDATE subjects SET teacher_id = ? WHERE id = ?`)
        .run(teacher_id, id);
    return true;
}



export { addSubject, listerSubjects, rechercheSubject, updateSubject, deleteSubject, affecteSubject };