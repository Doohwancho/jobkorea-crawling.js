const axios = require('axios'); //to crawl html page
const cheerio = require('cheerio'); //light version of jquery

const jobs = [];
let deadline;

const initializer = (pages, sparetime) => {
    initializeJobsArray(pages);
    initializeDeadline(sparetime);
}

const initializeJobsArray = (pages) => {
    for(let i = 0; i < pages; i++){
        jobs.push(`https://www.jobkorea.co.kr/Search/?stext=`);
    }
}

const initializeDeadline = (sparetime) => {
    deadline = new Date();
    deadline.setDate(deadline.getDate()+sparetime);
}

const getHTML = async(url, keyword) => {
    try { 
        //tip! await을 ()한번 더 감싸기!
        //&careerType=1%2C4 for 신입 + 경력 무관
        const html = (await axios.get(url+encodeURI(keyword)+'&careerType=1%2C4')).data; 
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
        const href = `https://www.jobkorea.co.kr${$(node).find('.post-list-info > a').attr('href')}`;

        jobs.push({
            jobTitle, company, experience, education, regularYN, region, dueDate, etc, href
        });
    })

    return jobs;
}

const dateRegex = (date) => {
    const regex = /(\d{2}.\d+)/g;
    return date.match(regex);
}

const regexFormatToDateFormat = (monthAndDate) => {
    let dueDate = new Date();
    dueDate.setMonth(monthAndDate[0]-1);
    dueDate.setDate(monthAndDate[1]);
    dueDate.setHours(23);
    dueDate.setMinutes(59);
    return dueDate;
}

const filterDueDate = (x) => {
    if(typeof x !== 'string'){
        const regexed = dateRegex(x.dueDate);
        if(regexed !== null){
            const targetDate = regexFormatToDateFormat(regexed[0].split('/'));
            const today = new Date();
        
            return (targetDate - today > 0) && (deadline - targetDate > 0);   
        }
    }
}

const getJobEachPage = async(url, keyword) => {
    return await getHTML(url, keyword).then((html) => parsing(html));
}


const getJobIteratePages = async(keyword) => {
    const promises = jobs.map(url => getJobEachPage(url, keyword));
    await Promise.all(promises).then(async (arr) => {
        return arr[0].filter(filterDueDate);
    })
    .then(rst => {
        console.log(rst);
        console.log(`total offer number: ${rst.length}`);
    });
}

const main = async(keyword, pages, sparetime) => {
    initializer(pages, sparetime);
    getJobIteratePages(keyword);
}

main('spring', 1, 3); //keyword, pages, deadline
