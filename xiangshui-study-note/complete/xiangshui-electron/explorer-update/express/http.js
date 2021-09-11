
    const http = require('http')
    const https = require('https')
    const cheerio = require('cheerio');
    function  getHttpResult(obj) {
        return new Promise((resolve,reject)=>{
            let arr = []
            let data = ''
            let { serverUrl, serverPath, method } =obj
        
            let httpObj = {}
            if (serverUrl.indexOf("https") > -1) {
                httpObj = https
            } else {
                httpObj = http
            }
          
            
            function filterData(data, serverPath, method) {
             
            let theRes = []
            const $ = cheerio.load(data)
            $(serverPath).each((index, el) => {
                let str
                if (method == "text") {
                    str = $(el).text()
                } else if (method == "html") {
                    str = $(el).html()
                } else if (method == "attr") {
                    str = $(el).attr("href")
                } else {
                    str = $(el).text()
                }
                theRes.push(str)
        
            })
            return theRes
            }
            try {
                httpObj.get(serverUrl, (result) => {
                    result.on('data', (chunk) => {
                        data += chunk
                    })
                    result.on('end', () => {
                        arr = filterData(data, serverPath, method)
                        resolve(arr)
                     
                    })
                })
            } catch (e) {
                arr.push(e)
                reject(arr)
            }

        })
        
    }
    
module.exports = getHttpResult;
