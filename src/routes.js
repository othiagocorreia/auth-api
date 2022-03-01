const express = require('express')
const router = express.Router()

const user = require('./controllers/AdminController')
const role = require('./controllers/RoleController')
const authenticated = require('./middleware/auth')

router.get('/', (req, res)=>{return res.send({status: 'funciona ⚡'})})

router.post('/create-users', user.create)
router.post('/login-users', user.login)
router.post('/delete-users', user.delete)
router.get('/read-all-users', authenticated, user.readAll)

router.post('/create-role', role.create)
router.post('/read-roles', role.read)
router.post('/delete-roles', authenticated, role.delete)

router.post('/assign-new-user', authenticated, user.assignRole)
router.post('/delete-role-user', authenticated, user.deniedRoleUser)

router.post('/create-new-user', authenticated, user.addNewPeople)
module.exports = router