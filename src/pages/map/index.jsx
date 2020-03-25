import Taro, { Component } from '@tarojs/taro'
import { View, Text, Map } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import defaultHead from '../../assets/imgs/default_head.png'
import api from '../../service/api'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  componentDidMount() { }

  render() {
    return (
      <View className='index'>
        <Map onClick={this.onTap} />
      </View>
    )
  }
}
