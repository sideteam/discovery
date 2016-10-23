import _ from 'lodash';
import { getMeteorHtml } from './get-html';

const parseForCollection = ( txt ) => {
	const rawCollections = txt.match( /Mongo.Collection\("[a-zA-Z]+"\)/g );
	const ret = _.map( rawCollections, rawCollection => rawCollection.split( '"' )[1] );
	console.log( ret );
	return ret;
};

const getMethods = url => new Promise( ( resolve, reject ) => {
	console.log( url );
	if ( !url ) reject( 1 );
	resolve( 0 );
} );

const getCollections = url => new Promise( ( resolve, reject ) => {
	getMeteorHtml( url )
	.then( ( res ) => {
		parseForCollection( res );
		resolve( 1 );
	} )
	.catch( reject );
} );

export { getCollections, getMethods };
