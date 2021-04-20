// pages/details/details.js
const db = wx.cloud.database();
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_input: true,
        comments: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const index = options.index;
        const pages = getCurrentPages();
        const indexPage = pages[0]
        const writeNew = indexPage.data.writeNews[index]
        console.log("==============")
        console.log(writeNew)
        this.setData({
            writeNew: writeNew
        })
        this.setInputWidth();
        this.setComments();
    },
    // 加载评论数据
    setComments: function () {
        const that = this
        const _id = that.data.writeNew._id
        db.collection("comment").where({
            new_id: _id
        }).get().then(res => {
            that.setData({
                comments: res.data
            })
        })
    },
    //发送评论有关的函数
    onSubmitEvent: function (event) {
        const that = this
        const comment = event.detail.value.content
        const _id = that.data.writeNew._id
        const author = app.globalData.userInfo.avatarUrl
        const authorName = app.globalData.userInfo.nickName
        console.log(comment, _id)
        db.collection("comment").add({
            data: {
                userComment: comment,
                new_id: _id,
                author: author,
                authorName: authorName
            }
        }).then(res => {
            const tempComment = {
                userComment: comment,
                new_id: _id,
                author: author,
                authorName: authorName
            }
            const comments = that.data.comments
            comments.splice(0, 0, tempComment)
            that.setData({
                comments: comments
            })
        })
    },
    onFocus: function (event) {
        this.setData({
            is_input: false
        })
    },
    onBlur: function (event) {

    },
    onInput: function (event) {
        let inputText = event.detail.value
        if (inputText.length == 0) {
            this.setData({
                is_input: true
            })
        } else {
            this.setData({
                is_input: false
            })
        }
    },
    // ---------------------------
    // 设置输入框的宽度
    setInputWidth: function () {
        let windowWidth = wx.getSystemInfoSync().windowWidth;
        let inputWidth = windowWidth * 0.94 - 30;
        this.setData({
            inputWidth: inputWidth
        })
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