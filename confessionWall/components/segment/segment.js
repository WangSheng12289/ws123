// components/segment/segment.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // item: ["本校", "推荐", "打卡"]
        navState: 0,
    },
    //监听滑块
 bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
    navState:index
    })
    },
    //点击导航
    navSwitch: function(e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
    navState:index
    })
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
