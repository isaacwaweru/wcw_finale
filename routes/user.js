const express = require('express')
const auth = require("../middleware/auth.js");
const router = express.Router()
const {
    signUp,
    signIn,
    updateSignUp ,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    deleteAllUsers,

} = require('../controllers/user')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/user',
    signUp
)
router.post('/login',
    signIn
)
router.put('/user/:id',
    auth,
    updateSignUp
)

router.get('/user/',
    auth,
    getAllUsers
)

router.get('/user/:id',
    auth,
    getSingleUser
)

router.delete('/user/:id',
    auth,
    deleteSingleUser
)

router.delete('/user/',
    auth,
    deleteAllUsers
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router
