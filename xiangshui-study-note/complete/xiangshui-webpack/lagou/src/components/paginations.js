import userListPageTpl from '../views/users-pages.art'
import page from '../databus/page'

const _setPageActive = (index) => {
    $('#users-page #users-page-list li:not(:first-child,:last-child)').
    eq(index - 1).
    addClass("active").siblings().removeClass("active")
}



const pagination = (data, pagesize) => {

    const total = data.length
    const pageCount = Math.ceil(total / pagesize)
    const pageArray = new Array(pageCount)
    const htmlPage = userListPageTpl({
        pageArray
    })

    $("#users-page").html(htmlPage)

    _setPageActive(page.curPage)
    _bindEvent(data, pagesize)
}


const _bindEvent = (data, pagesize) => {

    //翻页  off('click').on('click' 先解绑事件
    $("#users-page").off('click').on('click', '#users-page-list li:not(:first-child,:last-child)', function() {
            let index = $(this).index()



            page.setCurPage(index)
            $("body").trigger("changeCurpage", index)
            _setPageActive(index)
        })
        //前一页
    $("#users-page").on('click', '#users-page-list li:first-child', function() {

            if (page.curPage > 1) {
                page.setCurPage(page.curPage - 1)
                $("body").trigger("changeCurpage", page.curPage)

                _setPageActive(page.curPage)
            }
        })
        //后一页
    $("#users-page").on('click', '#users-page-list li:last-child', function() {

        if (page.curPage < Math.ceil(data.length / pagesize)) {
            page.setCurPage(page.curPage + 1)
            $("body").trigger("changeCurpage", page.curPage)
            _setPageActive(page.curPage)
        }

    })

}
export default pagination