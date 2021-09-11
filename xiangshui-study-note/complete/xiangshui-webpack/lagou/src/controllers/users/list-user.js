import usersTpl from '../../views/users.art'
import userListTpl from '../../views/users-list.art'


// let html = usersTpl()  //it is a function,it can run

import pagination from '../../components/paginations'
import { addUser } from "./add-user"

import { usersList as usersListModel } from "../../models/users-list"
import { auth as authModel } from "../../models/auth"

import { remove } from '../common'


import page from '../../databus/page'
const pagesize = page.pagesize

let state = {
    list: []
}





const _loadData = async() => {
    let result = await usersListModel()
    state.list = result.data


    pagination(result.data, pagesize)
    _list(page.curPage)

}
const _list = (pageNo) => {
    let start = (pageNo - 1) * pagesize

    $("#users-list").html(userListTpl({
        data: state.list.slice(start, start + pagesize)
    }))


}
const _subscribe = () => {
    $("body").off("changeCurpage").on("changeCurpage", (e, index) => {
        _list(index)

    })
    $("body").on("addUser", (e) => {
        _loadData()
    })
}

const listUser = (router) => {
        return async(req, res, next) => {
            let result = await authModel()
            if (result.ret) {
                // 填充用户列表
                next()
                res.render(usersTpl({}))
             

                $('#add-user-btn').on('click', addUser)
                    // 初次渲染list
                await _loadData()

                // 页面事件绑定
                remove({
                    $box: $('#users-list'),
                    state, // 传递一个引用类型的值state, 在删除组件里能实时获取数据条数
                    url: '/api/users',
                    loadData: _loadData
                })

                // 订阅事件
                _subscribe()
            } else {
                router.go('/signin')
            }
        }
    }
    // const listUser = (router) => {
    //     const loadIndex = async(res, next) => {
    //         next()
    //         res.render(usersTpl())
    //         $("#add-user-btn").on("click", addUser)
    //             //get users list  userListTpl
    //         await _loadData()

//         //订阅模式
//         _subscribe()
//             //加载玩userslist 后，绑定点击事件
//             // 页面事件绑定
//         remove({
//             $box: $('#users-list'),
//             state, // 传递一个引用类型的值state, 在删除组件里能实时获取数据条数
//             url: '/api/users',
//             loadData: _loadData
//         })

//     }
//     return async(req, res, next) => {
//         let result = await authModel()
//         if (result.ret) {
//             loadIndex(res, next)
//         } else {
//             router.go('/signin')
//         }




//     }
// }
export default listUser