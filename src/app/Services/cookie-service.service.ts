import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {
    private cookieStore : {[key: string]: any} = {};

    constructor(@Inject(DOCUMENT) private document: Document) { 
      this.parseCookies(document.cookie);
    }
    
    public parseCookies(cookies = document.cookie) {
        this.cookieStore = {};
        if (!!cookies === false) { return; }
        const cookiesArr = cookies.split(';');
        for (const cookie of cookiesArr) {
          console.log("cookie data", cookie);
            const cookieArr = cookie.split('=');
            this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
        }
    }

    get(key: string) {
        this.parseCookies();
        return !!this.cookieStore[key] ? this.cookieStore[key] : null;
    }

    remove(key: string) {
      document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    }

    set(key: string, value: string) {
        document.cookie = key + '=' + (value || '');
        // let cookieString = `${key}=${value || ''}`;

        // let maxAgeSeconds = 86400; // 1 day
        // if (maxAgeSeconds > 0) {
        //     const expirationDate = new Date(Date.now() + maxAgeSeconds * 1000);
        //     cookieString += `; Max-Age=${maxAgeSeconds}; Expires=${expirationDate.toUTCString()}`;
        // }

        // cookieString += `; HttpOnly`;
        // cookieString += `; Secure`;

        // document.cookie = cookieString;
    }
}
