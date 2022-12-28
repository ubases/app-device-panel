export const calcDate = (date1, date2) => {
  var date3 = date2 - date1

  var days = Math.floor(date3 / (24 * 3600 * 1000))

  var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

// 根据生日计算年龄
export const getAge = (birthday) => {
  birthday = dateFormat(new Date(birthday.replace(/-/g, '/')), 'yyyy-MM-dd')
  var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
  if (r == null) return false
  var d = new Date(r[1], r[3] - 1, r[4])
  if (d.getFullYear() === Number(r[1]) && (d.getMonth() + 1) === Number(r[3]) && d.getDate() === Number(r[4])) {
    var date = new Date()
    var Y = date.getFullYear() - r[1]
    var M = date.getMonth() + 1 - r[3]
    var D = date.getDate()
    if (parseInt(D) - parseInt(r[4]) < 0) {
      M--
      if (M < 0) {
        Y--
        M = 11
      }
    }
    if (M < 0) {
      Y--
      M = 11
    }
    return Y
  }
  return ('输入的日期格式错误！')
}

/**
 * 日期格式化
 */
export function dateFormat (DATE, format = 'yyyy-MM-dd hh:mm:ss') {
  let date
  if (typeof DATE === 'string') {
    date = new Date(DATE.replace(/-/g, '/'))
  } else {
    date = new Date(DATE)
  }
  if (date.toString() === 'Invalid Date') {
    return ''
  }
  if (date !== 'Invalid Date') {
    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  }
  return ''
}

export function format (date, fmt) {
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S+': date.getMilliseconds(),
    'q+': Math.floor(date.getMonth() / 3) + 1,
    'h+': (() => {
      const hour = date.getHours() % 12
      return hour === 0 ? 12 : hour
    })(),
    'E+': (() => {
      const week = {
        '0': 'Sunday',
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday'
      }
      return week[date.getDay() + '']
    })(),
    'x1': (() => {
      const week = {
        '0': '周日',
        '1': '周一',
        '2': '周二',
        '3': '周三',
        '4': '周四',
        '5': '周五',
        '6': '周六'
      }
      return week[date.getDay() + '']
    })(),
    'x2': (() => {
      const hour = ['凌晨', '早上', '下午', '晚上']
      const h = date.getHours()
      if (h === 12) return '中午'
      return hour[parseInt(h / 6)]
    })()
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')', 'g').test(fmt)) {
      const len = RegExp.$1.length
      fmt = fmt.replace(RegExp.$1, len === 1 ? o[k] : ('00' + o[k]).substr(-len))
    }
  }
  return fmt
}

export function toChatTime (date) {
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  date = new Date(date)
  let str
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  const beforeYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2)
  const monday = new Date(today)
  monday.setDate(today.getDate() - (today.getDay() ? today.getDay() - 1 : 6))
  if (date.getTime() > today.getTime()) {
    str = ''
  } else if (date.getTime() > yesterday.getTime()) {
    str = '昨天'
  } else if (date.getTime() > beforeYesterday.getTime()) {
    str = '前天'
  } else if (date.getTime() > monday.getTime()) {
    const week = {
      '0': '周日',
      '1': '周一',
      '2': '周二',
      '3': '周三',
      '4': '周四',
      '5': '周五',
      '6': '周六'
    }
    str = week[date.getDay() + '']
  } else {
    const hour = ['凌晨', '早上', '下午', '晚上']
    const h = date.getHours()
    if (h === 12) str = '中午'
    else str = hour[parseInt(h / 6)]
    str = format(date, 'MM月dd ') + str
  }
  str += format(date, 'HH:mm')
  return str
}
