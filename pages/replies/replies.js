/*
* @Author: beyondouyuan
* @Date:   2018-04-02 21:09:53
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-04 02:00:42
*/

import {
  Format
} from '../../utils/util'
Page({
  data: {
    topicList: []
  },
  onLoad: function (option) {
    const app = getApp()
    const { recent_replies }  = app.globalData.user
    this.setData({
      topicList: this.data.topicList.concat(recent_replies.map(item => { //时间格式化
              item.last_reply_at = Format(item.last_reply_at)
              return item
            }))
    })
  }
})
