import Users from "../models/Users.model.js";
import db from "../db/data.js";
import { log } from "../utils/logger.js";



// ajouter un utilisateur
function addUser(name, role, email, password) { 
    if (!name || !role || !email || !password) { 
        const msgErr = "Échec ajout utilisateur : Le nom, le rôle, l'email et le mot de passe sont obligatoires.";
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }

    const rolesValides = ['admin', 'teacher', 'student'];
    if (!rolesValides.includes(role)) {
        const msgErr = `Échec ajout utilisateur : Le rôle '${role}' est invalide.`;
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }

    const existing = db.prepare(`SELECT * FROM users WHERE name = ?`).get(name);
    if (existing) {
        const msgErr = `Échec ajout utilisateur : Un utilisateur avec le nom '${name}' existe déjà.`;
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }


    const existin = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
    if (existin) {
        const msgErr = `Échec ajout utilisateur : Un utilisateur avec ce email '${email}' existe déjà.`;
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }


    try {
        db.prepare(`INSERT INTO users (name, role, email, password) VALUES (?, ?, ?, ?)`)
            .run(name, role, email, password);
        
        // 📝 Log de succès
        log(`Utilisateur ajouté avec succès - Nom: ${name}, Rôle: ${role}`, "INFO");
        return true;
    } catch (error) {
        log(`Erreur base de données lors de l'ajout de l'utilisateur '${name}' : ${error.message}`, "ERROR");
        return false;
    }
}




// modifier un utilisateur
function updateUser(id, name, role) {
    if (!id || !name || !role) {
        const msgErr = "Échec modification : L'identifiant, le nom et le rôle sont obligatoires.";
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }

    const rolesValides = ['admin', 'teacher', 'student'];
    if (!rolesValides.includes(role)) {
        const msgErr = `Échec modification : Le rôle '${role}' est invalide.`;
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }

    const existing = db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!existing) {
        const msgErr = `Échec modification : Aucun utilisateur trouvé avec l'identifiant ${id}.`;
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }

    try {
        db.prepare(`UPDATE users SET name = ?, role = ? WHERE id = ?`)
            .run(name, role, id);
        
        log(`Utilisateur ID ${id} modifié avec succès - Nouveau nom: ${name}, Nouveau rôle: ${role}`, "INFO");
        return true;
        } catch (error) {
            log(`Erreur base de données lors de la modification de l'utilisateur ID ${id} : ${error.message}`, "ERROR");
            return false;
        }
}



// supprimer un utilisateur
function deleteUser(id) {
    if (!id) {
        const msgErr = "Échec suppression : L'identifiant est obligatoire.";
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }

    const existing = db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!existing) {
        const msgErr = `Échec suppression : Aucun utilisateur trouvé avec l'identifiant ${id}.`;
        console.error(msgErr);
        log(msgErr, "WARNING");
        return false;
    }

    try {
        db.prepare(`DELETE FROM users WHERE id = ?`).run(id);
        
        log(`Utilisateur ID ${id} (Nom: ${existing.name}) supprimé avec succès`, "INFO");
        return true;
        } catch (error) {
            log(`Erreur base de données lors de la suppression de l'utilisateur ID ${id} : ${error.message}`, "ERROR");
            return false;
        }
}




// rechercher un utilisateur par son id
function rechercheUser(id) {
    if (!id) {
        console.error('L\'identifiant est obligatoire.');
        return null;
    }

    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!user) {
        console.error('Aucun utilisateur trouvé avec cet identifiant.');
        return null;
    }
    
    log(`Recherche effectuée pour l'utilisateur ID ${id}`, "INFO");
    return user;
}




// lister tous les utilisateurs
function listerUsers() {
    log("Consultation de la liste complète des utilisateurs", "INFO");
    return db.prepare(`SELECT * FROM users`).all();
}




export { addUser, updateUser, deleteUser, rechercheUser, listerUsers };