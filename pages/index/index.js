const app = getApp()

import {
  formatTime,
  Format,
  showLoadingToast,
  showSuccessToast,
  showUpdateSuccessToast
} from '../../utils/util'
import {
  getTopics
} from '../../utils/api'
const navList = [{
  id: "all",
  title: "全部"
}, {
  id: "good",
  title: "精华"
}, {
  id: "share",
  title: "分享"
}, {
  id: "ask",
  title: "问答"
}, {
  id: "job",
  title: "招聘"
}]

Page({
  data: {
    activeIndex: 0,
    navList: navList,
    topicList: [],
    page: 1,
    limit: 10,
    tab: 'all'
  },
  onLoad: function() {
    this.fetchTopics()
  },
  onReachBottom: function() {
    this.lower()
    console.log('上拉刷新', new Date())
  },
  fetchTopics: function() {
    const config = {
      data: {
        tab: this.data.tab,
        page: this.data.page,
        limit: this.data.limit
      }
    }
    // 加载提示
    showLoadingToast()
    // 切换分类时，始终从第一页开始请求数据，所以需要先清空原数组
    if (this.data.page == 1) {
      this.setData({
        topicList: []
      })
    }
    getTopics(config).then(res => {
        if (res.success) {
          this.setData({
            topicList: this.data.topicList.concat(res.data.map(item => { //时间格式化
              item.last_reply_at = Format(item.last_reply_at)
              return item
            }))
          })
          wx.hideLoading()
          if (this.data.page == 1) { // 首次加载
            showSuccessToast()
          } else { // 下拉刷新 更新数据
            showUpdateSuccessToast()
          }
        }
      })
      .then(() => {
        setTimeout(() => {
          wx.hideToast()
        }, 1000)
      })
  },
  handleTap: function(e) {
    const self = this
    const tab = e.currentTarget.id // 请求数据的标签 all , good , ask, share, job
    const index = e.currentTarget.dataset.index // 激活项索引
    this.setData({
      activeIndex: index,
      tab: tab,
      page: 1 // 切换分类时总是从第一页开始
    })
    this.fetchTopics()
  },
  lower: function() {
    console.log('滑动到底部啦', new Date())
    this.setData({
      page: this.data.page + 1
    })
    this.fetchTopics()
  }
})
