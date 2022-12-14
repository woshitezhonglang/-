const $ = new Env(`Env for me`)

function Env(name) {
  LN = typeof $loon != `undefined`
  SG_STH_SDR = typeof $httpClient != `undefined` && !LN
  QX = typeof $task != `undefined`
  read = (key) => {
    if (LN || SG_STH_SDR) return $persistentStore.read(key)
    if (QX) return $prefs.valueForKey(key)
  }
  write = (key, val) => {
    if (LN || SG_STH_SDR) return $persistentStore.write(String(key), val); 
    if (QX) return $prefs.setValueForKey(String(key), val)
  }
  notice = (title, subtitle, message, url) => {
    if (LN) $notification.post(title, subtitle, message, url)
    if (SG_STH_SDR) $notification.post(title, subtitle, message, { url: url })
    if (QX) $notify(title, subtitle, message, { 'open-url': url })
  }
  get = (url, cb) => {
    if (LN || SG_STH_SDR) {$httpClient.get(url, cb)}
    if (QX) {url.method = `GET`; $task.fetch(url).then((resp) => cb(null, {}, resp.body))}
  }
  post = (url, cb) => {
    if (LN || SG_STH_SDR) {$httpClient.post(url, cb)}
    if (QX) {url.method = `POST`; $task.fetch(url).then((resp) => cb(null, {}, resp.body))}
  }
  toObj = (str) => JSON.parse(str)
  toStr = (obj) => JSON.stringify(obj)
  log = (message) => console.log(message)
  done = (value = {}) => {$done(value)}
  return { name, read, write, notice, get, post, toObj, toStr, log, done }
}