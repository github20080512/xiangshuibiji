import http from '../utils/http'
export const signin = async(data) => {
    try {
        let { result: res, jqXHR } = await http({
            url: "/api/users/signin",
            data,
            type: "post"
        })

        return {
            res,
            jqXHR
        }
    } catch (e) {
        console.log(e)
    }

}






// export const signin = (data) => {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: '/api/users/signin',
//             type: 'post',
//             data,
//             dataType: 'json',
//             success(res, textStatus, jqXHR) {
//                 resolve({
//                     res,
//                     jqXHR
//                 })
//             }
//         })
//     })
// }