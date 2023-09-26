import { ComponentRef, Injectable } from '@angular/core';

import { NgxHelperContainerService } from '@webilix/ngx-helper';

import { NgxHelperToastComponent } from './ngx-helper-toast.component';
import { INgxHelperToastConfig } from './ngx-helper-toast.interface';
import { NgxHelperToast } from './ngx-helper-toast.type';

@Injectable()
export class NgxHelperToastService {
    private toastIndex: number = 0;
    private toasts: ComponentRef<NgxHelperToastComponent>[] = [];

    constructor(private readonly ngxHelperContainerService: NgxHelperContainerService) {}

    private updateToastsTop(): void {
        let top: number = 0;
        this.toasts.forEach((toast, index: number) => {
            toast.instance.top = `calc(${index / 2}rem + calc(${top}px + 1rem))`;
            top += +toast.instance.elementRef.nativeElement.offsetHeight;
        });
    }

    toast(type: NgxHelperToast, message: string | string[], timeout?: number, callback?: () => void): void;
    toast(config: INgxHelperToastConfig, message: string | string[], timeout?: number, callback?: () => void): void;
    toast(arg1: any, message: string | string[], timeout?: number, callback?: () => void): void {
        const viewContainerRef = this.ngxHelperContainerService.getContainer();
        if (!viewContainerRef) return;

        const configs: { [key in NgxHelperToast]: INgxHelperToastConfig } = {
            ERROR: { icon: 'cancel', foreColor: '#fff', backColor: '#bd362f' },
            INFO: { icon: 'warning_amber', foreColor: '#fff', backColor: '#2f96b4' },
            SUCCESS: { icon: 'done_all', foreColor: '#fff', backColor: '#51a351' },
            WARNING: { icon: 'info', foreColor: '#fff', backColor: '#f89406' },
        };

        const toast = viewContainerRef.createComponent(NgxHelperToastComponent);
        toast.instance.index = ++this.toastIndex;
        toast.instance.config = typeof arg1 === 'string' ? configs[arg1 as NgxHelperToast] : arg1;
        toast.instance.message = Array.isArray(message) ? message : [message];
        toast.instance.timeout = timeout === undefined || timeout < 0 ? 5 : timeout;

        toast.instance.close = () => {
            this.toasts = this.toasts.filter((t) => t.instance.index !== toast.instance.index);
            this.updateToastsTop();
            toast.destroy();

            if (callback) callback();
        };

        this.toasts.push(toast);
        this.updateToastsTop();
    }
}
