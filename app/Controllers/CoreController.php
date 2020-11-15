<?php

namespace App\Controllers;

use AltoRouter;

abstract class CoreController
{
    
    // ===============================================================
    // PROPERTIES
    // ===============================================================
    
    /**
     * @var Altorouter Router for the app
     */
    private $router;

    /**
     * @var array Match of Altorouter
     */
    private $match;

    /**
     * @var string Current route
     */
    private $currentRouteName;


    // ===============================================================
    // CONSTRUCT
    // ===============================================================

    /**
    * Constructor of CoreController
    */
    public function __construct(AltoRouter $router, $match)
    {
        // Store router & match in controller 
        $this->router = $router;
        $this->match = $match;

        // If match, get route for current page
        if ($match !== false) {
            $this->currentRouteName = $this->match['name'];
        }
        // Else (if 404), current page is null
        else {
            $this->currentRouteName = null;
        }

        // Launch controls for permissions & access
        $this->checkPermissions();
        // $this->checkCsrfToken();
    }

    // ===============================================================
    // METHODS
    // ===============================================================

    /**
     * Display view page with needed datas
     * 
     * @param string $viewName Name of view file
     * @param array $viewVars Array of data to transmit to view
     * @return void
     */
    protected function show(string $viewName, $viewVars = []) 
    {
        $router = $this->router;

        // Common datas for all views : current page, root url for assets, root url for project
        $viewVars['currentPage'] = $viewName; 
        $viewVars['assetsBaseUri'] = $_SERVER['BASE_URI'] . '/assets/';
        $viewVars['baseUri'] = $_SERVER['BASE_URI'];
        $viewVars['currentURL'] = $_GET['_url'] ?? "/" ;

        // Each key of the array $viewVars become a variable :
        extract($viewVars);
       
        // Build the page to display
        require_once __DIR__.'/../Views/header.tpl.php';
        require_once __DIR__.'/../Views/'.$viewName.'.tpl.php';
        require_once __DIR__.'/../Views/footer.tpl.php';
    }

    /**
     * Check permissions to access a route 
     *
     * @return void
     */
    private function checkPermissions()
    {
        // Access Control List - List of routes and corresponding authorizations
        require __DIR__. "/../Utils/acl.php";

         // If current route belong to ACL list, get authorized roles and check acess
         if (array_key_exists($this->currentRouteName, $acl)) :
            $authorizedRoles = $acl[$this->currentRouteName];
            $this->checkAuthorization(($authorizedRoles));
        endif;                   
    }

    /**
     * Check authorized roles to access a view 
     *
     * @param array $roles : authorized roles
     * @return void
     */
    public function checkAuthorization($roles = [])
    {
        // If a user is connected, get his role
        if( isset( $_SESSION['connectedUser'] ) ) 
        {
            $userRole = $_SESSION["connectedUser"]->getRole();

            // If his role is authorized in ACL, continue script
            if (in_array($userRole, $roles)) {
                return;
            }
            // If unauthorized, stop
            else {
                ErrorController::err403();
            }
        }
        // If not connected, relocate to login page and stop script
        else {
            $this->redirectToRoute('appuser-login');
            exit();
        }            
    }

    /**
     * Relocate to page
     *   
     * @param string $routeName Name of route to which relocate (Altorouter)
     * @param array $params Dynamic params for route
     *
     * @return void
     */
    protected function redirectToRoute(string $routeName, array $params = [])
    {
        header('Location: '.$this->router->generate($routeName, $params));
        exit;
    }



}