import { onDeviceReady } from './cordova_events'

console.log(onDeviceReady)
document.addEventListener('deviceready', onDeviceReady, false)
window.addEventListener('resize', () => {
  if (
    document.activeElement.tagName == 'TEXTAREA' ||
    document.activeElement.tagName == 'INPUT'
  ) {
    window.setTimeout(() => {
      document.activeElement.scrollIntoViewIfNeeded()
    }, 100)
  }
})
// function onDeviceReady() {
//   window.fileTransfer = new CordovaFileTransfer()
//   window.JPush && window.JPush.init()

//   document.addEventListener('backbutton', onBackKeyDown, false)
// }

// function onBackKeyDown(e) {
//   if (store.state.route.name === 'home' || store.state.route.name === 'login') {
//     e.preventDefault()
//     Vue.$vux.toast.text('再点一次退出软件', 'bottom')
//     document.removeEventListener('backbutton', onBackKeyDown, false)
//     document.addEventListener('backbutton', exitApp, false)
//     let intervalID = window.setInterval(() => {
//       window.clearInterval(intervalID)
//       document.removeEventListener('backbutton', exitApp, false) // 注销返回键
//       document.addEventListener('backbutton', onBackKeyDown, false) // 返回键
//     }, 3000)
//   } else {
//     window.history.go(-1)
//   }
// }

// function exitApp() {
//   navigator.app.exitApp()
// }
