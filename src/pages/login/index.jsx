import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import defaultHead from '../../assets/imgs/default_head.png'
import api from '../../service/api'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},//暂存用户信息
      phoneDetail: [],//暂存用户信息
    }
  }
  componentDidMount() { }

  config = {
    navigationBarTitleText: '首页'
  }
  getUserInfo = (res) => {
    // 保存用户信息微信登录
    Taro.setStorage({
      key: "userinfo",
      data: res.detail.userInfo
    });
    /* 获取用户信息
    Taro.getStorage({ key: 'userinfo' }).then(res => {   //从缓存中获取用户信息
      console.log(res.data)
    })
    */
    this.setState({
      userInfo: res.detail.userInfo
    })
  }
  // 获取手机号
  getPhoneNumber(res) {
    /*
      res.detail{
        errMsg	string	
        encryptedData	string	包括敏感数据在内的完整用户信息的加密数据
        iv	string	加密算法的初始向量
      }
    */
    this._wxLogin(res.detail)
  }
  //获取手机号码
  _wxLogin(encryptedData) {
    const _this=this;
    Taro.login({
      success(res) {
        api.post('api-uaa/oauth/regist', {
          jsCode: res.code,
          encryptedData: encryptedData.encryptedData,
          iv: encryptedData.iv
        }).then(({ data }) => {
          _this.setState({
            phoneDetail: data.datas
          })
          Taro.setStorage({
            key: "userPhone",
            data: data.datas
          });
        })
      }
    })
  }
  // 登录
  loginClick() {
    debugger
    console.log(this.state)
    // 获取token
    api.post('api-uaa/oauth/openId/token', {
      openId: this.state.phoneDetail.openId
    },'application/x-www-form-urlencoded').then(({ data }) => {
      // 储存token
      Taro.setStorage({
        key: "userToken",
        data: data.datas.access_token
      });
      // 获取用户的信息
      api.get('api-admin/users/current').then(({ data }) => {
        console.log(data,'+++')
      })
    })
    
  }
  render() {
    const { userInfo, phoneDetail } = this.state;
    return (
      <View className='index'>
        <image src={userInfo.avatarUrl || defaultHead} />
        {
          userInfo &&
          <View>{userInfo.name}</View>
        }
        <View>{phoneDetail.phoneNumber}</View>
        <View className='user-login'>
          <Button type='primary'
            className='login-buttoNor'
            type="primary"
            open-type="getUserInfo"
            onGetUserInfo={this.getUserInfo}
          >微信登录</Button>
        </View>
        <View className='user-login'>
          <Button type='primary'
            className='login-buttoNor'
            type="primary"
            openType='getPhoneNumber'
            onGetPhoneNumber={this.getPhoneNumber.bind(this)}
          >关联手机号</Button>
        </View>
        <View className='user-login'>
          <Button type='primary'
            className='login-buttoNor'
            type="primary"
            onClick={this.loginClick.bind(this)}
          >登录</Button>
        </View>
      </View>
    )
  }
}
