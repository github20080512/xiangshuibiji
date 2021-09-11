import signinTpl from '../views/signin.art'
import { signin as signinModel } from '../models/signin'
const htmlSignin = signinTpl({})

const signin = (router) => {
    return (req, res, next) => {
        res.render(htmlSignin)
        $("#signin").on("click", _handleSubmit(router))
    }
}

const _handleSubmit = (router) => {
    return async(e) => {
        e.preventDefault()
        const data = $("#signin-form").serialize()
        let result = await signinModel(data)
        console.log(result)
        const token = result.jqXHR.getResponseHeader('X-Access-Token')
        localStorage.setItem('lg-token', token)
        if (result.res.ret) {
            router.go("/index/users")
        }

    }
}
export default signin