/*
* @Author: beyondouyuan
* @Date:   2018-04-02 21:09:53
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-03 15:38:38
*/
const app = getApp()

import { formatTime, Format } from  '../../utils/util'
import { getTopic } from '../../utils/api'
import parseAPI from '../../utils/urls'

Page({
  data: {
    detail: {},
    mdrender: false,
    hidden: false,
    collectText: '收藏'
  },
  onLoad: function (options) {
    this.fetchTopic(options.id)
  },

  fetchTopic: function(id) {
    const config = {
      url: parseAPI('topic') + id,
      data: {
        mdrender: this.data.mdrender
      }
    }
    this.setData({
      hidden: false
    })
    getTopic(config).then(res => {
      console.log(res)
      if (res.success) {
        // 时间格式化
        res.data.create_at = Format(res.data.create_at)
        res.data.replies = res.data.replies.map(item => {
          item.create_at = Format(item.create_at)
          return item
        })

        this.setData({
          detail: res.data
        })
      }
    })
    .then(() => {
      setTimeout(() => {
        this.setData({
          hidden: true
        })
      }, 1000)
    })
  }
})