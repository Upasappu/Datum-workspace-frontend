import { Injectable,inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '@datum/services';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    private localStorageService: LocalStorageService = inject(LocalStorageService);

    private router = inject(Router);

    canActivate(): boolean {
        console.log( this.localStorageService.getItem('skey'));
                console.log( this.localStorageService.getItem('access_token'));


        console.log( 'loggedin',this.localStorageService.isLoggedIn())
        if ( this.localStorageService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }
    
}