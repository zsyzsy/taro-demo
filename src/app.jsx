import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      'pages/map/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "backgroundColor": "#fff",
      "color": "#91a7ae",
      "selectedColor": "#0098d5",
      "list": [
        {
          "pagePath": "pages/map/index",
          "text": "首页",
          "iconPath": "imgs/home.png",
          "selectedIconPath": "imgs/home_selected.png"
        },
        {
          "pagePath": "pages/login/index",
          "text": "列表",
          "iconPath": "imgs/list.png",
          "selectedIconPath": "imgs/list_selected.png"
        },
        // {
        //   "pagePath": "pages/financing-list/index",
        //   "text": "贷后管理",
        //   "iconPath": "imgs/manage.png",
        //   "selectedIconPath": "imgs/manage_selected.png"
        // },
        // {
        //   "pagePath": "pages/my/my",
        //   "text": "个人中心",
        //   "iconPath": "imgs/my.png",
        //   "selectedIconPath": "imgs/my_selected.png"
        // }
      ]
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
