import http from '../utils/http'
export const userAdd = async(data) => {
    try {
        let { result } = await http({
            url: "/api/users",
            type: "post",
            data
        })

        return result
    } catch (e) {
        console.log(e)
    }

}

// export const userAdd = (data) => {
//     return $.ajax({
//         url: '/api/users',
//         type: 'post',
//         headers: {
//             'X-Access-Token': localStorage.getItem('lg-token') || ''
//         },
//         data,
//         success(res) {
//             console.log(res)
//             return res
//         }
//     })
// }