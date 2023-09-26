import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgxHelperContainerService {
    public viewContainerRef?: ViewContainerRef;

    getContainer(): ViewContainerRef | undefined {
        if (!this.viewContainerRef) {
            const errors: string[] = [
                'NgxHelperComponent not addedd to DOM.',
                'Please add <ngx-helper></ngx-helper> at the end of App Component HTML file / template.',
            ];
            console.error(errors.join('\n'));
        }

        return this.viewContainerRef;
    }
}
