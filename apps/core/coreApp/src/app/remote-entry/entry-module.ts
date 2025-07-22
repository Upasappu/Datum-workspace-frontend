import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntry } from './entry';
import { NxWelcome } from './nx-welcome';
import { remoteRoutes } from './entry.routes';
import { AppHeaderComponent,MainMenuComponent,QuickMenuComponent} from '@datum/ui'; // Adjust the import path as necessary
import { CoreService } from '../../services/core.service';
@NgModule({
  declarations: [RemoteEntry, NxWelcome],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes),AppHeaderComponent, MainMenuComponent, QuickMenuComponent],
  providers: [CoreService],
})
export class RemoteEntryModule {}
