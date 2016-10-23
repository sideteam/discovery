import { getHTML, getMeteorHtml } from './get-html';
import { getCollections, getMethods } from './parse-meteor';

const args = process.argv.slice( 2 );

const cmdDic = new Map( [
	[ 'getHtml', getHTML ],
	[ 'getMeteorHtml', getMeteorHtml ],
	[ 'getCollections', getCollections ],
	[ 'getMethods', getMethods ],
] );

cmdDic.get( args.shift() )( ...args )
.then( console.log )
.catch( console.log );
