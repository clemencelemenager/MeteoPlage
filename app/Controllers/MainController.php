<?php

namespace App\Controllers;

use App\Controllers\CoreController;

// =========================================================
// #MAINCONTROLLER
// =========================================================

class MainController extends CoreController
{
    
    /**
     * Function to display home page
     * 
     * @var $viewVars [array] Optionnal - Set of informations used for page content 
    */
    public function home() { 
        $this->show('main/home');
    }

    /**
     * Function to display About
     * 
     * @var $viewVars [array] Optionnal - Set of informations used for page content 
    */
    public function about() {
        $this->show('main/about');
    }
    

    
}