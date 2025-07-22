import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from "./mainMenu.component";
import { QuickMenuComponent } from "./quickMenu.component";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NotificationdetailsComponent } from 'apps/core/coreApp/src/app/notificationdetails/notificationdetails.component';
import { DataSharingService } from 'libs/services/src/utils/datasharing.service';
import { CoreService } from 'apps/core/coreApp/src/services/core.service';
import { APP_URL } from 'libs/utils/src/environments/environment';
import { ENDPOINTCONSTANT } from 'libs/constants/src/lib/endpoint.constants';
import { SignalRService } from 'libs/services/src/utils/SignalR.service.ts.service';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MainMenuComponent, QuickMenuComponent],
  template: `
  
    <!--<h5 class="mb-4">ERP Menu</h5>
    <ul class="nav flex-column">
      <li class="nav-item"><a class="nav-link text-white" routerLink="/">Home</a></li>
      <li class="nav-item"><a class="nav-link text-white" routerLink="auth">LoginApp</a></li>
      <li class="nav-item"><a class="nav-link text-white" routerLink="">CoreApp</a></li>
      <li class="nav-item"><a class="nav-link text-white" routerLink="/dashboard">Dashboard</a></li>
      <li class="nav-item"><a class="nav-link text-white" routerLink="/inventory">Inventory</a></li>
      <li class="nav-item"><a class="nav-link text-white" routerLink="/finance">Finance</a></li>*/
    </ul>-->
    <!-- Main Header Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark hed">
      <div class="container-fluid">
        <!-- Logo/Title -->
        <a class="navbar-brand fw-bold text-white" href="#">Datum Innovation</a>

        <!-- Menu Links -->
        <div class="collapse navbar-collapse">
          <!--  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active text-white" href="#">Orders</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#">To Invoice</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#">Reporting</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#">Configuration</a></li>
      </ul> -->

      <!-- Right Side Icons and User -->
      <div class="d-flex align-items-center gap-3 ms-auto d-flex align-items-center">

       <!-- Notification Bell -->
    <div class="nav-item dropdown me-3">
      <a
        class="nav-link position-relative"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-bell-fill text-white fs-5"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          3
          <span class="visually-hidden">unread notifications</span>
        </span>
      </a>
      <!-- Dropdown Menu -->
      <ul class="dropdown-menu dropdown-menu-end shadow">
        <li><h6 class="dropdown-header">Notifications</h6></li>
       
       <li *ngFor="let notificationData of notificationData" (click)="viewNotification(notificationData)">
  <a class="dropdown-item" style="cursor: pointer;">{{ notificationData.message }}</a>
</li>


        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item text-primary" href="#">View all</a></li>
      </ul>
    </div>

    
      <!-- User Dropdown -->
      <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown">
          Admin
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="#">Logout</a></li>
        </ul>
      </div>
        <!-- Notification Icons 
        <span class="text-white">
          <i class="bi bi-bell"></i> <span class="badge bg-success">27</span>
        </span>
        <span class="text-white">
          <i class="bi bi-envelope"></i> <span class="badge bg-info">2</span>
        </span>

        <!-- User Dropdown -->
            <div class="dropdown">
              <button
                class="btn btn-sm btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Demo Company
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">My Profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
            -->

            <!-- Avatar 
        <img src="https://via.placeholder.com/30" class="rounded-circle" alt="User" />-->
          </div>
        </div>
      </div>
    </nav>

    <!--  Main menu -->
    <aside class="sidebar">
    <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <div class="sf-icon me-2"></div>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
        Main menu  <span class="navbar-toggler-icon"></span>
        </button>

      <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarshorcutContent"
    >
     Quick <span class="navbar-toggler-icon"></span>
    </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <app-main-menu></app-main-menu>
<!-- In AppHeaderComponent template -->

          
        </div>
        </div>
        
      </nav>
    </aside>
    <!-- main menu end here -->

    <!-- Quick Menu -->
    <app-quick-menu></app-quick-menu>
    <!-- Quick Menu End -->
    
  `,
  styles: [
    `
      .hed {
        background: #333 no-repeat;
        background-position: -0px -120px;
        background-size: cover;
      }
      .sidebar   { 
        display: block;
       
        
        text-decoration: none;
        background-color: #3253a7;
      }
        .sidebar ul {
       
        background-color: transparent;
      }
     
.navbar-nav , ul , .dropdown-menu, .nav-item > .dropdown-menu ul   { 
        text-decoration: none;
        background-color: #5172c5;
      }
       

    /* Basic horizontal layout */


/* Show dropdown on hover (desktop only) */
@media (min-width: 992px) {
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu .dropdown-menu {
    top: 0;
    left: 100%;
  }
}

/* Always show nested submenu in mobile */
@media (max-width: 991.98px) {
  .dropdown-menu {
    position: static;
    display: block;
    border: none;
    padding-left: 1rem;
    box-shadow: none;
  }

  .navbar-nav {
    flex-direction: column;
  }
}

    `,
  ],
})
export class AppHeaderComponent {

  notificationData: any;

  private dataSharingService = inject(DataSharingService);
  private coreService = inject(CoreService);
  constructor(private signalRService: SignalRService,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
     this.signalRService.startConnection();
    // Subscribe to the notifications observable
    this.signalRService.notifications$.subscribe((msgs) => {
      this.notificationData = msgs;
    });
    this.loadNotifications();
  }


  loadNotifications(): void {
    const apiUrl = `${ENDPOINTCONSTANT.FETCHNOTIFICATION}`;
    this.coreService.fetch<any[]>(apiUrl).subscribe(
      (data) => {
        this.notificationData = data;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  viewNotification(notificationData: any): void {
    this.dataSharingService.sharedData = notificationData;
    this.router.navigate(['/notificationdetails']);
  }
}