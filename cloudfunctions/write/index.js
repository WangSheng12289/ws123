// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const content = event.content;
    const author = event.author;
    const image = event.image;
    console.log(content)
    
    // 云用实现文本内容检测
    try {
        const result = await cloud.openapi.security.msgSecCheck({
            content: event.content,
        })
        if (result.errCode === 87014) {
            return {
                code: 500,
                msg: '内容含有违法违规内容',
                data: result
            }
        } else {
            db.collection("comments").add({
                data: {
                    content: content,
                    author: author,
                    image: image
                }
            })
            return {
                code: 200,
                msg: '内容ok',
                data: result
            }
        }
    } catch (err) {
        // 错误处理
        if (err.errCode === 87014) {
            return {
                code: 500,
                msg: '内容含有违法违规内容',
                data: err
            }
        }
        return {
            code: 502,
            msg: '调用msgSecCheck接口异常',
            data: err
        }
    }
}