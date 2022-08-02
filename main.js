const puppeteer = require('puppeteer');

(async () => {
    const fs = require('fs');
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.tiktok.com/@username');
    await autoScroll(page);
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
    // console.log(hrefs);
    for(let i=0; i<hrefs.length; i++){
        fs.writeFile('result.txt', hrefs[i]+'\n', { flag: 'a+' }, err => {});
        console.log(i+1+". ",hrefs[i]);
    }

    await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
