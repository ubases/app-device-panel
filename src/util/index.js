import store from '@/store'

export function dateFormat (DATE, format = 'yyyy-MM-dd hh:mm:ss') {
  let date
  if (typeof DATE === 'string') {
    date = new Date(DATE.replace(/-/g, '/'))
  } else {
    date = new Date(DATE)
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

// 获取字典 返回数组
export function getDictData (dictName) {
  if (!dictName) {
    Error('字典名称不能为空')
    return []
  }
  let dicData = store.getters.dictList[dictName]
  if (Array.isArray(dicData)) {
    return dicData.map(item => {
      item.name = item.label
      return item
    })
  } else {
    return []
  }
}

// 获取字典 返回对象
export function getDictDataForMap (dictName) {
  let dictData = getDictData(dictName)
  let cacheObj = {}
  for (let index in dictData) {
    let dicObj = dictData[index]
    cacheObj[dicObj.value] = dicObj.label
  }
  return cacheObj
}

// 获取字典值
export function getDictValue (dictName, value) {
  if (!dictName || !value) {
    return ''
  } else {
    return getDictDataForMap(dictName)[value]
  }
}

/**
 * 获取URL参数值
 */
export function getUrlKey (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  let params = window.location.hash.split('?')[1] || window.location.search.substr(1)
  var r = params.match(reg) // 匹配目标参数
  if (r != null) return decodeURI(r[2])
  return null // 返回参数值
}
