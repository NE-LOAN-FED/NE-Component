/**
 * Created by kisnows on 2016/12/8.
 */
export function formatter(type, value) {
  switch (type) {
    case 'idCard':
      return formatterToIdCard(value)
    case 'bankCard':
      return formatterToBankCard(value)
    case 'phone':
      return formatterToPhone(value)
  }
}

export function removeBlack(value) {
  if (value === undefined || value === null) {
    return value
  }
  const v = value.toString()
  return v.replace(/(\s*)/g, '')
}

/**
 * 格式化为 银行卡号 格式： 9222 2222 2222 2222 2222
 * @param value
 * @returns {*}
 */
export function formatterToBankCard(value) {
  value = toEntireString(value)
  // value = value.split('')
  // let formatterValue = ''
  if (value.length === 0) {
    return ''
  }
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  // while (true) {
  //   if (value.length === 0) break
  //   // formatterValue += value.splice(0, 4).join('') + ' '
  // }
  return value.trim()
}

/**
 * 格式化为 身份证 格式 611111 11111111 1111
 * @param value
 * @returns {string|*}
 */
export function formatterToIdCard(value) {
  value = toEntireString(value)
  value = value.substr(0, 6) + ' ' + value.substr(6, 8) + ' ' + value.substr(14, 4) + value.substr(18)
  return value.trim()
}

/**
 * 格式化为 手机号 格式: 133 3333 3333
 * @param value
 * @returns {string|*}
 */
export function formatterToPhone(value) {
  value = toEntireString(value)
  value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7, 4) + value.substr(11)
  return value.trim()
}

/**
 * 转化为完整的 string，避免当数字过大时表示为科学记数法导致转化的字符串不符合预期的情况
 * @param value
 * @returns {string} 处理完后的 string
 */
function toEntireString(value) {
  if (typeof value === 'number') {
    value = value.toLocaleString('en-IN').replace(/,/g, '')
  } else if (typeof value === 'string') {
    value = value.toString()
  } else {
    value = ''
  }
  return value
}
