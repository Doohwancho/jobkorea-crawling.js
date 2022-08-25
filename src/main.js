const { init } = require('./init');
const { crawlPages } = require('./crawl');


const main = async([keyword, deadline = 7, pages = 10]) => {
    init(deadline, pages);
    crawlPages(keyword);
}

let argv = process.argv.slice(2);
main(argv);