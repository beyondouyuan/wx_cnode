export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const Format = datetime => {
    const date = new Date(datetime);
    const time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '个小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '个月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
}

export const showLoadingToast = (title="加载中...") => {
  wx.showToast({
    title,
    icon: 'loading',
    mask: true,
    duration: 5000
  })
}

export const showSuccessToast = (title='加载成功') => {
  wx.showToast({title})
}

export const showUpdateSuccessToast =(title='更新成功') => {
  wx.showToast({title})
}

export const showErrorToast = (title='操作失败') => {
  wx.showToast({title})
}

export const showMessageToast = (title='有新信息') => {
  wx.showToast({title})
}

export const showShareAppMessage = () => {
  return {
    title: 'Cnode社区',
    path: `/pages/index/index`
  }
}

// export const getToken = callback => {
//   const app = getApp()

//   if (app.globalData.token) {
//     callback(app.globalData.token)
//     return
//   }
//   wx.showModal({
//     content: '请在PC版CNodeJS社区登录获取Access Token',
//     showCancel: false,
//     confirmText: '知道啦',
//     complete() {
//       wx.scanCode({
//         success(res) {
//           const accessToken = res.result
//           rrequest({
//             url: '/accessToken',
//             method: 'POST',
//             data: { accessToken },
//             success(json) {
//               app.globalData.token = accessToken,
//               app.globalData.loginname = json.loginname,
//               app.globalData.avatar_url = json.avatar_url
//               callback(accessToken)
//               wx.setStorage({
//                 key: 'token',
//                 data: accessToken
//               })
//             },
//             errorExtraHandle(res) {
//               wx.removeStorage({
//                 key: 'token'
//               })
//             }
//           })
//         },
//         fail(res) {
//           showErrorToast('扫码失败')
//         }
//       })
//     }
//   })
// }