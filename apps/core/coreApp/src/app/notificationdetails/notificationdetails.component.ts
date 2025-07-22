import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LogLevel } from '@microsoft/signalr';
import { AppHeaderComponent } from '@datum/ui';
import { DataSharingService } from 'libs/services/src/utils/datasharing.service';
import { ENDPOINTCONSTANT } from 'libs/constants/src/lib/endpoint.constants';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-notificationdetails',
  imports: [CommonModule],
  templateUrl: './notificationdetails.component.html',
  styleUrl: './notificationdetails.component.css',
})

export class NotificationdetailsComponent {
 
  notificationData: any;
  private datasharingService = inject(DataSharingService);
  private coreService = inject(CoreService);
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
   
    this.notificationData = this.datasharingService.sharedData;
     if (this.notificationData) {
      this.fetchUserDetails(this.notificationData.userName, this.notificationData.uniqueKeyID);
    }
  }

  fetchUserDetails(userName: string, uniqueKeyID: string): void {
    const url =  `${ENDPOINTCONSTANT.FETCHNOTIFICATION}/${userName}/${uniqueKeyID}`;

    this.coreService.fetch<any>(url).subscribe(
      (data) => {
        this.notificationData = data;
      },
      (error) => {
        console.error('Error fetching notification details:', error);
      }
    );
  }
}  
