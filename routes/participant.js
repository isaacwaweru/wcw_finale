const express = require('express')
const router = express.Router()
const {
   addParticipant,
    getAllParticipants,
    updateParticipant

} = require('../controllers/participant')

// -------------------------CUSTOM ROUTE for PARTICPANTS-------------------------
router.post('/participant',
    addParticipant
)

router.get('/participant',
    getAllParticipants
)

router.put('/participant/:id',
    updateParticipant
)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router
