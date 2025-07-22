import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItemDto, ShortcutMenuDto } from '@datum/models';
import { AppHeaderComponent } from '@datum/ui';
import { DataSharingService, LocalStorageService } from '@datum/services'; 
import { CoreService } from '../../services/core.service';
import { firstValueFrom } from 'rxjs';
import { ENDPOINTCONSTANT } from '@datum/constants';


@Component({
  selector: 'app-coreApp-entry',
  standalone: false,
  template: `
  <app-header></app-header>
  <main class="content">
    <router-outlet></router-outlet> 
    </main>
  <!-- <ul class="remote-menu">
  <li><a routerLink="/">Home</a></li>
  <li><a routerLink="inv">InventoryApp</a></li>
  <li><a routerLink="general">GeneralApp</a></li>
  <li><a routerLink="finance">FinancialApp</a></li>
</ul> -->

`,
})
export class RemoteEntry  { 

  localStorageService = inject(LocalStorageService);
  coreservice = inject(CoreService);

    private menuItems = [] as MenuItemDto[];
          private datasharingService = inject(DataSharingService);
              private route = inject(ActivatedRoute);


  constructor() {
    if (this.datasharingService.sharedData && this.datasharingService.sharedData.length > 0) {
      this.localStorageService.setItem('menuItems', this.datasharingService.sharedData);
    } else {
      // Do not clear menuItems if sharedData is empty or undefined
    //  console.log(this.localStorageService.getItem('menuItems'));
    }
    if(this.localStorageService.getItem('shortcutMenu')){
      this.menuItems = JSON.parse(this.localStorageService.getItem('shortcutMenu') || '[]');
    } else {  
            this.fetchSecondaryMenu();
    }

     
  }

  //  ngOnInit(): void {
  //   // console.log(this.localStorageService.getItem('menuItems'));
  //  }
  //   // this.route.queryParams.subscribe(params => {
  //   //   this.menuItems = JSON.parse(params['menu']);
  //   //   console.log(this.menuItems ); // 123
  //   //   console.log(params['']); // Niyas
  //   // });
  //   //  RemoteEntry.menuItems = this.datasharingService.sharedData || [];
  //   // console.log(RemoteEntry.menuItems);
 
    async fetchSecondaryMenu() {
    try {
       await this.coreservice.fetch<ShortcutMenuDto>(ENDPOINTCONSTANT.FILLSHORTCUTMENU).subscribe({
          next: (data) =>{ 
            this.localStorageService.setItem('shortcutMenu', JSON.stringify(data.data));
            console.log('Secondary menu data:', data); },
          error: (err) => {
            console.error('Error fetching secondary menu', err);
          },
          complete: () => {
            console.log('Secondary menu fetched successfully');
          }
        })
     
      // if (res?.data?.result) {
      //   try {
      //     localStorage.setItem('secondary-menu', JSON.stringify(res.data.result));
          
      //   } catch (e) {
      //     console.error('Error setting secondary-menu in localStorage', e);
      //   }
      // }
     
    } catch (err) {
      console.error('Error fetching secondary menu', err);
    }
   
  }
}
