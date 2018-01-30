const puppeteer = require('puppeteer');
const url = `https://segmentfault.com/a/1190000010736797`
;(async () => {
    console.log('start');
    const browser = await puppeteer.launch({
        headless:false,
        dumpio: false,
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url,{
        waitUntil:"networkidle2"
    });
    await page.waitForSelector('.article__content')
    const result = await page.evaluate(()=>{
        let as =[...document.querySelectorAll(".article__content ol li")]
        return as.map((a)=>{
            return {
                name:a.innerText
            }
        })

    })
    browser.close();
    console.log(result)
})();