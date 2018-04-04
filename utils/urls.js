/*
* @Author: beyondouyuan
* @Date:   2018-04-02 21:07:52
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-04 01:27:54
*/
const basePath = 'https://cnodejs.org/api/v1'
const urls = {
    topics: '/topics',
    topic: '/topic/',
    user: '/user/',
    token: '/accesstoken',
    listCollect: '/topic_collect/',
    addCollect: '/topic_collect/collect',
    delCollect: '/topic_collect/de_collect',
    userCollect: '/topic_collect',
    agreeReply: '/reply',
    messages: '/messages',
    messageCount: '/message/count',
    markAllMessage: '/message/mark_all'
}

// 获取对应的请求路径
const parseAPI = api => {
    // return basePath + urls[api]
    return `${basePath}${urls[api]}`
}

export default parseAPI
