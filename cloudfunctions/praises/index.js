// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openId = wxContext.OPENID;
    const newId = event.newId;
    const type = event.type;
    
    if(type == 1) {
        db.collection("comments").doc(newId).update({
            data: {
                "praise": _.push(openId)
            }
        })
        // console.log("===============")
        return openId;
    }else {
        const praiseRes = await db.collection("comments").doc(newId).field({
            praise: true
        }).get();
        const praises = praiseRes.data.praise;
        const newPraises = [];
        praises.forEach((praise, index) => {
            if(praise != openId) {
                newPraises.push(praise)
            }
        })
        db.collection("comments").doc(newId).update({
            data: {
                praise: newPraises
            }
        })
        return openId;
    }   
}