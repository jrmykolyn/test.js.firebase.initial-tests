fetch( './config/config.json' )
    .then( parseResponse )
    .then( init );

function parseResponse( response ) {
    return response.json();
}

function init( config ) {
    // INIT FIREBASE INSTANCE
    if ( !firebase.apps.length ) {
        firebase.initializeApp( config );
    }

    // ALIAS DATABASE AS `db`
    var db = firebase.database();

    /* -------------------------------------------------- */
    /* TEST: WRITE TO TABLE */
    /* -------------------------------------------------- */
    var id = ( new Date().getTime() + '' ).substring( 3 );

    // WRITE TO TABLE
    db.ref( 'users/' + id )
        .set( {
            name: 'Test User ' + id,
            email: id + '@email.com'
        } );
}
