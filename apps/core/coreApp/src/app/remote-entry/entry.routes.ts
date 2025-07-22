import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { NotificationdetailsComponent } from '../notificationdetails/notificationdetails.component';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationlistComponent } from '../notificationlist/notificationlist.component';
import { NotificationrecieverComponent } from '../notificationreciever/notificationreciever.component';

export const remoteRoutes: Route[] = [{ path: '', component: RemoteEntry 
            ,
            children: [
                  {
              path: 'inv',
              loadChildren: () =>
                import('inventoryApp/Module').then((m) => m!.RemoteEntryModule),
            },
          
            {
              path: 'general',
              loadChildren: () =>
              import('generalApp/Module').then((m) => m!.RemoteEntryModule),
            },
            {
              path: 'finance',
              loadChildren: () =>
                import('financialApp/Module').then((m) => m!.RemoteEntryModule),
            },
          ]
          },
  //    {
  //   path: 'inventoryApp',
  //   loadChildren: () =>
  //     import('inventoryApp/Module').then((m) => m!.RemoteEntryModule),
  // },
  {
    path: 'generalApp',
    loadChildren: () =>
      import('generalApp/Module').then((m) => m!.RemoteEntryModule),
  },
   {
    path: 'financialApp',
    loadChildren: () =>
      import('financialApp/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: 'notificationdetails',
    component: NotificationdetailsComponent, // Directly reference the component
  },
    {
    path: 'notification',
    component: NotificationComponent, // Directly reference the component
  },
    {
    path: 'notificationreciver',
    component: NotificationrecieverComponent, // Directly reference the component
  },
    {
    path: 'notificationlist',
    component: NotificationlistComponent, // Directly reference the component
  },
];
