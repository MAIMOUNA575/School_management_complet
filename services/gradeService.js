import Grades from "../models/GradesModel.js";
import db from "../db/data.js";




// ajouter une note (entre 0 et 20)
function addGrades(student_id, subject_id, note) {
    if (note < 0 || note > 20) { 
        console.error('La note doit être comprise entre 0 et 20.');
        return false;
    }

    db.prepare(`INSERT INTO grades (student_id, subject_id, note) VALUES (?, ?, ?)`)
        .run(student_id, subject_id, note);
    return true;
}




// modifier une note
function updateGrades(student_id, subject_id, note) {
    if (note < 0 || note > 20) {  
        console.error('La note doit être comprise entre 0 et 20.');
        return false;
    }

    db.prepare(`UPDATE grades SET note = ? WHERE student_id = ? AND subject_id = ?`)
        .run(note, student_id, subject_id);
    return true;
}




// supprimer une note
function deleteGrades(id) {
    db.prepare(`DELETE FROM grades WHERE id = ?`)
        .run(id);
}




// calculer la moyenne d'un étudiant
function calculeGrade(student_id) {
    const rows = db.prepare(`SELECT note FROM grades WHERE student_id = ?`)
        .all(student_id);

    if (rows.length === 0) return 0;

    const sum = rows.reduce((acc, row) => acc + row.note, 0);
    return sum / rows.length;
}




// lister les notes des etudiants
function listerNotesEtudiant(student_id) {
    if (!student_id) {
        console.error('L\'identifiant de l\'étudiant est obligatoire.');
        return [];
    }

    return db.prepare(`SELECT grades.id, subjects.nom AS matiere, grades.note FROM grades JOIN subjects ON grades.subject_id = subjects.id WHERE grades.student_id = ? `)
    .all(student_id);
}

export { addGrades, updateGrades, deleteGrades, calculeGrade, listerNotesEtudiant };
