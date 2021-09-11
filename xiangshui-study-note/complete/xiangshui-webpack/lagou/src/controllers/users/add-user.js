import page from '../../databus/page'
import usersAddTpl from "../../views/user-add.art"
import { userAdd as userAddModel } from "../../models/user-add"
export const addUser = () => {
    const html = usersAddTpl()
    $("#users-list-box").after(html)


    const _save = async() => {
        //提交表单
        const data = $("#users-form").serialize()
        let result = await userAddModel(data)

        if (result.ret) {
            page.setCurPage(1)
            $("body").trigger("addUser")
        }

        const $btnClose = $("#users-close")
        $btnClose.click()
    }



    //点击保存，提交表单
    $("#users-save").on('click', _save)

}