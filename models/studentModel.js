class Students {
    constructor(id, matricule, nom, prenom, age, classe, users_id = null) {
        this.id = id;
        this.matricule = matricule;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.classe = classe;
        this.users_id = users_id;
    }
}

export default Students;