const Contact = require('../models').Contact





module.exports = {

    // add contacts
    addContacts: (req, res) => {

        let { firstName, lastName,country,email,message} = req.body
        Contact.create({
            firstName,
            lastName,
            country,
            email,
            message
        }).then((user) => {
            return res.status(201).json({
                "message": "User created successfully",
                user
            }).catch(err => {
                console.log("err is",err)
                return res.status(400).json({message:err})
            })
        }).catch(e=>{
            // console.log("error is");
            return res.status(400).json({'message':''+e.errors[0].message})
        })
    },




    // get all contacts

    getAllContacts: ( req, res ) => {

        Contact.findAll( {
            attributes: ['id', 'firstName', 'lastName', 'email','message'],
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

    // get single contact by id

    getSingleContact:(req, res) => {
        let id = req.params.id

        Contact.findByPk(id)
            .then((user) => {
                return res.status(200).json({user})
            }).catch(err => {
            return res.status(400).json({err})
        })
    },





}
