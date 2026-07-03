import Teachers from "../models/TeachersModel.js";
import db from "../db/data.js";




// ajouter un professeur
function addTeacher(name, matiere, users_id) {
    if (!name || !matiere || !users_id) {
        console.error('Le nom, la matière et l\'identifiant utilisateur sont obligatoires.');
        return false;
    }

    const existing = db.prepare(`SELECT * FROM teachers WHERE name = ?`)
        .get(name);
    if (existing) {
        console.error('Un professeur avec ce nom existe déjà.');
        return false;
    }
    const teacher = new Teachers(name, matiere, users_id);

    const result = db.prepare(`INSERT INTO teachers (name, matiere, users_id) VALUES (?, ?, ?)`)
        .run(name, matiere, users_id);

    return result.lastInsertRowid;
}



// modifier un professeur
function updateTeacher(id, name, matiere, users_id) {
    if (!id || !name || !matiere || !users_id) {
        console.error('L\'identifiant, le nom, la matière et l\'identifiant utilisateur sont obligatoires.');
        return false;
    }

    const existing = db.prepare(`SELECT * FROM teachers WHERE id = ?`)
        .get(id);
    if (!existing) {
        console.error('Aucun professeur trouvé avec cet identifiant.');
        return false;
    }

    const teacher = new Teachers(name, matiere, users_id);

    const result = db.prepare(`UPDATE teachers SET name = ?, matiere = ?, users_id = ? WHERE id = ?`)
        .run(name, matiere, users_id, id);

    return result.changes > 0;
}



// supprimer un professeur
function deleteTeacher(id) {
    if (!id) {
        console.error('L\'identifiant is obligatoire.');
        return false;
    }

    const existing = db.prepare(`SELECT * FROM teachers WHERE id = ?`)
        .get(id);
    if (!existing) {
        console.error('Aucun professeur trouvé avec cet identifiant.');
        return false;
    }

    const result = db.prepare(`DELETE FROM teachers WHERE id = ?`)
        .run(id);

    return result.changes > 0;
}



// rechercher un professeur par id
function rechercheTeacher(id) {
    if (!id) {
        console.error('L\'identifiant est obligatoire.');
        return null;
    }

    const row = db.prepare(`SELECT * FROM teachers WHERE id = ?`)
        .get(id);
    if (!row) {
        console.error('Aucun professeur trouvé avec cet identifiant.');
        return null;
    }

    return new Teachers(row.name, row.matiere, row.users_id);
}




// lister tous les professeurs
function listerTeachers() {
    const rows = db.prepare(`SELECT * FROM teachers`).all();
    return rows.map(row => new Teachers(row.name, row.matiere, row.users_id));
}



export { addTeacher, updateTeacher, deleteTeacher, rechercheTeacher, listerTeachers };