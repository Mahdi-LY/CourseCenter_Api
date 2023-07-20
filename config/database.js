const { createPool } = require('mysql')

const pool = createPool(
{
  host: process.env.DB_HOST || 'localhost',
  port: process.env.MYSQL_PORT,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Al mahdiMySql',
  database: 'course_center',
  // connectionLimit: 10
})

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: 'auto_cars'
// });

module.exports = {
  connect: async () => {
    try {
      await pool.getConnection();
      console.log('Connected to database');
    } catch (err) {
      console.error('Error (database) connecting to database:', err);
      throw err;
    }
  }
};

module.exports = pool
