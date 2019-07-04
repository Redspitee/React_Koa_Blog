const FastScanner = require('fastscan');
const words = ["二百五","瓜娃子","fuck","shit","去死", "垃圾","。。。。","nm","cnm"];
const scanner = new FastScanner(words)
function filter (content){
  content = content.toUpperCase()
  const offWords = scanner.search(content,option={quick: true});
  return offWords.length > 0 ? false :true;  
}
module.exports = filter