

<!-- MAIN NAV -->
<nav class="navbar navbar-expand-md navbar-light bg-light d-flex justify-content-between">
          
    <!-- LOGO -->    
    <a class="navbar-brand" href="<?=$baseUri?>/">
        Aller à...
        
    </a>

    <!-- MENU ITEMS -->

    <!-- Display text & burger menu on mobile screens -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> 
    Menu </button>

    <!-- Navbar collapsed on mobile screens -->
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav ">
            <li class="nav-item <?= $currentURL === '/' ? "active" : ""?>">
                <a class="nav-link" href="<?=$baseUri?>/">
                    Home
                </a>
            </li>
            <li class="nav-item <?= $currentURL === '/about' ? "active" : ""?>">
                <a class="nav-link" href="<?=$baseUri?>/about">
                    About
                </a>
            </li>
            
        </ul>
    </div>
</nav>


