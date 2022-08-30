"use strict";
exports.__esModule = true;
var init = require('./init').init;
var crawlPages = require('./crawl').crawlPages;
var parser_1 = require("./util/parser");
// const main = async([keyword: string, deadline: number = 7, pages:number = 10]) => {
//     init(deadline, pages);
//     crawlPages(keyword);
// }
// console.log(process.argv)
/*
[
  '/usr/local/bin/node',
  '/Users/cho-cho/dev/tools/jobkorea-crawling.nodejs/src/main.js',
  'hello',
  '1'
]
*/
// console.log(typeof process.argv); //object but I want it string
var foo = process.argv;
var tmp = (0, parser_1.parseArgs)(foo);
console.log(tmp);
// console.log(tmp);
// console.log(typeof tmp[0]);
// console.log(typeof tmp[1]);
// console.log(typeof tmp[2]);
// main(tmp);
