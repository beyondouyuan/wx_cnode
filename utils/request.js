/*
 * @Author: beyondouyuan
 * @Date:   2018-04-02 21:01:20
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-04-02 22:35:51
 */

const  request = (url, config) => {
    const { data, method } = config
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json'
            },
            success: res => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })

    return promise
}


export default request