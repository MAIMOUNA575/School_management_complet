import Students from "../models/StudentsModel.js";
import db from "../db/data.js";




// ajouter un étudiant
function addStudent(matricule, nom, prenom, age, classe, users_id) {
    if (!matricule || !nom || !prenom || !age || !classe || !users_id) {
        console.error('Tous les champs sont obligatoires.');
        return false;
    }

    if (age < 0 || age > 100) {
        console.error("L'âge doit être compris entre 0 et 100.");
        return false;
    }

    const existing = db.prepare(`SELECT * FROM students WHERE matricule = ?`)
        .get(matricule);
    if (existing) {
        console.error('Un étudiant avec ce matricule existe déjà.');
        return false;
    }

    const student = new Students(null, matricule, nom, prenom, age, classe, users_id);

    const result = db.prepare(`INSERT INTO students (matricule, nom, prenom, age, classe, users_id) VALUES (?, ?, ?, ?, ?, ?)`)
        .run(student.matricule, student.nom, student.prenom, student.age, student.classe, student.users_id);
    return result.lastInsertRowid;

}



// modifier un étudiant
function updateStudent(matricule, nom, prenom, age, classe, users_id) {
    if (!matricule || !nom || !prenom || !age || !classe || !users_id) {
        console.error('Tous les champs sont obligatoires.');
        return false;
    }

    if (age < 0 || age > 100) {
        console.error("L'âge doit être compris entre 0 et 100.");
        return false;
    }

    const existing = db.prepare(`SELECT * FROM students WHERE matricule = ?`)
        .get(matricule);
    if (!existing) {
        console.error('Aucun étudiant trouvé avec ce matricule.');
        return false;
    }

    const student = new Students(existing.id, nom, prenom, age, classe, users_id);


    const result = db.prepare(`UPDATE students SET nom = ?, prenom = ?, age = ?, classe = ?, users_id = ? WHERE matricule = ?`)
        .run(student.nom, student.prenom, student.age, student.classe, student.users_id, student.matricule);

    return result.changes > 0;
}


// supprimer un étudiant
function deleteStudent(matricule) {
    if (!matricule) {
        console.error('Le matricule est obligatoire.');
        return false;
    }

    const existing = db.prepare(`SELECT * FROM students WHERE matricule = ?`)
        .get(matricule);
    if (!existing) {
        console.error('Aucun étudiant trouvé avec ce matricule.');
        return false;
    }

    const result = db.prepare(`DELETE FROM students WHERE matricule = ?`)
        .run(matricule);
    return result.changes > 0;
}

// rechercher un étudiant
function rechercheStudent(matricule) {
    if (!matricule) {
        console.error('Le matricule est obligatoire.');
        return null;
    }

    const row = db.prepare(`SELECT * FROM students WHERE matricule = ?`)
        .get(matricule);
    if (!row) {
        console.error('Aucun étudiant trouvé avec ce matricule.');
        return null;
    }

    return new Students(row.id, row.matricule, row.nom, row.prenom, row.age, row.classe, row.users_id);

}



// lister tous les étudiants
function listerStudents() {
    const rows = db.prepare(`SELECT * FROM students`).all();
    return rows.map(row => new Students(row.id, row.matricule, row.nom, row.prenom, row.age, row.classe, row.users_id));

}



// Recherchre un etudiant a partir de l'id de l'utilisateur
function rechercheStudentByUserId(users_id) {
    if (!users_id) {
        console.error('L\'identifiant utilisateur est obligatoire.');
        return null;
    }

    const row = db.prepare(`SELECT * FROM students WHERE users_id = ?`).get(users_id);
    if (!row) {
        console.error('Aucun dossier étudiant trouvé pour cet utilisateur.');
        return null;
    }
    return new Students(row.id, row.matricule, row.nom, row.prenom, row.age, row.classe, row.users_id);
}



export { addStudent, updateStudent, deleteStudent, rechercheStudent, listerStudents, rechercheStudentByUserId };


