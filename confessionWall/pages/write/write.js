// pages/write/write.js
import {
    getUUID,
    getExt
} from "../../tools/tools.js"
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageList: [],
        showImage: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHeight();
    }, 
    showAddImageTap: function(event) {
        this.setData({
            showImage: true
        })
    },
    onSubmitEvent: function (event) {
        const that = this;
        const content = event.detail.value.content;
        const author = app.globalData.userInfo;
        const fileIDList = [];
        const userData = {
            content: content,
            author: author
        }
        wx.showLoading({
            title: '正在发表中...',
        })
        //上传图片到云服务器
        if (this.data.imageList.length > 0) {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();
            that.data.imageList.forEach((value, index) => {
                wx.cloud.uploadFile({
                    filePath: value,
                    cloudPath: "wirte/" + year + "/" + month + "/" + day + "/" + getUUID() + "." + getExt(value),
                    success: res => {
                        fileIDList.push(res.fileID)
                        //图片全部上传完成，开始发动态
                        if (fileIDList.length == that.data.imageList.length) {
                            userData.image = fileIDList;
                            that.setCloudData(userData);
                        }
                    }
                })
            })
        } else {
            that.setCloudData(userData);
        }
    },
    setCloudData: function (userData) {

        wx.cloud.callFunction({
            name: "write",
            data: userData,
            success: res => {
                wx.hideLoading()
                wx.showToast({
                    title: '发表完成',
                })
                wx.navigateBack({
                    delta: 1
                });
            }
        })
    },
    //删除图片
    closeBtn: function (event) {
        const index = event.currentTarget.dataset.index;
        const imageList = this.data.imageList;
        imageList.splice(index, 1);
        this.setData({
            imageList: imageList
        })
    },
    getHeight: function () {
        let systemInfo = wx.getSystemInfoSync();
        let windowWidth = systemInfo.windowWidth;
        let imageHeight = (windowWidth-30) * 0.3;
        console.log(imageHeight)
        this.setData({
            imageHeight: imageHeight
        });
    },
    //增加图片
    addImageTap: function () {
        const that = this;
        wx.chooseImage({
            success: (result) => {
                console.log(result)
                const imageList = result.tempFilePaths;
                const oldImages = that.data.imageList;
                const newImages = oldImages.concat(imageList);
                that.setData({
                    imageList: newImages
                })
                console.log(newImages.length)
            }
        });
    },
    onImageTap: function(event) {
        const index = event.currentTarget.dataset.index;
        const that = this;
        const current = that.data.imageList[index];
        wx.previewImage({
            urls: that.data.imageList,
            current: current,
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