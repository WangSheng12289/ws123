// pages/confessionWall/confessionWall.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navState: 0,
        images: [1, 2, 3, 4, 5]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getWidHIg();
    },
    //根据设备获取所需高度宽度
    getWidHIg: function() {
        let systemInfo = wx.getSystemInfoSync();
        let windowWidth = systemInfo.windowWidth;
        //设置轮播图高度宽度
        let width = windowWidth;
        let height = width / 3;
        //设置用户上传图片高度宽度
        let twoImage = (windowWidth * 0.65) / 2 - 1;
        let threeImage = (windowWidth * 0.65) / 3 - 1;
        //设置轮播的和导航栏的背景半径
        // let bgHeaderR = ((width/2)*(width/2) + 330*330)/(2*330);
        let bgHeaderR = width * 3;
        let bgHeaderMove = width;
        this.setData({
            twoImage: twoImage,
            width: width,
            threeImage : threeImage,
            height: height,
            bgHeaderR: bgHeaderR,
            bgHeaderMove: bgHeaderMove
        });
    },
    //发动态
    onWriteTab: function(event) {
        console.log(event);
        const userInfo = app.globalData.userInfo;
        console.log(userInfo)
        wx.showActionSheet({
            itemList: ["文字", "图片", "视频"],
            itemColor: '#000000',
            success: (result)=>{
                console.log(result);
                const tabIndex = result.tabIndex;
                wx.navigateTo({
                     url: '../write/write?type' + tabIndex,
                })
            }
        });
    },
    //点击导航
    navSwitch: function (e) {
        // console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index;
        this.setData({
            navState: index
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.navigateTo({
          url: '../login/login',
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})