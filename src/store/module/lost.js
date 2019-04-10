import Storage from '@/storage'

export default {
  state: {
    lostDetail: {},
  },
  mutations: {
    setLostDetail(state, lostDetail) {
      state.lostDetail = lostDetail
    },
  }
}
