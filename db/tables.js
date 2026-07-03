import db from "./data.js";

const Matabble1 = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`;
db.exec(Matabble1);
// const execution1 = db.prepare(`INSERT INTO users (name, role, email, password) VALUES (?, ?, ?, ?)`);
// execution1.run('Mouna', 'admin', 'mouna@gmail.com', 'ety13hTI');
// execution1.run('Keline', 'teacher','keline@gmail.com', 'JUTti134');
// execution1.run('Noura', 'student','noura@gmail.com', 'MLA12yge');

const Matable2 = `
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matricule TEXT NOT NULL UNIQUE,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        age INTEGER NOT NULL,
        classe TEXT NOT NULL,
        users_id INTEGER NOT NULL,
        FOREIGN KEY (users_id) REFERENCES users(id)
    )
`;
db.exec(Matable2);
// const execution2 = db.prepare(`INSERT INTO students(matricule, nom, prenom, age, classe)VALUES (?, ?, ?, ?, ?)`);
// execution2.run('15037', 'Campbell', 'docteur', 12, 'TleC');
// execution2.run('49023', 'Coulibaly', 'Mouna', 16, 'TleA');
// execution2.run('76553', 'Regis', 'Salomon', 11, 'Tle D');


const Matabble3 = `
    CREATE TABLE IF NOT EXISTS teachers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        matiere TEXT NOT NULL,
        users_id INTEGER NOT NULL,
        FOREIGN KEY (users_id) REFERENCES users(id)
    )
`;
db.exec(Matabble3);
// const execution3 =db.prepare(`INSERT INTO teachers(name, matiere) VALUES (?, ?)`);
// execution3.run('Regis', 'Maths');
// execution3.run('Nan', 'FR');
// execution3.run('Naza', 'ANG');

const Matabble4 = `
    CREATE TABLE IF NOT EXISTS subjects(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nom TEXT NOT NULL,
        teacher_id INTEGER NOT NULL,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
`;
db.exec(Matabble4);
// const execution4 = db.prepare(`INSERT INTO subjects (nom, teacher_id) VALUES (?, ?)`);
// execution4.run('Mouna', '1');
// execution4.run('Moi', '2');
// execution4.run('Nous', '3');


const Matabble5 = `
    CREATE TABLE IF NOT EXISTS grades(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        note INTEGER NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
`;
db.exec(Matabble5);
// const execution5 = db.prepare(`INSERT INTO grades (student_id, subject_id, note) VALUES (?, ?, ?)`);
// execution5.run(1, 1, 15);
// execution5.run(2, 2, 12);
// execution5.run(3, 3, 13);


const Matabble6 = `
    CREATE TABLE IF NOT EXISTS absences(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
`;
db.exec(Matabble6);
// const execution6 = db.prepare(`INSERT INTO absences (student_id, date, status) VALUES (?, ?, ?)`);
// execution6.run(1, '08/06/2026', 'Absent');
// execution6.run(2, '08/06/2026', 'Present');
// execution6.run(3, '08/06/2026', 'Absent');