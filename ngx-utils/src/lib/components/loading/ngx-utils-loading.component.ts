import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ngx-utils-loading',
    templateUrl: './ngx-utils-loading.component.html',
    styleUrls: ['./ngx-utils-loading.component.scss'],
})
export class NgxUtilsLoadingComponent implements OnChanges, OnDestroy {
    @Input() color?: 'primary' | 'accent' | 'warn';
    @Input() fixed: boolean = false;

    public rotate: number = 0;
    private interval?: any;

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['fixed']) return;

        this.rotate = 0;
        if (this.interval) clearInterval(this.interval);
        if (!this.fixed) this.interval = setInterval(() => (this.rotate = (this.rotate + 10) % 360), 50);
    }

    ngOnDestroy(): void {
        if (this.interval) clearInterval(this.interval);
    }
}
