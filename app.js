require('dotenv').config()
const express = require('express')
const app = express()
const userRouter = require('./api/users/user.router')
// const db = require('./config/database');

app.use(express.json())

app.use('/api/users', userRouter)

app.listen(process.env.PORT || 3000, () =>
{
  console.log('server up and running')
})

// db.connect()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server started on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Error connecting to database:', err);
//   });






// // Require the express module
// const express = require('express');

// // Create a new express application
// const app = express();

// // Define the port
// const PORT = process.env.PORT || 3000;

// // Define a route to test the connection
// app.get('/test', (req, res) => {
//     res.json({status: 'success', message: 'Connection successful!'});
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
