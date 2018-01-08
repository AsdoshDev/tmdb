import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { Injectable } from '@angular/core';

platformBrowserDynamic().bootstrapModule(AppModule);


@Injectable()
export class GlobalApp {

    constructor() {}
    
    public lsGetItem(id: string): string {
        return localStorage.getItem(id);
    }

    public lsSetItem(key: string,value:any) {
        return localStorage.setItem(key,value);
    }
}