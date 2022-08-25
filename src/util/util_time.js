const { global } = require('../init');

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

module.exports = {
    filterDueDate 
}