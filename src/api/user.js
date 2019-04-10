import request from '@/request'

export const login = ( {
    loginName,
    password
} ) => {
    const data = {
        'loginname': loginName,
        'passwd': password
    }
    return request( {
        url: '/mobile_swzl/login.action',
        data,
        method: 'post'
    } )
}

export const logout = () => {
    return request( {
        url: '/logout',
        method: 'post'
    } )
}
