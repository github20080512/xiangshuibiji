const userModel = require('../models/users')
const { hash, compare, sign, verify } = require('../utils/tools')

// async function addUsers() {
//     const bcryptPassword = await hash('135136')
//         //userModel.signup is async
//     let result1 = await userModel.signup({
//         username: 'xiaoyu',
//         password: bcryptPassword
//     })
//     console.log(result1)
// }
// addUsers()


const signup = async(req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const { username, password } = req.body

    let findResult = await userModel.findUser(username)
    if (findResult) {
        res.render('fail', {
            data: JSON.stringify({
                message: "用户名已存在"
            })
        })
    } else {

   
        const bcryptPassword = await hash(password)
            //userModel.signup is async

        //     function test() {
        //         return new Promise((resolve,reject)=>{
        //             setTimeout(()=>{
        //                 resolve(565)
        //             },3000)
        //         })
        //     }
        //   1.  test().then((result)=>{console.log(result)})
        //   2.  var b=await test()




        let result = await userModel.signup({
            username,
            password: bcryptPassword
        })
        console.log(result)
        console.log("//////////////")
        res.render('succ', {
            data: JSON.stringify({
                message: "注册成功"
            })
        })
    }
}


//用户登录
const signin = async(req, res, next) => {
    const { username, password } = req.body
    console.log("username:"+username)
    console.log("password:"+password)

    let result = await userModel.findUser(username)
    console.log("9999999999999999999999")
    console.log(result)
    if (result) {
        let { password: hash } = result
        let compareResult = await compare(password, hash)
        console.log("compareResult-------------")
        console.log(compareResult)
        if (compareResult) {
            const token = sign(username)
            res.set('X-Access-Token', token)
            res.render('succ', {
                data: JSON.stringify({
                    username
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名或密码错误'
                })
            })
        }
    } else {
        res.render('succ', {
            data: JSON.stringify({
                message: '用户名或密码错误'
            })
        })
    }
}

const signout = (req, res, next) => {
  
    console.log(req)
    console.log("**********************")
    console.log(req.session)
    req.session = null
    res.render('succ', {
        data: JSON.stringify({
            message: '登出成功'
        })
    })
}

const isAuth = async(req, res, next) => {
    //  if (req.session.username) 
    //  if (req.session.username) {
    //     res.render('succ', {
    //         data: JSON.stringify({
    //             username: req.session.username
    //         })
    //     })
    // } else {
    //     res.render('fail', {
    //         data: JSON.stringify({
    //             message: '请登录'
    //         })
    //     })
    // }
    let token = req.get('X-Access-Token')
    try {
        let result = verify(token)
        res.render('succ', {
            data: JSON.stringify({
                username: result.username
            })
        })
    } catch (e) {
        // console.log(e)
        //e=> JsonWebTokenError: invalid token
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录'
            })
        })
    }



}

const list = async(req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')
    const listResult = await userModel.findList()
    res.render('succ', {
        data: JSON.stringify(listResult)
    })
    // console.log(listResult)
}

//remove users
const remove = async(req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const { id } = req.body
    let result = await userModel.remove(id)
    if (result) {
        return res.render('succ', {
            data: JSON.stringify({
                message: '用户删除成功'
            })
        })
    }
    res.render('fail', {
        data: JSON.stringify({
            message: '用户删除失败'
        })
    })
}
exports.signup = signup
exports.signin = signin
exports.signout = signout
exports.isAuth = isAuth
exports.list = list
exports.remove = remove