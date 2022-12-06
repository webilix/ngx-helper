import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-utils-loading',
    templateUrl: './ngx-utils-loading.component.html',
    styleUrls: ['./ngx-utils-loading.component.scss'],
})
export class NgxUtilsLoadingComponent implements OnInit, OnDestroy {
    @Input() color?: 'primary' | 'accent' | 'warn';
    @Input() fixed: boolean = false;

    public rotate: number = 0;
    private interval?: any;

    ngOnInit(): void {
        this.interval = setInterval(() => {
            if (this.fixed && this.rotate === 0) return;
            this.rotate = this.fixed ? 0 : (this.rotate + 15) % 360;
        }, 50);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
}
