import http from '../utils/http'

export const remove = async({ url, id }) => {
    try {
        let { result } = await http({
            url,
            type: 'delete',
            data: {
                id
            },
        })
        return result
    } catch (err) {
        console.log(err)
    }
}



// export const userRemove = (id) => {
//     return $.ajax({
//         url: '/api/users',

//         type: 'delete',
//         headers: {
//             'X-Access-Token': localStorage.getItem('lg-token') || ''
//         },
//         data: {
//             id
//         },
//         success(res) {
//             return res


//         }
//     })
// }