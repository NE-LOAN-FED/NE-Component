/**
 * Created by kisnows on 2017/2/16.
 */
export default {
  amount: /\d+00$/,
  name: /^[\u4e00-\u9fa5]{2,6}$/,
  phone: /^[\d]{11}$/,
  companyName: /^[A-Za-z\u4E00-\u9FA5\d（）()\-_]{0,50}$/,
  bankcard: /^\d{13,23}$/,
  location: /^[A-Za-z\u4E00-\u9FA5\d（）()\-_]{0,50}$/,
  email: /^([a-zA-Z0-9_.-]){1,30}@([\w-]+\.){1,4}\w+$/,
  card: /^[\d]{12,15}$/,
  numValidateByRange: function (minValue, maxValue) {
    const min = parseFloat(minValue)
    const max = parseFloat(maxValue)
    return (num) => {
      const numInt = parseFloat(num)
      if (isNaN(numInt)) return false
      if (!isNaN(min)) {
        if (numInt < min) {
          return false
        }
      }
      if (!isNaN(max)) {
        if (numInt > max) {
          return false
        }
      }
      return true
    }
  },
  /* eslint-disable */
  idcard: function (num) {
    if (typeof num === 'undefined') {
      return false
    }

    num = typeof (num) == 'object' ? num.value : num
    var aCity =
      '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91'
    var iSum = 0
    var info = ''
    var sBirthday = ''
    var idCardLength = num.length
    if (!/^\d{17}(\d|x)$/i.test(num) && !/^\d{15}$/i.test(num) && !
        /^\d{8}$/i.test(
          num)) {
      return false
    }

    //在后面的运算中x相当于数字10,所以转换成a
    var objvalue = num.replace(/x$/i, 'a')

    var curCity = objvalue.substr(0, 2)

    if (!(aCity.indexOf(curCity) >= 0)) {
      return false
    }

    if (idCardLength == 18) {
      sBirthday = objvalue.substr(6, 4) + '-' + Number(objvalue.substr(
        10, 2)) +
        '-' + Number(objvalue.substr(12, 2))
      var d = new Date(sBirthday.replace(/-/g, '/'))
      if (sBirthday != (d.getFullYear() + '-' + (d.getMonth() + 1) +
          '-' + d.getDate())) {
        return false
      }
      for (var i = 17; i >= 0; i--)
        iSum += (Math.pow(2, i) % 11) * parseInt(objvalue.charAt(
          17 - i), 11)

      if (iSum % 11 != 1) {
        return false
      }

    } else if (idCardLength === 15) {
      sBirthday = '19' + objvalue.substr(6, 2) + '-' + Number(
        objvalue.substr(8,
          2)) + '-' + Number(objvalue.substr(10, 2))
      var d = new Date(sBirthday.replace(/-/g, '/'))
      var dd = d.getFullYear().toString() + '-' + (d.getMonth() +
        1) + '-' + d.getDate()

      if (sBirthday != dd) {
        return false
      }
    } else if (idCardLength == 8) {
    }
    return true
  }
}
