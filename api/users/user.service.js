const pool = require('../../config/database')

module.exports =
{
  create: (data, callBack) =>
  {
    pool.query(`insert into registration(firstName, lastName, gender, email, password, phone) values(?,?,?,?,?,?)`,
               [ data.firstName, data.lastName, data.gender, data.email, data.password, data.phone],
               (error, results, fields) =>
               {
                 if(error)
                 {
                   callBack(error)
                 }

                 return callBack(null, results)
               })
  },

  getUserByUserEmail: (email, callBack) =>
  {
    pool.query(`select * from registration where email = ?`,
               [email],
               (error, results, fields) =>
               {
                 if(error)
                 {
                   callBack(error)
                 }
                
                 return callBack(null, results[0])
               })
  },

  getUserByUserId: (id, callBack) =>
  {
    pool.query(`select id,firstName,lastName,gender,email,phone from registration where id = ?`,
               [id],
               (error, results, fields) =>
               {
                 if(error)
                 {
                   callBack(error)
                 }
                 
                 return callBack(null, results[0])
               })
  },

  getUsers: callBack =>
  {
    pool.query(`select id,firstName,lastName,gender,email,phone from registration`,
               [],
               (error, results, fields) =>
               {
                 if(error)
                 {
                   callBack(error)
                 }
                 
                 return callBack(null, results)
               })
  },

  updateUser: (data, callBack) =>
  {
    pool.query(`update registration set firstName=?, lastName=?, gender=?, email=?, password=?, phone=? where id = ?`,
               [data.firstName, data.lastName, data.gender, data.email, data.password, data.phone, data.id],
               (error, results, fields) =>
               {
                 if(error)
                 {
                   callBack(error)
                 }
                 
                 return callBack(null, results[0])
               })
  },

  deleteUser: (data, callBack) =>
  {
    pool.query(`delete from registration where id = ?`,
               [data.id],
               (error, results, fields) =>
               {
                  if(error)
                  {
                    callBack(error)
                  }
                  
                  return callBack(null, results)
               })
  }
}