class Song {
  constructor(songMid, songName, singer, duration, image, url, albumName, albumMid) {
    this.songMid = songMid;
    this.songName = songName;
    this.singer = singer;
    this.duration = duration;
    this.image = image;
    this.url = url;
    this.albumName = albumName;
    this.albumMid = albumMid;
  }
}

export function createSong(data) {
  return new Song(data.songmid,
    data.songname,
    getSinger(data.singer),
    data.interval,
    `https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`,
    `http://ws.stream.qqmusic.qq.com/${data.songid}.m4a?fromtag=46`,
    data.albumname,
    data.albummid);
}

function getSinger(singer) {
  if (!singer)
    return;
  let singers = [];
  singer.forEach(item => [
    singers.push(item.name)
  ]);
  return singers.join('/');
}
