import _ from 'lodash';
import { getMeteorHtml } from './get-html';

const parseForCollection = ( txt ) => {
	const rawCollections = txt.match( /Mongo.Collection\("[a-zA-Z]+"\)/g );
	const ret = _.map( rawCollections, rawCollection => rawCollection.split( '"' )[1] );
	console.log( ret );
	return ret;
};

const getCollections = url => new Promise( ( resolve, reject ) => {
	getMeteorHtml( url )
	.then( ( res ) => {
		parseForCollection( res );
		resolve( 1 );
	} )
	.catch( reject );
} );

export { getCollections };
