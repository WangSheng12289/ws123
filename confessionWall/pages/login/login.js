// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    },
    getUserProfile(e) {
        if (app.globalData.type) {
            console.log("已经有授权无需再获取")
            console.log(app.globalData.userInfo)
        } else {
            console.log("正在获取")
            const that = this;
            wx.getUserProfile({
                desc: '用于完善会员资料',
                success: (res) => {
                    this.setData({
                        userInfo: res.userInfo,
                    })
                    wx.cloud.callFunction({
                        name: "login",
                        success: res => {
                            that.data.userInfo.openid =  res.result.openid
                        }
                    })
                    app.onGetUserInfo(that.data.userInfo);
                    wx.navigateBack({
                        delta: 1
                    });
                }
            })
        }

    }
})