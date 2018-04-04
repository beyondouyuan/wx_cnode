/*
* @Author: beyondouyuan
* @Date:   2018-04-02 21:09:53
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-04 01:47:52
*/
const app = getApp()

import {
  formatTime,
  Format,
  showLoadingToast,
  showSuccessToast
} from '../../utils/util'
import {
  getCollectList
} from '../../utils/api'
import parseAPI from '../../utils/urls'
Page({
  data: {
    topicList: []
  },
  onLoad: function () {
    this.fetchCollectList()
  },
  fetchCollectList: function() {
    const { loginname } = app.globalData.userInfo
    const config = {
      url: `${parseAPI('listCollect')}${loginname}`
    }
    showLoadingToast()
    getCollectList(config).then(res => {
      if (res.success) {
        this.setData({
          topicList: this.data.topicList.concat(res.data.map(item => { //时间格式化
              item.last_reply_at = Format(item.last_reply_at)
              return item
            }))
        })
        wx.hideLoading()
        showSuccessToast()
        setTimeout(() => {
          wx.hideToast()
        }, 1200)
      }
    })
  }
})
