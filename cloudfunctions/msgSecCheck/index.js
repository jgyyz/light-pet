// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { content } = event
    const result = await cloud.openapi.security.msgSecCheck({
      content
    })
    return result
  } catch(err) {
    console.log(err)
    return err
  }
}