// pages/write/write.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.getHeight();
    },
    onSubmitEvent: function (event) {
        const content = event.detail.value.content;
        const author = app.globalData.userInfo;

        wx.cloud.callFunction({
            name: "write",
            data: {
                content: content,
                author: author
            },
            success: res => {
                console.log(res)
            }

        })
        console.log(content, author)
        
        
    },
    getHeight: function () {
        let systemInfo = wx.getSystemInfoSync();
        let windowWidth = systemInfo.windowWidth;
        let imageHeight = windowWidth * 0.31;
        console.log(imageHeight)
        this.setData({
            imageHeight: imageHeight
        });
    },
    addImageTap() {
        const that = this;
        wx.chooseImage({
            success: (result)=>{
                console.log(result)
                const imageList = result.tempFilePaths;
                const oldImages = that.data.imageList;
                const newImages = oldImages.concat(imageList);
                that.setData({
                    imageList: newImages
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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