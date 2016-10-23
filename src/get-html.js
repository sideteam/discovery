import request from 'request';
import DOMParser from 'dom-parser';

const getHTML = url => new Promise( ( resolve, reject ) => {
	request( {
		url,
	}, ( error, response, body ) => {
		if ( error ) {
			reject( error );
		}
		resolve( body );
	} );
} );

const getMeteorSourceHtml = ( url, scripts ) => new Promise( ( resolve, reject ) => {
	let match = false;
	scripts.forEach( ( script ) => {
		const srcAttr = script.getAttribute( 'src' );
		if ( srcAttr && srcAttr.indexOf( 'meteor_js_resource=true' ) !== -1 ) {
			match = true;
			request(
				{ url: `${url}${srcAttr}` },
				( error, response, body ) => {
					if ( error ) reject( error );
					resolve( body );
				}
			);
		}
	} );
	if ( !match ) reject( new Error( 'No corresponding node for meteor src' ) );
} );

const getMeteorHtml = url => new Promise( ( resolve, reject ) => {
	getHTML( url )
	.then( ( res ) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString( res, "text/xml" );
		const scripts = doc.getElementsByTagName( 'script' );
		getMeteorSourceHtml( url, scripts )
		.then( resolve );
	} )
	.catch( reject );
} );

export { getMeteorHtml, getHTML };
