fetch( './config/config.json' )
    .then( parseResponse )
    .then( init );

function parseResponse( response ) {
    return response.json();
}

function getRandomMember( arr ) {
    return arr[ Math.floor( Math.random() * arr.length ) ];
}

function getIdFromTimestamp() {
    return ( new Date().getTime() + '' ).substring( 3 );
}

function getRandomLogObject() {
    var priorities = [ 1,2,3,4,5 ];
    var messages = [
        "Don't forget to do the needful.",
        "Fix the bugs... or don't",
        "Delete old/unnecessary code"
    ];
    var authors = [
        "John Doe",
        "Jesse Ray",
        "Jane Smith",
        "Ada Badlace"
    ];
    var timestamps = [
        new Date( 'Dec 29 1989' ).getTime(),
        new Date( 'Nov 17 1986' ).getTime(),
        new Date( 'Jun 30 1990' ).getTime()
    ];
    
    return {
        priority: getRandomMember( priorities ),
        message: getRandomMember( messages ),
        author: getRandomMember( authors ),
        timestamp: getRandomMember( timestamps ),
    }
}

function init( config ) {
    /* -------------------------------------------------- */
    /* INITIALIZATION */
    /* -------------------------------------------------- */
    // INIT FIREBASE INSTANCE
    if ( !firebase.apps.length ) {
        firebase.initializeApp( config );
    }

    // ALIAS DATABASE AS `db`
    var db = firebase.database();


    /* -------------------------------------------------- */
    /* TEST: WRITE TO TABLE */
    /* -------------------------------------------------- */
    var ts = new Date().getTime();
    var id = getIdFromTimestamp();

    // WRITE TO TABLE
    db.ref( 'users/' + id )
        .set( {
            name: 'Test User ' + id,
            email: id + '@email.com',
            time_stamp: ts
        } );


    /* -------------------------------------------------- */
    /* TEST: READ */
    /* -------------------------------------------------- */
    db.ref( '/users' )
        .on( 'value', function( data ) {
            console.log( data.val() );
        } );


    /* -------------------------------------------------- */
    /* TEST: SEQUENTIAL WRITE */
    /* -------------------------------------------------- */
    for( var i = 0, x = 10; i < x; i++ ) {
        setTimeout( function() {
            var obj = getRandomLogObject();
            var id = getIdFromTimestamp();

            db.ref( '/logs/' + id  )
                .set( obj );
        }, 50 );
    }
} // init()
