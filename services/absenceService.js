import db from "../db/data.js";



// Ajouter un etudiant 
function addAbsence(student_id, date, status = 0) {
    const statusNum = Number(status);

    if (!student_id || !date || (statusNum !== 0 && statusNum !== 1)) {
        console.error('L\'étudiant, la date et un statut valide (0 ou 1) sont obligatoires.');
        return false;
    }

    const student = db.prepare(`SELECT * FROM students WHERE id = ?`)
        .get(student_id);
    if (!student) {
        console.error('Aucun étudiant trouvé avec cet identifiant.');
        return false;
    }

    const result = db.prepare(`INSERT INTO absences (student_id, date, status) VALUES (?, ?, ?)`)
        .run(student_id, date, statusNum);

    return result.lastInsertRowid;
}




// Marquer une absence
function marquerAbsence(id, status) {
    const statusNum = Number(status);

    if (!id || status === undefined || (statusNum !== 0 && statusNum !== 1)) {
        console.error('L\'identifiant et un statut valide (0 ou 1) sont obligatoires.');
        return false;
    }

    const existing = db.prepare(`SELECT * FROM absences WHERE id = ?`)
        .get(id);
    if (!existing) {
        console.error('Aucune absence trouvée avec cet identifiant.');
        return false;
    }

    const result = db.prepare(`UPDATE absences SET status = ? WHERE id = ?`)
        .run(statusNum, id);

    return result.changes > 0;
}



// consulter les absences
function consulerAbsences(student_id) {
    if (!student_id) {
        console.error('L\'identifiant de l\'étudiant est obligatoire.');
        return null;
    }

    const student = db.prepare(`SELECT * FROM students WHERE id = ?`)
        .get(student_id);
    if (!student) {
        console.error('Aucun étudiant trouvé avec cet identifiant.');
        return null;
    }

    return db.prepare(`SELECT * FROM absences WHERE student_id = ?`)
        .all(student_id);
}

export { addAbsence, marquerAbsence, consulerAbsences };