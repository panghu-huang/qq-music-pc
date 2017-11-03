import mutationTypes from './mutation-types'

const mutations = {
  [mutationTypes.SET_SINGER_ID](state, singerId) {
    state.singerId = singerId;
  },
  [mutationTypes.SET_SONG_ID](state, songId) {
    state.songId = songId;
  },
  [mutationTypes.SET_ALBUM_MID](state, albumMid) {
    state.albumMid = albumMid;
  },
  [mutationTypes.SET_KEYWORD](state, keyword) {
    state.keyword = keyword;
  },
  [mutationTypes.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};

export default mutations;
