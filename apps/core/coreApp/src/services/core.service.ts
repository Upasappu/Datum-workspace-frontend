import { inject, Injectable } from "@angular/core";
import { ApiResponseDto } from "@datum/models";
import { BaseService, LocalStorageService } from "@datum/services";
import { Observable } from "rxjs";
import { APP_URL, environment } from '@datum/utils';


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private baseService = inject(BaseService);
  private localStorageService = inject(LocalStorageService);

 fetch<T>(endpoint: string):Observable<ApiResponseDto<T>> {
        console.log("555500");
        const url =  endpoint;
    //console.log('LoginService: Fetching data from endpoint:', url);
        return this.baseService.get(endpoint);

  }
}
