import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LocalStorageService } from "@datum/services";
import { ShortcutMenuDto } from "@datum/models";

@Component({
  selector: 'app-quick-menu',
  imports:[CommonModule],
  template: `
  <aside class="shortcutbar">
  <nav class="navbar navbar-expand-lg  "  >
  
    

    <div class="collapse navbar-collapse" id="navbarshorcutContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
  <li class="nav-item" *ngFor="let smenu of _shortcutmenu">
    <a class="nav-link" [href]="smenu.url">{{ smenu.menuText }}</a>
  </li>
</ul>
    </div>
  </nav>
</aside>
`,
styles: [`
  .shortcutbar{
  background: #ddd}
  .shortcutbar ul { background-color: transparent !important; border-width:0px}
.shortcutbar ul > li {
border-right: 1px dashed #fafafa
 }
  .navbar{ padding:0}
  `]})
export class QuickMenuComponent implements OnInit {

  localstorageService = inject(LocalStorageService)
   _shortcutmenu: ShortcutMenuDto[] = [];

  ngOnInit(): void {
    const shortcutmenuObj = JSON.parse(this.localstorageService.getItem('shortcutMenu'));
  this._shortcutmenu = shortcutmenuObj?.result || [];
  }
  
}