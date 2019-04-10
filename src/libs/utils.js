import Cookies from 'js-cookie'

export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : ''

export const TOKEN_KEY = 'token'

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}
export const isEmptyObj = obj => {
  return (
    Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.keys(obj).length === 0
  )
}

export const pullUpDefaultConfig = {
  content: '上拉加载更多',
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: '释放后加载',
  upContent: '上拉加载更多',
  loadingContent: '加载中...',
}

