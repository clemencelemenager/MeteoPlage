<?php


// ===============================================================
// MAPPING ROUTES
// ===============================================================

$router->map( 'GET'     , '/'           , 'App\Controllers\MainController::home'        , 'main-home'           );
$router->map( 'GET'     , '/about'      , 'App\Controllers\MainController::about'       , 'main-about'          );

