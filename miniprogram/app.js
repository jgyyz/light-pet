//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'light-pet-test-bdanx',
        traceUser: true,
      })
    }

    this.globalData = {
      openid: -1,
      userInfo: {},
      petList: [],  // 宠物列表
    }

    // 获取openId
    this.getOpenId()
    // 获取用户信息
    this.getUserInfo()
    // 获取宠物列表
    this.getPetList()
  },

  getOpenId() {
    wx.cloud.callFunction({
      name: 'login'
    })
    .then(res => {
      const { result: { openid } } = res
      this.globalData.openid = openid
    })
  },

  getUserInfo() {
    wx.getSetting({
      success: (result)=>{
        if (result.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            withCredentials: 'false',
            lang: 'zh_CN',
            timeout:10000,
            success: (result)=>{
              this.globalData.userInfo = result.userInfo
            },
            fail: ()=>{},
          });
        }
      },
    })
  },

  getPetList() {
    wx.cloud.callFunction({
      name: 'pet',
      data: {
        $url: 'list'
      }
    })
    .then(res => {
      const {
        result: { data }
      } = res;
      this.globalData.petList = data
    })
  }
})
