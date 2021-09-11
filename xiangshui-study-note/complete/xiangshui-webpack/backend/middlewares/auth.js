const { verify } = require('../utils/tools')
const auth = (req, res, next) => {

    // if (req.session.username) {
    //     next()
    // } else {
    //     res.render('fail', {
    //         data: JSON.stringify({
    //             message: '请登录'
    //         })
    //     })
    // }

    let token = req.get('X-Access-Token')
    console.log("------------------------------------------------------req token")

   
    console.log(token)
    try {
        let result = verify(token)
        next()
    } catch (e) {
        console.log(e)
        console.log("3333333333333333")
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录22'
            })
        })
    }

}
exports.auth = auth