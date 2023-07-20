const { create, getUserByUserEmail, getUserByUserId, getUsers, updateUser, deleteUser } = require('./user.service')
const { hashSync, genSaltSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
require('dotenv').config(); // Ensure this line is at the beginning of your app.js or index.js

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    // Assuming "create" is a function to save user to your database
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection error'
        });
      }

      // Assign your secret key to a constant
      const secretKey = process.env.JWT_SECRET;

      // Generate JSON token
      const jsontoken = sign({ result: results }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return res.status(200).json({
        success: 1,
        message: 'User created successfully',
        token: jsontoken
      });
    });
  },

  login: (req, res) =>
  {
    const body = req.body
  
    getUserByUserEmail(body.email, (err, results) =>
    {
      if(err)
      {
        console.log(err)
      }

      if(!results)
      {
        return res.status(500).json({
                                      success: 0,
                                      data: 'Invalid email or password'
                                    })
      }

      const result = compareSync(body.password, results.password)

      if(result)
      {
        results.password = undefined
        const jsontoken = sign({ result: results }, process.env.JWT_SECRET, { expiresIn: '1d' })
        
        return res.status(200).json({
                                      success: 1,
                                      message: 'login successfully',
                                      token: jsontoken
                                    })
      }
      else
      {
        return res.status(500).json({
                                      success: 0,
                                      data: 'Invalid email or password'
                                    })
      }
    })
  },

  getUserByUserId: (req, res) =>
  {
    const id = req.params.id

    getUserByUserId(id, (err, results) =>
    {
      if(err)
      {
        console.log(err)
      
        return
      }
      
      if(!results)
      {
        return res.json({
                          success: 0,
                          message: 'Record not Found'
                        })
      }
      
      return res.json({
                        success: 1,
                        data: results
                      })
    })
  },

  getUsers: (req, res) =>
  {
    getUsers((err, results) =>
    {
      if(err)
      {
        console.log(err)
      
        return
      }
      
      return res.json({
                        success: 1,
                        data: results
                      })
    })
  },

  updateUsers: (req, res) =>
  {
    const body = req.body
    const salt = genSaltSync(10)
    body.password = hashSync(body.password, salt)
  
    updateUser(body, (err, results) =>
    {
      if(err)
      {
        console.log(err)
      
        return
      }
      
      console.log(results)

      return res.json({
                        success: 1,
                        message: 'updated successfully'
                      })
    })
  },

  deleteUser: (req, res) =>
  {
    const data = req.body
  
    deleteUser(data, (err, results) =>
    {
      if(err)
      {
        console.log(err)
      
        return
      }
      
      if(!results)
      {
        return res.json({
                          success: 0,
                          message: 'Record Not Found'
                        })
      }

      return res.json({
                        success: 1,
                        message: 'user deleted successfully'
                      })
    })
  }
}