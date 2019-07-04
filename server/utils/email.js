const nodemailer = require("nodemailer");
const fs  = require('fs');
const path = require('path');
const moment = require('moment')

async function sendEmail(email = {}, replyInfo = {} ){
  const {userinfo, ip, city, content, createtime} = replyInfo;
  if(!userinfo || !userinfo.user) return;
  console.log(path.resolve(__dirname, './email.html'))

  // Generate test SMTP service account from ethereal.email
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "qq",
    port: 465,
    secureConnection: true, // true for 465, false for other ports
    auth: {
      user: '718352984@qq.com', // generated ethereal user
      pass: 'muekrifmsoimbbac' // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"一封来自redspite.com的邮件" <718352984@qq.com>', // sender address
    to: email, // list of receivers
    subject: content, // Subject line
    // text: "有人回复你在redspite.com的留言啦！", // plain text body
    html: `<div style="width:100%;text-align:center;font-weight: bold;"><div style="width:100%;box-sizing:border-box; padding-left: 30px;padding-right: 30px; padding-top: 20px;padding-bottom: 30px;background-color: #e38fa9;color: #fff;"><p style="font-size:30px;"><strong><b>有人回复你的留言啦</b></strong></p> <p> ${content}</p> <p style="text-align:right"> 消息来自 ${userinfo.user}</p><p style="text-align:right"> ${moment(createtime).format('YYYY-MM-DD HH:mm:ss')}</p></div> <a style="text-decoration: none;margin-top: 20px;display:inline-block;padding-top: 20px;padding-right: 20px;padding-bottom:20px;padding-left: 20px;background-color: #f7f3ee;color:#948c76;font-size:14px;" href="https://www.redspite.com/comments" target="_blank">去源网页查看</a></div>`
    // html: fs.createReadStream(path.resolve(__dirname, './email.html')) // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
} 
sendEmail().catch(console.error);

module.exports = sendEmail