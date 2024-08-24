const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0NRZjkzbWNickpUd0pESGpybS9GbVQvaVR6Rm1xcHVqTTMzckFpcC8zQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUVWZmNoNHJISHRTMFNTeVFxVFlHbXRyT1RSanRncFZwVU9LdGtBUGNETT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTUd4L1FUUktMbVlyNklQTGE4dlFnSkZPTVdCZHpzOXVaZmZnYjEzaWtzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsNEUyU2JodkdJWnFuVkVTNFRLRk42QTNDbjduV2gvaGk1MmFVenROc2xjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktJZHJLM3pLQzd0am1uc3pMalBBa2t0bUFnZlBqS2ZpL0JpQzhFcnV6bnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVHdFBRL2QwdlkrZ1JadnJseDZmeHBqSmdkU1RjMjBqZ012TUQ4cnVYMmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUFnaWdNSndBa3h2RU9WeEZqQThrTVZMb2tmNVhQd2VTeVJURXIxL1cxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEh2Q3VFcUlIYVNucGxXbDRPeW54L1cyMWgwemdTb2ozYkZ0S0F1dlp6VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdFeTN5S2haRmY2a3JYeHREUlcvaDhvbGF3c2xFMHlRS0tOblhiaFZKN0IvaER3Mk9WYzJtd2s3c2ZqWlhIZzNObWloYkVEYUdrei9FNjhqOFN1K0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYyLCJhZHZTZWNyZXRLZXkiOiJRZUcxMC9tNTlNNkF6dGpON09XTVM2RkNWVnpldVM0bXE4Y0ZUbTVvWUFjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU3NDhCQUU3NjRBMUE2N0RBMUE1QUZBMkQ0RTAxRTVEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQ0Njg2ODR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU3RkIxNUY0MkJDMDcyQzIzNTRGMURGMUNCODNGNENCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQ0Njg2ODV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImEzUUVieFk3VG5TVm1XRE1ydFRoQXciLCJwaG9uZUlkIjoiNDU2YTIxYjAtODdlYy00ZDVhLWI4MWYtYWIxYTIyMWQ3NWJlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9oUDlXYmFFaTZ2NDk3NCtiQ1FzOFp6UEZWYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlaExpYUVzVnpLVVJyTmJXQ0RGcitybWZiRGs9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQVJZRUU1RFgiLCJtZSI6eyJpZCI6IjUxOTc4MTk0OTMzOjkwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkJLwnZCY8J2QkvCdlYrwnZWg8J2VnfCdlabwnZWl8J2VmvCdlaDwnZWf8J2VpCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTJRbHZVR0VMK2JwYllHR0EwZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiejRuUVJmTEZiSFpRanNWU0FhVG5FejJ6RDFuWis4OStEY3dPTzVwTzVSZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSGJ3SE95b3BZa2Q0QU1qeWF4YXBmYTBEU0MwRVY4RUM5YWc3VkcwS0ZyZHdZWCtFcjVlQUhKMmF5TWE3YVp1c0x0Z2laSUFtdHBhSXlMeTlrWXQrQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IlFWN2VHb2Zmc0N0NHl6ZE9Zb05tV3RyYWJWaFozRHFVNXNJUXU2aUFka3VUcExGOCtBOXNwSC9hdU9CeVltdHM4RFhVcDByNHNzVXNvdDVZVGhHbkFRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTE5NzgxOTQ5MzM6OTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYytKMEVYeXhXeDJVSTdGVWdHazV4TTlzdzlaMmZ2UGZnM01EanVhVHVVWSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDQ2ODY4MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBUWUifQ==',
    PREFIXE: process.env.PREFIX || "-",
    OWNER_NAME: process.env.OWNER_NAME || "𝚂𝚈𝚂𝚂𝙾𝙻𝚄𝚃𝙸𝙾𝙽𝚂 || 𝟸𝟶𝟸𝟺",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "51978194933",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || ' 𝚂𝚈𝚂𝚂𝙾𝙻𝚄𝚃𝙸𝙾𝙽𝚂 || 𝟸𝟶𝟸𝟺 ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcaaa16f7b556d84093f7.jpg,https://telegra.ph/file/de85851cc494331f47b3f.jpg,https://telegra.ph/file/f0f8ef25b35b76be901a7.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
