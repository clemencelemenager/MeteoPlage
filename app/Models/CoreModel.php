<?php

namespace App\Models;

/**
 * Model for an author
 */

class CoreModel 
{ 

    // =============================================================== 
    // Properties
    // =============================================================== 

    public $id;


    // ===============================================================
    // CONSTRUCT
    // =============================================================== 

    /**
     * Function construct to create an object 
     * 
     * @param [string] $id    
     * 
     */
    public function __construct($_id) 
    {
        $this->id = $_id;
    }


}
