import { Component, inject, input, Input, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MenuItemDto } from "@datum/models";
import { LocalStorageService } from "@datum/services";
import { Observable, of } from "rxjs";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<ul class="navbar-nav me-auto mb-2 mb-lg-0">
  <li 
    class="nav-item"
    *ngFor="let menuItem of menuItems$ | async"
    [class.dropdown]="menuItem.submenu?.length">

    <!-- Not a page -->
    <span class="nav-link" 
          *ngIf="!menuItem.isPage"
          [class.active]="isMenuActive(menuItem.menuValue)">
      {{ menuItem.menuValue }}
    </span>

    <!-- Page with link -->
    <a class="nav-link"
       
       *ngIf="menuItem.isPage && menuItem.url"
       [routerLink]="menuItem.url">
      {{ menuItem.menuValue }}
    </a>

    <!-- Recursive submenu -->
    <div class="dropdown-menu" *ngIf="menuItem.submenu">
      <app-main-menu [menuItems$]="menuItem.submenu"></app-main-menu>
    </div>
  </li>
</ul>

   

    `,
styles: [`
/* Display menu horizontally */
.sidebar nav {padding :0px !important;}
ul.navbar-nav {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem; /* space between menu items */
}

/* Make nav items inline */
.nav-item {
  position: relative;
}
.navbar {padding:0;}
/* Styling for nav links */
.nav-link {
  color: white;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  
}

/* Optional: Hover effect */

/* Nested dropdowns */
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
 flex: wrap;
  min-width: 6rem;

  
  z-index: 1000;

}
  .dropdown-menu ul {
 
  padding: 0.3rem;
}
  .nav-item  span:hover > a, .nav-item a:focus {
  color: inherit;
}
  


 .nav-item:hover > .dropdown-menu {
  display: block;
  flex-direction: row  ;
  flex: wrap;
  left: 0;
 
}
  .nav-item:hover > .dropdown-menu  .nav-item:hover > .dropdown-menu ul{
  display: block  ;
  position: absolute;
  flex-direction: column;  ;
  flex: wrap;
  left: 0;
  top: 100%;

  color: white;
 
  
}
   .nav-item:hover > .dropdown-menu  .nav-item:hover > .dropdown-menu .nav-item:hover > .dropdown-menu {
  
  left: 100%;
  top: 0;
}

/* Show class can be used to force visibility */
.dropdown-menu.show {
  display: block;
}

  `]})
export class MainMenuComponent    {

  private localStorageService = inject( LocalStorageService);
    private _APP_MENU$ : Observable<MenuItemDto[]> = of([]);
    currentPagename = 'mainApp';

      private _menuItems$: Observable<MenuItemDto[]> = of([]);


   @Input()
  set menuItems$(value: MenuItemDto[] | Observable<MenuItemDto[]> | undefined) {
    this._menuItems$ = Array.isArray(value)
    ? of(value)
    : value instanceof Observable
    ? value
    : of([]);this._menuItems$ = Array.isArray(value)
      ? of(value)
      : value instanceof Observable
      ? value
      : of([]);
  }
   get menuItems$(): Observable<MenuItemDto[]> {
    return this._menuItems$;
  }


  constructor() {
    if (this.localStorageService.getItem('menuItems')) {
      this._menuItems$ = of(JSON.parse(this.localStorageService.getItem('menuItems')) || []);
    }

    this.menuItems$.subscribe(items => {
      items.forEach(item => {
       // console.log(item.menuValue);
      });
    });
  }

  isMenuActive(menutext: string) {
    return menutext?.toLowerCase() === this.currentPagename;
  }

  protected title = 'mainMenu';
  protected menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Inventory', link: '/inventoryApp' },
    { label: 'General', link: '/generalApp' },
    { label: 'Financial', link: '/financialApp' }
  ];
}