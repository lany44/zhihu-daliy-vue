
const showBarAPI = () => {
  window.document.body.classList.add = 'scroll-stop'
  window.document.querySelector('html').classList.add = 'scroll-stop'
}

const hideBarAPI = () => {
  window.document.body.className = ''
  window.document.querySelector('html').className = ''
}

const replaceImgUrlAPI = str => str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')

const dateTimeAPI = date => {
  let year = date.slice(0, 4)
  let month= date.slice(4, 6) -1
  let day = date.slice(6, 8)
  var now = new Date(),
      str = '',
      argTime = new Date(year, month, day),
      weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  if(now.getDate() === argTime.getDate()) {
    return '今日要闻'
  }else {
    str+= argTime.getMonth()+1 +'月'
    str+= argTime.getDate() + '日 '
    str+= weeks[argTime.getDay()]
    return str
  }
}

/*
  格式化时间戳
  1469175239 ｜ fommatTime "yyyy-mm-dd hh-mm-ss"
 */
const formatTimeAPI = (timeStamp, fmt) => {// author: meizz
  if(!timeStamp)
    return ''

  var _timeStamp = parseInt(timeStamp)
  if(_timeStamp.toString().length === 10)
    _timeStamp *= 1000

  !fmt && (fmt = 'yyyy-mm-dd')

  var t = new Date(_timeStamp)

  var o = {
    'M+': t.getMonth() + 1,
    'd+': t.getDate(),
    'h+': t.getHours(),
    'm+': t.getMinutes(),
    's+': t.getSeconds(),
    'q+': Math.floor((t.getMonth() + 3)/ 3),
    'S': t.getMilliseconds() 
  }
  if(/(y+)/.test(fmt)) 
    fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length ===1)? (o[k]) : (('00' + o[k]).substr((''+o[k]).length)))
    }
  return fmt
}

module.exports = {
  formatTimeAPI,
  dateTimeAPI,
  showBarAPI,
  hideBarAPI,
  replaceImgUrlAPI,
}