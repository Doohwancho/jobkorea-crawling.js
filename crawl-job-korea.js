const axios = require('axios'); //to crawl html page
const cheerio = require('cheerio'); //light version of jquery

const jobs = [];

const initializeMap = (pages) => {
    for(let i = 0; i < pages; i++){
        jobs.push(`https://www.jobkorea.co.kr/Search/?stext=`);
    }
}

const getHTML = async(url, keyword) => {
    try { 
        const html = (await axios.get(url+encodeURI(keyword)+'&careerType=1%2C4')).data; //tip! await을 ()한번 더 감싸기!
        return html
    } catch(e) {
        console.log(e);
    }
}

const parsing = (page) => {
    const $ = cheerio.load(page);
    const $jobList = $('.post');
    $jobList.each((idx, node) => {
        const jobTitle = $(node).find('.title:eq(0)').text().trim();
        const company = $(node).find('.name:eq(0)').text().trim();
        const experience = $(node).find('.exp:eq(0)').text().trim();
        const education = $(node).find('.edu:eq(0)').text().trim();
        const regularYN = $(node).find('.option > span:eq(2)').text().trim();
        const region = $(node).find('.long:eq(0)').text().trim();
        const dueDate = $(node).find('.date:eq(0)').text().trim();
        const etc = $(node).find('.etc:eq(0)').text().trim();

        jobs.push({
            jobTitle, company, experience, education, regularYN, region, dueDate, etc
        });
    })

    return jobs;
}


const getJobEachPage = async(url, keyword) => {
    return await getHTML(url, keyword).then((html) => parsing(html));
}


const getJobIteratePages = async(keyword) => {
    const promises = jobs.map(url => getJobEachPage(url, keyword));
    await Promise.all(promises);
    console.log(jobs);
    console.log(`total number of job offers: ${jobs.length}`);
}

const main = async(keyword, pages) => {
    initializeMap(pages);
    getJobIteratePages(keyword);
}

main('node', 2);

