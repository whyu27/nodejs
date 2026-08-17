const fs = require('fs').promises;

const path = require('path');

const LOG_FILE = path.join(__dirname, 'logs', 'app.log');

async function pastikanFolderLogs(){
    try{
        await fs.access(path.dirname(LOG_FILE));
    } catch{
        await fs.mkdir(path.dirname(LOG_FILE), {recursive: true});
    }
}

async function log(level, message){
    await pastikanFolderLogs();

    const timestamp = new Date();

    const logEntry = `[${timestamp}] ${level.toUpperCase()} - ${message} \n`;

    try{
        await fs.appendFile(LOG_FILE, logEntry, 'utf-8');
    } catch(err){
        console.error('Gagal membuat log', err.message);
    }
}

const logger = {
    info: (msg) => log('info', msg),
    warn: (msg) => log('warn', msg),
    error: (msg) => log('error', msg),
}

module.exports = logger;