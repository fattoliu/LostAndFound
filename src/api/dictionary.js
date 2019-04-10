import request from '@/request'

export const getDictionary = ( {
    key,
} ) => {
    return request( {
        url: '/sysDd/' + key + '.action',
        method: 'post'
    } )
}
