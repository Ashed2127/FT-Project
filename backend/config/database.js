import mysql from "mysql2";

const dbConfig = {
    host: "mysql",
    user: "root",
    password: "rootpassword",
    database: "db_restaurant",
    connectTimeout: 10000
};

const db = mysql.createConnection(dbConfig);

const connectWithRetry = (retries = 12) => {
    db.connect((err) => {
        if (err) {
            if (retries > 0) {
                console.error(`❌ DB connection failed. Retrying in 8s... (${retries} left)`);
                setTimeout(() => connectWithRetry(retries - 1), 8000);
            } else {
                console.error("❌ Could not connect to database after many attempts.");
                throw err;
            }
        } else {
            console.log("✅ Successfully connected to the database.");
        }
    });
};

connectWithRetry();

export default db;