// pages/confessionWall/confessionWall.js
const app = getApp();
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navState: 0,
        images: [1, 2, 3, 4, 5],
        writeNews: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getWidHIg();
        this.onWriteNews();

        //改变点赞样式

    },
    //获取数据信息
    onWriteNews: function () {
        const that = this;
        db.collection("comments").limit(2).get().then(res => {
            const writeNews = res.data;
            // console.log(writeNews[0].praise.length);
            that.setData({
                writeNews: writeNews
            })
            // console.log(this.data.writeNews)
        })

    },
    //根据设备获取所需高度宽度
    getWidHIg: function () {
        let systemInfo = wx.getSystemInfoSync();
        let windowWidth = systemInfo.screenWidth;
        //设置轮播图高度宽度
        let width = windowWidth;
        let height = width / 3;
        //设置用户上传图片高度宽度
        let twoImage = (windowWidth * 0.65) / 2 - 1;
        let threeImage = (windowWidth * 0.65) / 3 - 1;
        //设置轮播的和导航栏的背景半径
        let bgHeaderR = width * 3;
        let bgHeaderMove = width;
        this.setData({
            twoImage: twoImage,
            width: width,
            threeImage: threeImage,
            height: height,
            bgHeaderR: bgHeaderR,
            bgHeaderMove: bgHeaderMove
        });
    },
    //发动态
    onWriteTab: function (event) {
        console.log(event);
        const userInfo = app.globalData.userInfo;
        console.log(userInfo)
        wx.navigateTo({
            url: '../write/write',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    //点击导航
    navSwitch: function (e) {
        console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index;
        this.setData({
            navState: index
        })
    },
    //点赞
    onPraiseTap: function (event) {
        const that = this;
        const newIndex = event.currentTarget.dataset.new;
        const tempNews = that.data.writeNews;
        const news = tempNews[newIndex]
        const praise = news.praise
        const openId = app.globalData.userInfo.openid
        let isPraise = true
        console.log("==========")
        console.log(tempNews, news._id, newIndex)
        if (praise == undefined || praise.length == 0) {
            wx.cloud.callFunction({
                name: "praises",
                data: {
                    newId: news._id,
                    type: 1
                },
                success: res => {
                    console.log("点赞成功")
                }
            })
            isPraise = false
            const praiseList = [openId]
            console.log(praiseList)
            tempNews[newIndex].praise = praiseList
            that.setData({
                writeNews: tempNews
            })
        } else {
            praise.forEach((value, index) => {
                if (value == openId) {
                    console.log("您已经点过赞了")
                    isPraise = false
                    wx.cloud.callFunction({
                        name: "praises",
                        data: {
                            newId: news._id,
                            type: 0
                        },
                        success: res => {
                            console.log("取消点赞")
                            // const openid = res.result 
                        }
                    })
                    praise.splice(index, 1)
                    tempNews[newIndex].praise = praise
                    that.setData({
                        writeNews: tempNews
                    })
                }
            })
        }
        console.log(isPraise)
        if (isPraise) {
            wx.cloud.callFunction({
                name: "praises",
                data: {
                    newId: news._id,
                    type: 1
                },
                success: res => {
                    console.log("点赞")
                }
            })
            tempNews[newIndex].praise.push(openId)
            that.setData({
                writeNews: tempNews
            })
        }
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
        this.loadNews();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.loadNews();
    },

    loadNews: function () {
        console.log("正在加载")
        const that = this;
        const start = that.data.writeNews.length;
        console.log(start)
        db.collection("comments").skip(start).limit(1).get().then(res => {
            const writeNews = res.data;
            const newWriteNews = that.data.writeNews.concat(writeNews);
            console.log(newWriteNews)
            that.setData({
                writeNews: newWriteNews
            })
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})