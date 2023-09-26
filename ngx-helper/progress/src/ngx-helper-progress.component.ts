import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-helper-progress',
    templateUrl: './ngx-helper-progress.component.html',
    styleUrls: ['./ngx-helper-progress.component.scss'],
})
export class NgxHelperProgressComponent implements OnInit, OnDestroy {
    @Input({ required: false }) color: 'primary' | 'accent' | 'warn' = 'accent';
    @Input({ required: false }) fixed: boolean = false;

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
