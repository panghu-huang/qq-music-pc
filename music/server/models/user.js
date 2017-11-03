let mongoose = require('mongoose');

module.exports =  mongoose.model('User', new mongoose.Schema({
  userId: String,
  username: String,
  password: String,
  nickname: String,
  avatar: String,
  songList: [
    {
      groupName: String,
      list: [
        {
          songMid: String,
          songName: String,
          singer: String,
          duration: String,
          image: String,
          url: String,
          albumName: String,
          albumMid: String
        }
      ]
    }
  ],
  iLike: [
    {
      songMid: String,
      songName: String,
      singer: String,
      duration: String,
      image: String,
      url: String,
      albumName: String,
      albumMid: String
    }
  ],
  follow: [
    {
      userId: String,
      username: String
    }
  ],
  fans: [
    {
      userId: String,
      username: String
    }
  ]
}));
