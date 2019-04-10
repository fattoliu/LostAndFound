import CordovaFileTransfer from './file'
import Vue from 'vue'
import store from '../store'

export const onDeviceReady = function onDeviceReady() {
  window.cordovaFile = new CordovaFileTransfer()
  window.JPush && window.JPush.init()

  document.addEventListener('backbutton', onBackKeyDown, false)
}

export const onBackKeyDown = function onBackKeyDown(e) {
  if (store.state.route.name === 'lostPublish' || store.state.route.name === 'lostList' || store.state.route.name === 'settings' || store.state.route.name === 'login') {
    e.preventDefault()
    Vue.$vux.toast.text('再点一次退出软件', 'bottom')
    document.removeEventListener('backbutton', onBackKeyDown, false)
    document.addEventListener('backbutton', exitApp, false)
    let intervalID = window.setInterval(() => {
      window.clearInterval(intervalID)
      document.removeEventListener('backbutton', exitApp, false) // 注销返回键
      document.addEventListener('backbutton', onBackKeyDown, false) // 返回键
    }, 3000)
  } else {
    window.history.go(-1)
  }
}

function exitApp() {
  navigator.app.exitApp()
}
