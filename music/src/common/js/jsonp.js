import originJsonp from 'jsonp'

export default function (url, data, config) {
  if (!url)
    return;
  if (data) {
    let params = ['?'];
    Object.keys(data).forEach((key, index) => {
      if (index !== 0) {
        params.push('&');
      }
      params.push(`${key}=${data[key]}`);
    });
    url = url + params.join('');
  }
  return new Promise((resolve, reject) => {
    originJsonp(url, config, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    })
  })
}
