<?php
// #DEBUG - Display of all errors
error_reporting(E_ALL);


// ===============================================================
// AUTOLOAD FILES
// ===============================================================

require __DIR__ . "/../vendor/autoload.php";

// ===============================================================
// INIT SESSION
// ===============================================================

session_start();

// ===============================================================
// INIT ROUTER
// ===============================================================

$router = new AltoRouter();

/* If working repository is a subfile  */
if( array_key_exists('BASE_URI', $_SERVER) ) 
{
    // Set of the basepath for my router  
    $router->setBasePath($_SERVER['BASE_URI']);
}
// else, base uri is default value
else {
    $_SERVER['BASE_URI'] = '/';
}


// ===============================================================
// MAPPING ROUTES
// ===============================================================

require __DIR__ . "/../app/Utils/routes.php";


// ===============================================================
// MATCH
// ===============================================================

$match = $router->match();


// ===============================================================
// DISPATCHER
// ===============================================================

/* if url matches with a route, call controller & method set in mapping.*/

/* Instance of Altodispatcher to make dispatch */
$dispatcher = new Dispatcher($match, '\App\Controllers\ErrorController::err404');
/* Params for contructor : router & match */
$dispatcher->setControllersArguments( [$router, $match] );
/* Launch dispatch */
$dispatcher->dispatch();


