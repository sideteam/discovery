import _ from 'lodash';
import { getMeteorHtml } from './get-html';

const parseForMeteorItem = ( txt, content ) => {
	const rawCollections = txt.match( new RegExp( `${content}\\("[a-zA-Z]+"\\)`, 'g' ) );
	const ret = _.map( rawCollections, rawCollection => rawCollection.split( '"' )[1] );
	console.log( ret );
	return ret;
};

const getMethods = url => new Promise( ( resolve, reject ) => {
	getMeteorHtml( url )
	.then( ( res ) => {
		parseForMeteorItem( res, 'Meteor.call' );
		resolve( 1 );
	} )
	.catch( reject );
} );

const getCollections = url => new Promise( ( resolve, reject ) => {
	getMeteorHtml( url )
	.then( ( res ) => {
		parseForMeteorItem( res, 'Mongo.Collection' );
		resolve( 1 );
	} )
	.catch( reject );
} );

export { getCollections, getMethods };
