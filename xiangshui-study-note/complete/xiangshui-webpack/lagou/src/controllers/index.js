import indexTpl from '../views/index.art'
import { auth as authModel } from "../models/auth"
import pageHeader from '../components/pageheader'
import page from '../databus/page'
const index = (router) => {

    return async(req, res, next) => {

        let result = await authModel()

        if (result.ret) {
            //请求isAUTH 成功后渲染html 
            const html = indexTpl({
                    subRouter: res.subRoute()
                })

                //res.subRoute  = subRoute(){return this._subRouteView}
                //this._subRouteView  =  <div id= "__sub-route-view"></div>
                // 渲染首页

                // console.log("-------------------------------------")
                // console.log(res.subRoute)
                // console.log( res.subRoute())
                // console.log(html)
                // console.log("-------------------------------------")

            next(html)

            $(window, ".wrapper").resize()
            const $lis = $('#sidebar-menu li:not(:first-child)')
            $lis.on("click", function() {
                const url = $(this).attr("to")
                router.go(url)
            })
            console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO  ")
            pageHeader()
            let hash = location.hash.slice(1)
            $lis.filter(`[to="${hash}"]`).addClass('active').siblings().removeClass('active')

            // 是否重置page
            if (hash !== page.curRoute) {
                page.reset()
            }

            // 当前url保存
            page.setCurRoute(hash)

            //登出事件绑定
            $('#users-signout').on('click', (e) => {
                    e.preventDefault();
                    localStorage.setItem('lg-token', '')
                    location.reload()
                        // $.ajax({
                        //     url: '/api/users/signout',
                        //     dataType: 'json',
                        //     success(result) {

                    //         if (result.ret) {
                    //             location.reload()
                    //         }

                    //     }
                    // })
                })
                // socket
            var socket = io.connect('http://localhost:3000')

            socket.on('message', function(msg) {
                console.log(8888888888888)
                let num = ~~$('#icon-email').text()
                $('#icon-email').text(++num)
            })
        } else {
            router.go('/signin')
        }

    }
}
export default index