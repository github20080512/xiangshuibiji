const express = require("express")
const router = express.Router()

const { add, list, remove, listone, update } = require("../controllers/positions")
const uploadMiddleware = require('../middlewares/upload')

router.post('/add', uploadMiddleware, add)
router.get('/list', list)
router.post('/listone', listone)
router.patch('/update', uploadMiddleware, update)
router.delete('/remove', remove)

module.exports = router