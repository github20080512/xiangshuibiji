import http from '../utils/http'
export const usersList = async() => {
    try {
        let { result } = await http({
            url: "/api/users",
        })

        return result
    } catch (e) {
        console.log(e)
    }

}






// export const usersList = () => {
//     return $.ajax({
//         url: '/api/users',
//         //let ajax to be Synchronization
//         // async: false,
//         headers: {
//             'X-Access-Token': localStorage.getItem('lg-token') || ''
//         },
//         success(result) {
//             return result
//         }
//     })
// }