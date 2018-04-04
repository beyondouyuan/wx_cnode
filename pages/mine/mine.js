/*
 * @Author: beyondouyuan
 * @Date:   2018-04-02 21:09:53
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-04-04 01:50:49
 */

import {
  parseTime,
  Format,
  showLoadingToast,
  showSuccessToast,
  showErrorToast
} from '../../utils/util'
import {
  getToken,
  getUser
} from '../../utils/api'
import parseAPI from '../../utils/urls'
Page({
  data: {
    islogin: false,
    loading: false, // 按钮状态
    accesstoken: '', // accesstoken
    error: '',
    userInfo: {}, // 用户登陆信息
    user: {} // 用户详情
  },
  onLoad: function() {
    this.checkedLogin()
  },
  checkedLogin: function() {
    showLoadingToast()
    const loginUserInfo = wx.getStorageSync('loginUserInfo')
    const app = getApp()
    if (loginUserInfo.accesstoken) {
      this.setData({
        islogin: true,
        userInfo: loginUserInfo
      })
      app.globalData.userInfo = loginUserInfo
      const { loginname } = app.globalData.userInfo
      const config ={
        url: `${parseAPI('user')}${loginname}`
      }
      getUser(config).then(res => {
        if (res.success) {
          console.log(res)
          res.data.create_at = parseTime(res.data.create_at, '{y}-{m}-{d}')
          this.setData({
            user: res.data
          })
          // wx.setStorageSync('user', user)
          app.globalData.user = this.data.user
          wx.hideLoading()
          showSuccessToast()
        }
      })
    } else {
      showErrorToast()
      app.globalData.userInfo = null
      wx.hideToast()
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
    showLoadingToast('正在登录...')
    getToken(config).then(res => {
        if (res.success) {
          const loginUserInfo = {
            accesstoken,
            id: res.id,
            loginname: res.loginname,
            avatar_url: res.avatar_url
          }
          wx.setStorageSync('loginUserInfo', loginUserInfo)
          setTimeout(() => {
            this.setData({
              loading: false
            })
            wx.navigateBack();
          }, 2000)
          wx.hideLoading()
          showSuccessToast('登陆成功！')
        } else {
          this.setData({
            error: res.error_msg,
            loading: false
          })
          showErrorToast()
          wx.hideToast()
          setTimeout(() => {
            this.setData({
              error: ''
            })
          }, 2000)
        }
      })
      .then(() => {
        wx.hideToast()
        this.checkedLogin()
      })
  }
})
