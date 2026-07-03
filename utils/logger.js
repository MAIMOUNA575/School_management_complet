import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fichierLog = path.join(__dirname, '..', 'logger.txt');

/**
 *
 * @param {string} message
 * @param {string} level
 */
export function log(message, level = 'INFO') {
    const maintenant = new Date();
    const dateStr = maintenant.getFullYear() + '-' +
        String(maintenant.getMonth() + 1).padStart(2, '0') + '-' +
        String(maintenant.getDate()).padStart(2, '0');
    
    const heureStr = String(maintenant.getHours()).padStart(2, '0') + ':' +
        String(maintenant.getMinutes()).padStart(2, '0') + ':' +
        String(maintenant.getSeconds()).padStart(2, '0');

    const dateFormatee = `${dateStr} ${heureStr}`;

    const texte = `${dateFormatee} [${level.toUpperCase()}] ${message}\n`;


    fs.appendFileSync(fichierLog, texte);

    if (level.toUpperCase() === 'ERROR') {
        console.error(`🚨 LOG : ${texte.trim()}`);
    } else if (level.toUpperCase() === 'WARNING') {
        console.warn(`⚠️ LOG : ${texte.trim()}`);
    } else {
        console.log(`ℹ️ LOG : ${texte.trim()}`);
    }
}

export { fichierLog };