const HashMap = require('./util/util_stl.js');


const global = {};


const initializer = (deadline, pages) => {
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

module.exports = {
    global,
    init:function(deadline, pages){
        initializer(deadline, pages);
    }
}