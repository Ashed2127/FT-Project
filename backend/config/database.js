import mysql from "mysql2";

const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "rootpassword",
    database: "db_restaurant"
});

const connectWithRetry = (retries = 10) => {
    db.connect((err) => {
        if (err) {
            if (retries > 0) {
                console.error(`❌ DB connection failed. Retrying in 5s... (${retries} left)`);
                setTimeout(() => connectWithRetry(retries - 1), 5000);
            } else {
                console.error("❌ Could not connect to database.");
            }
        } else {
            console.log("✅ Successfully connected to the database.");
        }
    });
};

connectWithRetry();

export default db;
