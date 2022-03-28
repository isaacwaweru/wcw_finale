const Participant = require('../models').Participant





module.exports = {

    // add participant
    addParticipant: (req, res) => {
        let { firstName, lastName,country,sector,email,whatsapp} = req.body
        Participant.create({
            firstName,
            lastName,
            country,
            sector,
            email,
            whatsapp
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




    // get all participants

    getAllParticipants: ( req, res ) => {

        Participant.findAll( {
            attributes: ['id', 'firstName', 'lastName', 'email','password'],
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

    getSingleParticipant:(req, res) => {
        let id = req.params.id

        Participant.findByPk(id)
            .then((user) => {
                return res.status(200).json({user})
            }).catch(err => {
            return res.status(400).json({err})
        })
    },

    updateParticipant: (req, res) => {
        let { firstName, lastName, email} = req.body
        let id = req.params.id

        Participant.findOne({
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




}
