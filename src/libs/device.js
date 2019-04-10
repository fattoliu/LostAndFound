/* eslint-disable */
export const isIOS = () => {
  return UA && /iphone|ipad|ipod|ios/.test(UA)
}
export const isAndroid = () => {
  return UA && UA.indexOf('android') > 0
}
export const showStatusBar = () => {
  StatusBar.show()
}
export const hideStatusBar = () => {
  StatusBar.hide()
}
