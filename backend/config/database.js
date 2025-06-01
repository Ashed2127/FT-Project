 import mysql from "mysql2";

// create the connection to database

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "the_system"
});


db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;
 
 
 
/*import axios from 'axios';

const API_URL = 'http://127.0.0.1:8888/query';

const db = {
  query: async (sql, params) => {
    try {
      const response = await axios.post(API_URL, {
        query: sql,
        params: params || []
      });
      return response.data.data;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
};

// Test connection
db.query("SELECT name FROM sqlite_master WHERE type='table'")
  .then(() => console.log("Successfully connected to Python SQLite bridge"))
  .catch(err => console.error("Connection error:", err));

export default db;*/

/*import axios from 'axios';

const API_URL = 'http://127.0.0.1:8888/query'; // Tornado server endpoint

// Create a MySQL-compatible interface
const db = {
  // Main query method that supports both callbacks and promises
  query: function(sql, params, callback) {
    // Handle different parameter formats
    let requestParams;
    if (Array.isArray(params)) {
      requestParams = params;
    } else if (params && typeof params === 'object') {
      requestParams = [params]; // Convert object to array for SET clauses
    } else {
      requestParams = params ? [params] : [];
    }

    // Support both callback and promise styles
    const promise = axios.post(API_URL, {
      query: sql,
      params: requestParams
    })
    .then(response => {
      // Format response to match MySQL driver
      const data = response.data;
      
      // For SELECT queries
      if (sql.trim().toUpperCase().startsWith('SELECT')) {
        // Return first row for single-row queries
        if (data.data && data.data.length === 1 && 
            (sql.includes('WHERE') || sql.includes('LIMIT 1'))) {
          return data.data[0];
        }
        return data.data || [];
      }
      
      // For INSERT/UPDATE/DELETE
      return {
        insertId: data.insertId || data.lastrowid,
        affectedRows: data.affectedRows || 0,
        changedRows: data.changedRows || 0
      };
    })
    .catch(error => {
      const err = error.response?.data?.error || error.message;
      throw err;
    });

    // If callback provided, use callback style
    if (typeof callback === 'function') {
      promise
        .then(result => callback(null, result))
        .catch(err => callback(err, null));
      return;
    }

    // Otherwise return promise
    return promise;
  },

  // Alias for mysql2 compatibility
  execute: function(sql, params, callback) {
    return this.query(sql, params, callback);
  },

  // Connection test (simulated)
  connect: function(callback) {
    this.query("SELECT name FROM sqlite_master WHERE type='table'")
      .then(() => {
        console.log("Successfully connected to SQLite via Tornado bridge");
        if (callback) callback(null);
      })
      .catch(err => {
        if (callback) callback(err);
        else throw err;
      });
  }
};

// Test connection immediately
db.connect(error => {
  if (error) {
    console.error("Connection error:", error);
  } else {
    console.log("✅ Database bridge is ready");
    // Verify all ex pected tables exist
    db.query("SELECT name FROM sqlite_master WHERE type='table'")
      .then(tables => {
        const tableNames = tables.map(t => t.name);
        console.log("Available tables:", tableNames);
        
        // Check for required tables
        const requiredTables = ['user', 'admin', 'food', 'booktable'];
        const missingTables = requiredTables.filter(t => !tableNames.includes(t));
        if (missingTables.length > 0) {
          console.warn("⚠️ Missing tables:", missingTables);
        }
      });
  }
});

export default db;*/

