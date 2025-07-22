import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    setItem(key: string, value: any): void {
        localStorage.setItem(key,value);
    }       

    getItem(key: string): any {
        const value = localStorage.getItem(key);
        return value ? value : null;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    clear(): void {
        localStorage.clear();
    }

     isLoggedIn() {
       
        return !!this.getItem('access_token');
    }
}