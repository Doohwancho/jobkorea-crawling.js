const axios = require('axios'); //to crawl html page
const cheerio = require('cheerio'); //light version of jquery

const { FnDueDate } = require('./util/time'); 
const { global } = require('./init');



/**
 * crawl html page
 * @param { string } url 
 * @param { number } index 
 * @param { string } keyword 
 * @property { Promise } html
*       - tip! await을 ()한번 더 감싸기!   
        - &careerType=1%2C4 - 신입 + 경력 무관   
        - &tabType=recruit - given by default
        - &Page_No - page number to crawl multiple pages
        - &Ord=ApplyCloseDtAsc - 마감임박순
 * @returns { Promise }
 */
const getHTML = async(url, index, keyword) => {
    try { 
        const html = (await axios.get(url+encodeURI(keyword)+`&careerType=1%2C4&tabType=recruit&Ord=ApplyCloseDtAsc&Page_No=${index+1}`)).data; 
        return html
    } catch(e) {
        console.log(e);
    }
}

/**
 * parse html page and get target informations
 * @param { string } page 
 * @returns { Promise }
 */

const parsing = (page) => {
    const $ = cheerio.load(page);
    const $jobList = $('.list-default .post');

    $jobList.each((idx, node) => {
        const jobTitle = $(node).find('.title:eq(0)').text().trim();
        // const company = $(node).find('.name:eq(0)').text().trim();
        // const experience = $(node).find('.exp:eq(0)').text().trim();
        // const education = $(node).find('.edu:eq(0)').text().trim();
        // const regularYN = $(node).find('.option > span:eq(2)').text().trim();
        const region = $(node).find('.long:eq(0)').text().trim();
        const dueDate = $(node).find('.date:eq(0)').text().trim();
        const etc = $(node).find('.etc:eq(0)').text().trim();
        const href = `https://www.jobkorea.co.kr${$(node).find('.post-list-info > a').attr('href')}`;

        global.db.put(
            jobTitle, 
            { 
                //company, 
                //experience, 
                //education, 
                //regularYN, 
                region, 
                dueDate, 
                etc, 
                href
            });
    })

    return global.db;
}

/**
 * @param { string } url 
 * @param { number } index 
 * @param { string } keyword 
 * @returns { Promise }
 */
const crawlEachPage = async(url, index, keyword) => {
    return await getHTML(url, index, keyword).then((html) => parsing(html));
}
/**
 * crawl job korea with keyword, deadline,
 * and show the final results
 * @param { string } keyword 
 */
const crawlPages = async(keyword) => { 
    const promises = global.jobs.map((url, index) => crawlEachPage(url, index, keyword));
    await Promise.all(promises)
    .then(() => {
        return global.db.filter(FnDueDate);
    })
    .then(result => {
        console.log(result.getAll());
        console.log(`total offer number: ${result.length()}`);
    });
}

module.exports = {
    crawlPages
}