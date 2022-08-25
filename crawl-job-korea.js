/* dependency */
const axios = require('axios'); //to crawl html page
const cheerio = require('cheerio'); //light version of jquery
const HashMap = require('./custom_stl.js');


/* initialize */
const global = {};

const initializer = (pages, deadline) => {
    initializeJobsArray(pages);
    initializeDeadline(deadline);
    initializeDatabase();
}

const initializeJobsArray = (pages) => {
    const jobs = [];
    for(let i = 0; i < pages; i++){
        jobs.push(`https://www.jobkorea.co.kr/Search/?stext=`);
    }
    global.jobs = jobs;
}

const initializeDeadline = (sparetime) => {
    let deadline = new Date();
    deadline.setDate(deadline.getDate()+Number(sparetime));

    global.deadline = deadline;
}

const initializeDatabase = () => {
    let hashMap = new HashMap();
    global.db = hashMap;
}


/* function */
const getHTML = async(url, index, keyword) => {
    try { 
        //tip! await을 ()한번 더 감싸기!
        //&careerType=1%2C4 - 신입 + 경력 무관
        //&tabType=recruit - given by default
        //&Page_No - page number to crawl multiple pages
        const html = (await axios.get(url+encodeURI(keyword)+`&careerType=1%2C4&tabType=recruit&Page_No=${index+1}`)).data; 
        return html
    } catch(e) {
        console.log(e);
    }
}

const parsing = (page) => {
    const $ = cheerio.load(page);
    const $jobList = $('.list-default .post');
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

        global.db.put(
            jobTitle, 
            { 
                company, 
                experience, 
                education, 
                regularYN, 
                region, 
                dueDate, 
                etc, 
                href
            });
    })

    return global.db;
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
        if(x.dueDate === '상시채용') return true;
        const regexed = dateRegex(x.dueDate);
        if(regexed !== null){     
            const targetDate = regexFormatToDateFormat(regexed[0].split('/'));
            const today = new Date(); 
            return ((targetDate - today > 0) && (global.deadline - targetDate > 0));   
        }
    }
}

const getJobEachPage = async(url, index, keyword) => {
    return await getHTML(url, index, keyword).then((html) => parsing(html));
}

const getJobIteratePages = async(keyword) => {
    const promises = global.jobs.map((url, index) => getJobEachPage(url, index, keyword));
    await Promise.all(promises)
    .then(() => {
        return global.db.customFilter(filterDueDate);
    })
    .then(result => {
        console.log(result.getAll());
        console.log(`total offer number: ${result.length()}`);
    });
}

const main = async([keyword, deadline = 7, pages = 10]) => {
    console.log(deadline);
    initializer(pages, deadline);
    getJobIteratePages(keyword);
}

let argv = process.argv.slice(2);
main(argv);


