/*
* @Author: beyondouyuan
* @Date:   2018-04-02 21:09:53
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-03 20:46:33
*/
const app = getApp()

import {
  formatTime,
  Format
} from '../../utils/util'
import {
  getMessage
} from '../../utils/api'

Page({
  data: {
    message: [],
    verified: false
  },
  onLoad: function () {
    this.fetchMessage()
  },
  checkedLogin: function() {
    const loginUserInfo = wx.getStorageSync('loginUserInfo')
    if (loginUserInfo.accesstoken) {
      this.setData({
        verified: true
      })
      return loginUserInfo.accesstoken
    } else {
      return null
    }
    
  },
  fetchMessage: function() {
    const accesstoken = this.checkedLogin()
    if (accesstoken) {
        const config = {
        data: {
          accesstoken
        }
      }
      getMessage(config).then(res => {
        console.log(res)
        if (res.success) {
          this.setData({
            message: [...res.data.hasnot_read_messages, ...res.data.has_read_messages]
          })
          console.log(this.data.message)
        }
      })
    }
    
  }
})