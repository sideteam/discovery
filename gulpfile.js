const gulp = require( 'gulp' );

gulp.task( 'copy', () => gulp.src(
	[
		'./src/**/*',
		'!./src/**/*.js',
	], { base: './src/' } )
	.pipe( gulp.dest( './lib/' ) )
);

gulp.task( "watching", () => {
	const watcher = gulp.watch(
		[
			'./src/**/*',
			'!./src/**/*.js',
		], [ 'copy' ] );
	watcher.on( 'change', ( event ) => {
		console.log( `File ${event.path} was ${event.type}, running tasks...` );
	} );

	return watcher;
} );

gulp.task( "watch", [ 'copy', 'watching' ] );

gulp.task( "build", [ 'copy' ] );
