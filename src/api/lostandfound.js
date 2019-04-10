import request from '@/request'

export const getLostAndFoundList = (data) => {

  return request({
    url: '/mobile_swzl/prodList.action',
    data,
    method: 'post'
  })
}


export const publish = (data) => {

  return request({
    url: '/mobile_swzl/addProdInfo.action',
    data,
    method: 'post'
  })
}

export const operation = (data) => {

  return request({
    url: '/mobile_swzl/prodInfo.action',
    data,
    method: 'post'
  })
}
