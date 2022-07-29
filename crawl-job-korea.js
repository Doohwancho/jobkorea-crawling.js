const axios = require('axios'); //to crawl html page
const cheerio = require('cheerio'); //light version of jquery

const getHTML = async(keyword) => {
    try {
        const html = (await axios.get(`https://www.jobkorea.co.kr/Search/?stext=${encodeURI(keyword)}&careerType=1%2C4`)).data; //tip! await을 ()한번 더 감싸기!
        return html
    } catch(e) {
        console.log(e);
    }
}

const parsing = async(page) => {
    const $ = cheerio.load(page);
    const jobs = [];
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

const getJob = async(keyword) => {
    const html = await getHTML(keyword);
    const jobs = await parsing(html);
    console.log(jobs);
    console.log(jobs.length);
}

getJob('spring');