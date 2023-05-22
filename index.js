require('dotenv').config();
const puppeteer = require('puppeteer');
const delay = require('delay');

(async () => {
   // config Browser
   const browser = await puppeteer.launch({
      headless:false,
      // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', 
      defaultViewport: null,
      args: ['--start-maximized'],
      slowMo: 10 
   })
   const page = await browser.newPage()

   // go to SIAK
   await page.goto('https://siak.univpancasila.ac.id/', {
      waitUntil:'load'
   })

   // login
   await page.waitForSelector('body > div > div > div > div > div.col-lg-6.d-flex.align-items-center.justify-content-center > div > form')
   await page.type('#username', process.env.SIAK_USERNAME)
   await page.type('#password', process.env.SIAK_PASSWORD)
   await page.keyboard.press('Enter')
   
   // go to list of kuesioner
   await page.waitForSelector('body div.page-content > div:nth-child(1) > div > div.profile-user-info.profile-user-info-striped')
   await page.goto(`${process.env.SIAK_KUESIONER_LINK}`, {
      waitUntil:'load'
   })
   
   await page.waitForSelector('#DataTables_Table_0')
   let elements = await page.$$('#DataTables_Table_0 > tbody > tr > td:nth-child(5) > center > div > a')

   // check if there are elements
   if(!elements.length) {
      console.log('KUESIONER HAS BEEN COMPLETED')
      await browser.close()
   }

   // get link of each element a
   let links = new Array();
   for (const element of elements) {
      await page.evaluate((el) => el.href, element).then((link) => links.push(link))
   }

   const tableKuesioner = 'body div.page-content > div.page-content > div > table:nth-child(7)'
   
   // go to kuesioner page
   for (const link of links) {
      await page.goto(link, {waitUntil:'load'})
      await page.waitForSelector(`${tableKuesioner}`)
      // select radio button
      let radios = await page.$$(`${tableKuesioner} > tbody > tr > td:nth-child(2) > input.radio`)
      var i = 1;
      for (const radio of radios) {
         await page.evaluate(el => el.getAttribute('value'), radio).then(async val => {
            if(val === `${i}_${process.env.SIAK_KUESIONER_OPTION}`) {
               await delay(150)
               radio.click()
               i++
            }
         })
      }

      await page.type(`${tableKuesioner} > tbody > tr:nth-child(103) > td:nth-child(2) > textarea`, '-')
      await page.click(`${tableKuesioner} > tbody > tr:nth-child(103) > td:nth-child(2) > input`)
      await page.keyboard.press('Enter')
   }

   await delay(150)
   await browser.close()
   console.log('PROGRAM COMPLETE')
})()
