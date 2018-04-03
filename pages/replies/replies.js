/*
* @Author: beyondouyuan
* @Date:   2018-04-02 21:09:53
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-02 22:18:32
*/
const app = getApp()

import {formatTime} from '../../utils/util.js'

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
       formatTime(new Date(log))
      })
    })
  }
})