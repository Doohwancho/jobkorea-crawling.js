const { global } = require('../init');

/**
 * change format from '~08/28(일)' -> ['08/28']
 * @param { string } date - Date object in string. ex. ~08/28(일) 
 * @returns { Array }
 */
const dateRegex = (date) => {
    const regex = /(\d{2}.\d+)/g;
    return date.match(regex);
}

/**
 * 1. change format of param from Array<string> to Date object
 * 2. set due date time to 23:59PM
 * @param { Array<string> } monthAndDate - ex. ['08','28']
 * @returns { Date }
 */
const regexFormatToDateFormat = (monthAndDate) => {
    let dueDate = new Date();
    dueDate.setMonth(monthAndDate[0]-1);
    dueDate.setDate(monthAndDate[1]);
    dueDate.setHours(23);
    dueDate.setMinutes(59);
    return dueDate;
}

/**
 * callback for HashMap.filter() 
 * filter by whether given time is within deadline
 * @param { Object } obj - global.db[keys]
 * @returns { Boolean } - if within the deadline, return true, else, return false
 */
const FnDueDate = (obj) => {
    if(typeof obj !== 'string'){
        if(obj.dueDate === '상시채용') return true;
        const regexed = dateRegex(obj.dueDate);
        if(regexed !== null){     
            const targetDate = regexFormatToDateFormat(regexed[0].split('/'));
            const today = new Date(); 

            return ((targetDate - today > 0) && (global.deadline - targetDate > 0));   
        }
    }
}

module.exports = {
    FnDueDate 
}