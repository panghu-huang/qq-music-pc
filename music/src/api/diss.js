import jsonp from '../common/js/jsonp'
import axios from 'axios'
import {commonParams, jsonpConfig} from './config'

export function getDissCategory() {
  return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg',
    commonParams, jsonpConfig)
}


export function getSongList1(categoryId = 10000000, sortId = 5) {
  return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
    Object.assign({}, commonParams, {
      rnd: Math.random(),
      categoryId,
      sortId,
      sin: 0,
      ein: 29
    }), jsonpConfig)
}

export function getSongList(categoryId = 10000000, sortId = 5, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get('/api/getDissSongList', {
      params: Object.assign({}, commonParams, {
        rnd: Math.random(),
        categoryId,
        sortId,
        sin: (page - 1) * 30,
        ein: page * 30 - 1
      })
    })
      .then(result => {
        resolve(JSON.parse(result.data.split('(')[1].split(')')[0]));
      })
      .catch(error => {
        reject(error);
      })
  })
}
