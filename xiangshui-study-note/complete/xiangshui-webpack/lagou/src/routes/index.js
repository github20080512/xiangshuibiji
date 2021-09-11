import GP21Router from 'gp21-router'
//原型 sme-router

const router = new GP21Router('root')


import index from "../controllers/index.js"

import listUser from "../controllers/users/list-user"
import listPosition from "../controllers/positions/list-position"

import signin from "../controllers/signin.js"

import { auth as authModel } from "../models/auth"


//move the codes below  to 'controllers'
//import indexTpl from '../views/index.art'
//const htmlIndex = indexTpl({})
//router.route("/index",(req, res, next) => {
//        res.render(htmlIndex)
//    })

//路由守卫
router.use(async(req) => {
    const url = req.url
    let result = await authModel()
    if (result.ret) {
        router.go(url)
    } else {
        router.go('/signin')
    }
})


router.route("/signin", signin(router))
//(req, res, next) => {
//     res.render(htmlSignin)
//     $("#signin").on("click", _handleSubmit(router))
// }

router.route("/index", index(router))
router.route("/index/users", listUser(router))
router.route("/index/positions", listPosition(router))

router.route('*', (req, res, next) => {
    res.redirect('/index/users')
})
export default router