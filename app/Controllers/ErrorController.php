<?php

namespace App\Controllers;


class ErrorController extends CoreController 
{
    /**
     * Method for error page 404
     *
     * @return void
     */
    public function err404() {
        header('HTTP/1.0 404 Not Found');

        $this->show('error/err404');
    }

    /**
     * Method for 403 page 
     *
     * @return void
     */
    public static function err403() {
        http_response_code(403);
        echo "403 Forbidden - vous n'avez pas accès à cette page";
        exit();  
    }
}