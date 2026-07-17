import db from "../db/data.js";
import Students from "../models/StudentsModel.js";




// Identifier le meilleur étudiant
function identifierMeilleurEtudiant() {
    const students = db.prepare(`SELECT * FROM students`).all();

    if (students.length === 0) {
        console.error('Aucun étudiant trouvé.');
        return null;
    }

    let meilleurEtudiant = null;

    
    let meilleureMoyenne = -1;
    for (const student of students) {
        const notes = db.prepare(`SELECT note FROM grades WHERE student_id = ?`)
            .all(student.id);

        if (notes.length === 0) continue;

        const somme = notes.reduce((acc, row) => acc + row.note, 0);
        const moyenne = somme / notes.length;

        if (moyenne > meilleureMoyenne) {
            meilleureMoyenne = moyenne;
            meilleurEtudiant = { ...student, moyenne };
        }
    }

    if (!meilleurEtudiant) {
        console.error('Aucune note trouvée pour les étudiants.');
        return null;
    }

    return meilleurEtudiant;
}




// Calculer la moyenne générale de tous les étudiants
function moyenneGenerale() {
    const notes = db.prepare(`SELECT note FROM grades`).all();

    if (notes.length === 0) {
        console.error('Aucune note trouvée.');
        return null;
    }

    const somme = notes.reduce((acc, row) => acc + row.note, 0);
    return somme / notes.length;
}




// Calculer la moyenne d'un étudiant 
function moyenneEtudiant(student_id) {
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

    const notes = db.prepare(`SELECT note FROM grades WHERE student_id = ?`)
        .all(student_id);
    if (notes.length === 0) {
        console.error('Aucune note trouvée pour cet étudiant.');
        return null;
    }

    const somme = notes.reduce((acc, row) => acc + row.note, 0);
    return somme / notes.length;
}




// Compter les absences d'un étudiant
function compterAbsences(student_id) {
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


    const total = db.prepare(`SELECT COUNT(*) as total FROM absences WHERE student_id = ?`)
        .get(student_id);


    const justifiees = db.prepare(`SELECT COUNT(*) as total FROM absences WHERE student_id = ? AND status = 1`)
        .get(student_id);


    const nonJustifiees = db.prepare(`SELECT COUNT(*) as total FROM absences WHERE student_id = ? AND status = 0`)
        .get(student_id);

    return {
        total: total.total,
        justifiees: justifiees.total,
        nonJustifiees: nonJustifiees.total
    };
}




// Statistiques complètes d'un étudiant
function statistiquesEtudiant(student_id) {
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

    const moyenne = moyenneEtudiant(student_id);
    const absences = compterAbsences(student_id);

    return {
        etudiant: student,
        moyenne: moyenne ?? 'Aucune note',
        absences
    };
}



// Moyenne par matiere d'un etudiant
function moyennesParMatiere(student_id) {
    if (!student_id) {
        console.error('L\'identifiant de l\'étudiant est obligatoire.');
        return [];
    }

    return db.prepare(`
        SELECT subjects.nom AS matiere, AVG(grades.note) AS moyenne
        FROM grades
        JOIN subjects ON grades.subject_id = subjects.id
        WHERE grades.student_id = ?
        GROUP BY subjects.id
    `).all(student_id);
}

export { identifierMeilleurEtudiant, moyenneGenerale, moyenneEtudiant, compterAbsences, statistiquesEtudiant, moyennesParMatiere };
