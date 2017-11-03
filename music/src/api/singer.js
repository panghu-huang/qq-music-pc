import jsonp from '../common/js/jsonp'
import axios from 'axios'
import {commonParams, jsonpConfig} from './config'

export function getSingerList(page = 1, type = 'all_all_all') {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/v8.fcg', Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: type,
    pagesize: 100,
    pagenum: page
  }), jsonpConfig)
}

export function getSingerDesc(singerMid) {
  return new Promise((resolve, reject) => {
    axios.get('/api/getSingerDesc', {
      params: {
        singermid: singerMid,
        utf8: 1,
        outCharset: 'utf-8',
        format: 'xml',
        r: Math.random()
      }
    })
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error);
      })
  })
}

export function getSimilarSinger(singerMid) {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg',
    Object.assign({}, commonParams, {
      utf8: 1,
      singer_mid: singerMid,
      start: 0,
      num: 5
    }), jsonpConfig)
}

export function getSingerAlbums(singerMid) {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg',
    Object.assign({}, commonParams, {
      singermid: singerMid,
      order: 'time',
      begin: 0,
      num: 5
    }), jsonpConfig)
}

export function getSingerSongs(singerMid, page = 1) {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
    Object.assign({}, commonParams, {
      singermid: singerMid,
      order: 'listen',
      begin: (page - 1) * 30,
      num: 30,
      songstatus: 1
    }), jsonpConfig)
}

export function getSingerMvs(singerMid) {
  return jsonp('https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg',
    Object.assign({}, commonParams, {
      cid: '205360581',
      singermid: singerMid,
      order: 'listen',
      begin: 0,
      num: 5
    }), jsonpConfig)
}
