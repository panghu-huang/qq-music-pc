import jsonp from '../common/js/jsonp'
import {commonParams, jsonpConfig} from './config'

export function getAlbumList(cmd = 'firstpage',
                             page = 0,
                             sort = 1,
                             language = -1,
                             genre = 0,
                             year = 1,
                             pay = 0,
                             type = -1,
                             company = -1) {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/album_library',
    Object.assign({}, commonParams, {
      cmd: cmd,
      //page从零开始
      page: page,
      pagesize: 20,
      //sort-->1:最新  2:最热
      sort: sort,
      language: language,
      genre: genre,
      year: year,
      pay: pay,
      type: type,
      company: company
    }), jsonpConfig);
}

export function getDigitalAlbum() {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/musicmall.fcg',
    Object.assign({}, commonParams, {
      cmd: 'pc_index_new'
    }), jsonpConfig)
}

export function getAlbumInfo(albumMid) {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
    Object.assign({}, commonParams, {
      albummid: albumMid
    }), jsonpConfig)
}
