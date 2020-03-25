import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../utils/status'
import { config } from '../utils/config'
import { logError } from '../utils/error'

const token = ''
let  DEFAULT_HEADERS = {
  // 'X-Request-With': 'XMLHttpRequest',
  'Content-Type': 'application/json'
};
export default {
  baseOptions(params, method = 'GET') {
    let { url, data,type } = params;
    // let token = getApp().globalData.token
    // if (!token) login()
    (url === 'api-uaa/oauth/openId/token' || url === 'api-uaa/oauth/regist') ? DEFAULT_HEADERS['authorization'] = config.defaultToken:DEFAULT_HEADERS['authorization'] = wx.getStorageSync('token')?'Bearer ' + wx.getStorageSync('token'):''
    const headers={...DEFAULT_HEADERS};
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: config.baseUrl + url,
      data:  JSON.stringify(data),
      method: method,
      header: headers,
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          Taro.clearStorage()
          Taro.navigateTo({
            url: '/pages/login/index'
          })
          return logError('api', '请先登录')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    return Taro.request(option)
  },
  get(url, data) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}