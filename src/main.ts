import { argv } from 'process';
import { init } from './init';
import { crawlPages } from  './crawl';
import { parseArgs } from './util/parser';

//[keyword, deadline, pages]
const main = async (args: (string | number)[]) => {
    init(args);
    crawlPages();
}

main(parseArgs(argv));