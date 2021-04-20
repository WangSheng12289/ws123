// components/newsMould/newsMould.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        detailUrl: {
            type: String,
            value: 1
        },
        writeNew: {
            type: Object,
            value: {}
        }
    },
    lifetimes: {
        attached: function (event) {
            const wirteNew = this.properties.writeNew
            this.setData({
                News: wirteNew
            })
            
            console.log(wirteNew)
            // 在组件实例进入页面节点树时执行
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
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPraiseTap: function (event) {
            const that = this;
            const praises = that.data.News.praise
            const news = that.data.News
            //获取自己的id
            const openId = app.globalData.userInfo.openid
            let isPraise = true
            console.log("==========")
            if (praises == undefined || praises.length == 0) {
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
                news.praise = praiseList
                that.setData({
                    News: news
                })
            } else {
                praises.forEach((value, index) => {
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
                        praises.splice(index, 1)
                        news.praise = praises
                        that.setData({
                            News: news
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
                news.praise.push(openId)
                that.setData({
                    News: news
                })
            }
        },

    }
})