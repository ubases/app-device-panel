/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^(0\d{2,3})-?(\d{7,8})$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

export function isvalidUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证pad还是pc */
export const vaildatePc = function () {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'
  ]
  let flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

var city = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江 ',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北 ',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏 ',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外 '
}

/**
 * 判断身份证号码
 */
function check15IdCardNo (idCardNo) {
  // 15位身份证号码的基本校验
  var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(
    idCardNo
  )
  if (!check) return false
  // 校验地址码
  var addressCode = idCardNo.substring(0, 6)
  check = checkAddressCode(addressCode)
  if (!check) return false
  var birDayCode = '19' + idCardNo.substring(6, 12)
  // 校验日期码
  return checkBirthDayCode(birDayCode)
}

function checkAddressCode (addressCode) {
  var check = /^[1-9]\d{5}$/.test(addressCode)
  if (!check) return false
  if (city[parseInt(addressCode.substring(0, 2))]) {
    return true
  } else {
    return false
  }
}

function checkBirthDayCode (birDayCode) {
  var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(
    birDayCode
  )
  if (!check) return false
  var yyyy = parseInt(birDayCode.substring(0, 4), 10)
  var mm = parseInt(birDayCode.substring(4, 6), 10)
  var dd = parseInt(birDayCode.substring(6), 10)
  var xdata = new Date(yyyy, mm - 1, dd)
  if (xdata > new Date()) {
    return false // 生日不能大于当前日期
  } else if (
    xdata.getFullYear() === yyyy &&
    xdata.getMonth() === mm - 1 &&
    xdata.getDate() === dd
  ) {
    return true
  } else {
    return false
  }
}

function birDayValidate (year, month, day) {
  // 转数字
  const YEAR = Number(year)
  const MONTH = Number(month)
  const DAY = Number(day)
  // 是否闰年
  let isLeapYear = false
  // 大月
  const BIG_MONTH = [1, 3, 5, 7, 8, 10, 12] // 31天的月份
  // 判断闰年
  if ((YEAR % 4 === 0 && YEAR % 100 !== 0) || YEAR % 400 === 0) {
    isLeapYear = true
  }
  // 判断是否未来人
  let CURRENT_DATE = new Date()
  let y, m, d
  y = CURRENT_DATE.getFullYear() >= YEAR // 正常 true
  if (!y) {
    m = CURRENT_DATE.getFullYear() === YEAR ? CURRENT_DATE.getMonth() + 1 >= MONTH : true
  } else {
    m = true
  }
  if (!m) {
    d = CURRENT_DATE.getMonth() + 1 === MONTH ? CURRENT_DATE.getDate() >= DAY : true
  } else {
    d = true
  }
  if (!y || !m || !d) {
    return false
  }

  // 判断不是非人类
  if (CURRENT_DATE.getFullYear() - 200 > YEAR) return false

  // 判断月份对应日期没问题
  if (MONTH > 12 || DAY > 31) return false
  if (DAY > 30 && !BIG_MONTH.includes(MONTH)) return false
  if (MONTH === 2) {
    if (DAY > 29) return false
    if (DAY === 29 && !isLeapYear) return false
  }
  return true
}

export function cardid (code) {
  console.log('code: ', code)
  let list = []
  let result = true
  let msg = ''
  if (!validatenull(code)) {
    if (code.length === 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = '证件号码格式错误'
      } else if (!city[code.substr(0, 2)]) {
        msg = '地址编码错误'
      } else {
        // 18位身份证需要验证最后一位校验位
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        let a = parity[sum % 11]
        let b = code[17]
        console.log('a: ', a)
        if (typeof a === 'string' && a.toUpperCase() !== b.toUpperCase()) {
          msg = '证件号码校验位错误'
        } else if (typeof a === 'number' && Number(a) !== Number(b)) {
          console.log('a: ', a, 'b: ', b)
          msg = '证件号码校验位错误'
        } else {
          let strCode = code.join('')
          let yyyy = strCode.substr(6, 4)
          let mm = strCode.substr(10, 2)
          let dd = strCode.substr(12, 2)
          if (!birDayValidate(yyyy, mm, dd)) {
            msg = '出生年月日异常'
          } else {
            result = false
          }
        }
      }
    } else if (code.length === 15) {
      if (check15IdCardNo(code) === true) {
        result = false
      }
    } else {
      msg = '证件号码长度不为15或18位'
    }
  } else {
    msg = '证件号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile (phone) {
  let list = []
  let result = true
  let msg = ''
  var isPhone = /^0\d{2,3}-?\d{7,8}$/
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length === 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确'
      } else {
        result = false
      }
    } else {
      msg = '手机号码长度不为11位'
    }
  } else {
    msg = '手机号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}

/**
 * 判断姓名是否正确
 */
export function validatename (name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/
  if (!regName.test(name)) return false
  return true
}

/**
 * 判断是否为整数
 */
export function validatenum (num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) return false
  } else if (type === 2) {
    regName = /[^\d]/g
    if (!regName.test(num)) return false
  }
  return true
}

/**
 * 判断是否为小数
 */
export function validatenumord (num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) return false
  } else if (type === 2) {
    regName = /[^\d.]/g
    if (!regName.test(num)) return false
  }
  return true
}

/**
 * 判断是否为空
 */
export function validatenull (val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}
