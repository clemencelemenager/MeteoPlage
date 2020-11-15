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
        $this->show('about');
    }

    /**
     * Function to display Contact
     * 
     * @var $viewVars [array] Optionnal - Set of informations used for page content 
    */
    public function contact() {
        $this->show('contact');
    }
    
    /**
     * Function to display blog 
     * 
     * @var $viewVars [array] Optionnal - Set of informations used for page content 
    */
    public function blog() { 
        $this->show('blog');
    }

    /**
     * Function to display admin 
     * 
     * @var $viewVars [array] Optionnal - Set of informations used for page content 
    */
    public function register() { 
        $this->show('register');
    }
    

}