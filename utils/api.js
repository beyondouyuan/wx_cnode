/*
* @Author: beyondouyuan
* @Date:   2018-04-02 22:35:17
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-03 20:14:11
*/

import request from './request'
import parseAPI from './urls'

export const getTopics = config => {
    // 默认配置
    const url = parseAPI('topics')
    const setting = {
        method: 'GET',
        data: {
            page: 1,
            tab: 'all',
            limit: 20,
            mdrender: false
        }
    }
    // 合并自定义参数
    Object.assign(setting, config)
    return request(url, setting)
        .then(res => res.data)
}

export const getTopic = config => {
    const setting = {
        url: parseAPI('topic'),
        method: 'GET',
        data: {
            mdrender: true
        }
    }
    // 合并自定义参数
    Object.assign(setting, config)
    return request(setting.url, setting)
        .then(res => res.data)
}

export const getToken = config => {
    const url = parseAPI('token')
    const setting = {
        method: 'POST',
        data: {
            accesstoken: ''
        }
    }
    // 合并自定义参数
    Object.assign(setting, config)
    return request(url, setting)
        .then(res => res.data)
}

export const getMessage = config => {
    const url = parseAPI('messages')
    const setting = {
        method: 'GET',
        data: {
            accesstoken: '',
            mdrender: true
        }
    }
    // 合并自定义参数
    Object.assign(setting, config)
    return request(url, setting)
        .then(res => res.data)
}