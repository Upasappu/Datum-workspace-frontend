import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntry } from './entry';
import { NxWelcome } from './nx-welcome';
import { remoteRoutes } from './entry.routes';
import { StoreComponent } from './+Tutorial/+store/store.component';
import { AuthloginComponent } from './authlogin/authlogin.component';
import { LoginService } from '../../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NxWelcome, StoreComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), AuthloginComponent],
  providers: [LoginService],
})
export class RemoteEntryModule {}
