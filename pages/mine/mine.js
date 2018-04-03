/*
 * @Author: beyondouyuan
 * @Date:   2018-04-02 21:09:53
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-04-03 20:10:31
 */

import {
  formatTime,
  Format
} from '../../utils/util'
import {
  getToken
} from '../../utils/api'

Page({
  data: {
    islogin: false,
    loading: false,
    accesstoken: '',
    error: '',
    userInfo: {}
  },
  onLoad: function() {
    this.checkedLogin()
  },
  checkedLogin: function() {
    const loginUserInfo = wx.getStorageSync('loginUserInfo')
    const app = getApp()
    if (loginUserInfo.accesstoken) {
      this.setData({
        islogin: true,
        userInfo: loginUserInfo
      })
      app.globalData.userInfo = loginUserInfo
    } else {
      app.globalData.userInfo = null
    }
  },
  handleInput: function(e) {
    this.setData({
      accesstoken: e.detail.value
    })
  },
  handleLogin: function() {
    const {
      accesstoken
    } = this.data
    if (!accesstoken) return;
    this.setData({
      loading: true
    })
    const config = {
      data: {
        accesstoken: accesstoken
      }
    }
    getToken(config).then(res => {
        if (res.success) {
          const loginUserInfo = {
            accesstoken,
            id: res.id,
            loginname: res.loginname,
            avatar_url: res.avatar_url
          }
          console.log(loginUserInfo)
          wx.setStorageSync('loginUserInfo', loginUserInfo)
          setTimeout(() => {
            this.setData({
              loading: false
            })
            wx.navigateBack();
          }, 2000)
        } else {
          this.setData({
            error: res.error_msg,
            loading: false
          })
          setTimeout(() => {
            this.setData({
              error: ''
            })
          }, 2000)
        }
      })
      .then(() => {
        this.checkedLogin()
      })
  }
})