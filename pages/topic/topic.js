/*
 * @Author: beyondouyuan
 * @Date:   2018-04-02 21:09:53
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-04-04 02:30:28
 */
const app = getApp()

import {
  formatTime,
  Format,
  showLoadingToast,
  showSuccessToast
} from '../../utils/util'
import {
  getTopic
} from '../../utils/api'
import parseAPI from '../../utils/urls'
// 引入wxParse解析html
import WxParse from '../../wxParse/wxParse'
Page({
  data: {
    detail: {},
    mdrender: true,
    isShow: false, // 初始状态不显示任何页面内容，以解决网络加载过程中出现渲染缓慢使得页面只看到静态部分
    collectText: '收藏'
  },
  onLoad: function(options) {
    this.fetchTopic(options.id)
  },

  fetchTopic: function(id) {
    const config = {
      url: parseAPI('topic') + id,
      data: {
        mdrender: this.data.mdrender
      }
    }
    showLoadingToast()
    getTopic(config).then(res => {
        const self = this
        if (res.success) {
          // 时间格式化
          res.data.create_at = Format(res.data.create_at)
          res.data.replies = res.data.replies.map(item => {
            item.create_at = Format(item.create_at)
            item.content = WxParse.wxParse('replies', 'html', item.content, self, 5)
            return item
          })
          // wxParse解析html
          res.data.content = WxParse.wxParse('content', 'html', res.data.content, self, 5)
          this.setData({
            detail: res.data,
            isShow: true,
          })
          wx.hideLoading()
          showSuccessToast()
        }
      })
      .then(() => {
        setTimeout(() => {
          wx.hideToast()
        }, 1000)
      })
  }
})
