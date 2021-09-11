import positionsTpl from '../../views/positions.art'

import pagination from '../../components/paginations'
import positionListTpl from '../../views/position-list.art'
import { positionList } from '../../models/positions'
import page from '../../databus/page'
import { auth as authModel } from '../../models/auth'
import { addPosition } from './add-position'
import { updatePosition, fillPositionsUpdateTpl } from './update-position'
import { remove } from '../common'

const pagesize = page.pagesize
let state = {
    list: []
}
const _list = (pageNo) => {
    let start = (pageNo - 1) * pagesize


    $("#position-list").html(positionListTpl({
        data: state.list.slice(start, start + pagesize)
    }))

}

const _loadData = async() => {
    let list = await positionList()
    state.list = list
  

    pagination(list, pagesize)

    _list(page.curPage)

}


const _subscribe = () => {

    $("body").off("changeCurpage").on("changeCurpage", (e, index) => {

        _list(index)
    })
    $('body').off('addPosition').on('addPosition', (e) => {
        _loadData()
    })
}

const listPositions = (router) => {
    return async(req, res, next) => {
        let result = await authModel()
        if (result.ret) {
            next()
            res.render(positionsTpl())

            // 初次渲染list
            await _loadData()

            // 订阅事件
            _subscribe()

            remove({
                $box: $('#position-list'),
                state, // 传递一个引用类型的值state, 在删除组件里能实时获取数据条数
                url: '/api/positions/remove',
                loadData: _loadData
            })

            // 添加职位
            addPosition()

            updatePosition()

            $('#position-list')
                .off('click', '.positions-update')
                .on('click', '.positions-update', function() {
                    //编辑职位
                    fillPositionsUpdateTpl($(this).data('id'))
                    console.log("585858")
                })


        } else {
            router.go('/signin')
        }
    }
}

export default listPositions