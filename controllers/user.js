const User = require('../models').User
const bcrypt = require("bcrypt");
const jwt = require("../util/jwt.js");

module.exports = {

    // create account check
    signUp: (req, res) => {
        let { firstName, lastName, email,password,profileImage,role} = req.body
        bcrypt.hash(password, 10).then((password) => {
            User.create({
                firstName,
                lastName,
                email,
                password,
                profileImage,
                role
            }).then((user) => {
                return res.status(201).json({
                    "message": "User created successfully",
                    user
                }).catch(err => {
                    return res.status(400).json({err})
                })
              });
          });
    },

    // create account check
    signIn: (req, res) => {
        let { email, password } = req.body
        User.findOne({
            where: {email:email}
        }).then( user => {
            if (!user) {
                return res.status(401).json({
                  error: "User not found!",
                });
              }
              bcrypt
      .compare(password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({
            error: "Incorrect details!",
          });
        }
        const token = jwt.sign({ userId: user.id});
        res.status(200).json({
          user: user,
          token: token
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
        });
    },

    updateSignUp: (req, res) => {
        let { firstName, lastName, email} = req.body
        let id = req.params.id

        User.findOne({
            where: {id:id}
        }).then( user => {
            if (user){
                user.update({firstName, lastName, email})
                    .then((updateUser) => {
                        return res.status(202).json({
                            "message": "User updated successfully",
                            updateUser
                        })
                    })
            }else{
                return res.status(206).json({
                    "message": "User not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({
                "error": error
            })
        })
    },


    // get all users

    getAllUsers: ( req, res ) => {
        User.findAll( {
            attributes: ['id', 'firstName', 'lastName', 'email','password','profileImage'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(users => {
            return res.status(200).json({
                users
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    // get single user by id

    getSingleUser:(req, res) => {
        let id = req.params.id

        User.findByPk(id)
            .then((user) => {
                return res.status(200).json({user})
            }).catch(err => {
            return res.status(400).json({err})
        })
    },

// delete user by id

    deleteSingleUser: (req, res) => {
        let id = req.params.id

        User.destroy({
            where: {id: id}
        }).then(() =>{
            return res.status(200).json({
                "message": "User Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })

    },

// delete all users

    deleteAllUsers: (req, res) => {
        User.destroy({
            truncate: true
        }).then(() => {
            return res.status(200).json({
                success: true,
                "message": "All Users deleted"
            })
        }).catch(err => {
            return res.status(400).json({
                err
            })
        })
    },


}
