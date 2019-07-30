const Router = require('koa-router')
const multer = require('koa-multer')
const { join } = require('path')
const router = new Router
const dirpath = join(process.cwd(), "www/uploads/");
const serverip = "https://redspite.com/uploads/";
const storage = multer.diskStorage({
  // 存储的位置
  destination: dirpath,
  // 文件名
  filename(req, file, cb){
    const filename = file.originalname.split(".")
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
  }
})

const upload = multer({storage})

router.post('/api/upload', upload.single('file'), async ctx => {
  ctx.body = {
    fileurl: serverip + ctx.req.file.filename,
  }
})

module.exports = router

