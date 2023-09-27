import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-helper-loader',
    templateUrl: './ngx-helper-loader.component.html',
    styleUrls: ['./ngx-helper-loader.component.scss'],
})
export class NgxHelperLoaderComponent implements OnInit, OnDestroy {
    @Input({ required: false }) color: 'primary' | 'accent' | 'warn' = 'accent';
    @Input({ required: false }) fixed: boolean = false;
    @Input({ required: false }) size: number = 2;

    public rotate: number = 0;
    private interval?: any;

    ngOnInit(): void {
        if (this.size < 1 || this.size > 5) this.size = 2;

        this.interval = setInterval(() => {
            if (this.fixed && this.rotate === 0) return;
            this.rotate = this.fixed ? 45 : (this.rotate + 15) % 360;
        }, 50);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
}
