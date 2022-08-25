const HashMap = require('./util/stl.js');

/**
 * @typedef { Object } global
 * @property { string } url - 크롤링 할 url을 페이지 수 만큼 저장
 * @property { Date } deadline - 오늘 기준 데드라인 n일 날짜 
 * @property { HashMap<string, Object> } db - 크롤링 한 결과가 저장될 곳 
 */
const global = {};


const initializer = (deadline, pages) => {
    initializeJobsArray(pages);
    initializeDeadline(deadline);
    initializeDatabase();
}

/**
 * @param { number } pages - how many pages to crawl?
 */
const initializeJobsArray = (pages) => {
    const jobs = [];
    for(let i = 0; i < pages; i++){
        jobs.push(`https://www.jobkorea.co.kr/Search/?stext=`);
    }
    global.jobs = jobs;
}

/**
 * 오늘 + sparetime = deadline
 * ex. 2022/09/01 + 7 = 2022/09/08(=deadline)
 * @param { number } sparetime
 */
const initializeDeadline = (sparetime) => {
    let deadline = new Date();
    deadline.setDate(deadline.getDate()+Number(sparetime));

    global.deadline = deadline;
}

const initializeDatabase = () => {
    let hashMap = new HashMap();
    global.db = hashMap;
}

module.exports = {
    global,
    init:function(deadline, pages){
        initializer(deadline, pages);
    }
}