const express = require('express')
const router = express.Router()
const {
    addContacts,
    getAllContacts,
    getSingleContact

} = require('../controllers/contact')

// -------------------------CUSTOM ROUTE for PARTICPANTS-------------------------
router.post('/contact',
    addContacts
)

router.get('/contact',
    getAllContacts
)

router.get('/contact/:id',
    getSingleContact
)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router
