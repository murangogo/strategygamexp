import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connection = {
    host: process.env.DBhost,
    port: process.env.DBport,
    database: process.env.DBdatabase,
    user: process.env.DBuser,
    password: process.env.DBpassword,
    ssl: { rejectUnauthorized: false }
};

const db = pgp(connection);

export default db;
