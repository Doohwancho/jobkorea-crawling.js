// let dueDate = '~07/29(일)';


// const dateRegex = (date) => {
//     const regex = /(\d{2}.\d+)/g;
//     const monthAndDate = date.match(regex)[0].split('/');

//     console.log(monthAndDate);

//     let dueDate = new Date();
//     dueDate.setMonth(monthAndDate[0]-1);
//     dueDate.setDate(monthAndDate[1]);
//     dueDate.setHours(23);
//     dueDate.setMinutes(59);

//     return dueDate;
// }

// const regexedDueDate = dateRegex(dueDate);
// let today = new Date();

// console.log(regexedDueDate - today > 0);


// let getXDaysFromToday = (x) => {
//     // a (not very efficient) oneliner
//     let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
//     console.log(`Yesterday (oneliner)\n${yesterday}`);

//     // a function call
//     yesterday = ( function(){this.setDate(this.getDate()-1); return this} )
//                 .call(new Date);
//     console.log(`Yesterday (function call)\n${yesterday}`);

//     // an iife (immediately invoked function expression)
//     yesterday = function(d){ d.setDate(d.getDate()-1); return d}(new Date);
//     console.log(`Yesterday (iife)\n${yesterday}`);

//     // oneliner using es6 arrow function
//     yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
//     console.log(`Yesterday (es6 arrow iife)\n${yesterday}`);

//     // use a method
//     const getYesterday = (dateOnly = false) => {
//         let d = new Date();
//         d.setDate(d.getDate() - 1);
//         return dateOnly ? new Date(d.toDateString()) : d;
//     };  
// }


// let today = new Date();

// today.setDate(today.getDate()+7);
// console.log(today);