import { getHTML, getMeteorHtml } from './get-html';
import { getCollections } from './parse-meteor';

const args = process.argv.slice( 2 );

const cmdDic = new Map( [
	[ 'getHtml', getHTML ],
	[ 'getMeteorHtml', getMeteorHtml ],
	[ 'getCollections', getCollections ],
] );

cmdDic.get( args.shift() )( ...args )
.then( console.log )
.catch( console.log );
