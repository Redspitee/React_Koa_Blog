const utils = require('utility')
const getMd5Str = (str) => {
  const salt = 'myblog_950146258!%^8';
  return utils.md5(utils.md5(str+salt))
}
module.exports = getMd5Str