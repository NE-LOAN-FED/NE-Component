/**
 * Created by kisnows on 2016/9/29.
 */

/* global wx */
export default function () {
  return new Promise(function (resolve, reject) {
    fetch('/open/wechat/jsapi', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        url: window.location.href.split('#')[0]
      }
    }).then(
      function (resp) {
        if (resp.code === 0) {
          const appId = resp.data.appId
          const timestamp = resp.data.timestamp
          const nonceStr = resp.data.nonceStr
          const signature = resp.data.signature
          const jsApiList = [
            'checkJsApi',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ]

          wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: jsApiList
          })

          wx.ready(function () {
            resolve(resp.data)
          })

          wx.error(function (err) {
            reject(err, 'jsapi初始化失败')
          })
        } else {
          reject('意外的返回值')
        }
      },
      function (err) {
        reject(err, '请求失败')
      }
    )
  })
}
