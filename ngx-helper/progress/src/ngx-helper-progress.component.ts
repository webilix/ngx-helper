import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

@Component({
    selector: 'ngx-helper-progress',
    templateUrl: './ngx-helper-progress.component.html',
    styleUrls: ['./ngx-helper-progress.component.scss'],
})
export class NgxHelperProgressComponent implements OnChanges, AfterViewInit {
    @ViewChild('contentView') private readonly contentView?: ElementRef;

    @HostBinding('className') className: string = '';

    @Input({ required: true }) progress!: number | { value: number; total: number };
    @Input({ required: false }) component?: ComponentType<any>;
    @Input({ required: false }) border: number = 0;
    @Input({ required: false }) align: 'LR' | 'RL' | 'TB' | 'BT' = 'LR';
    @Input({ required: false }) color?: string;

    public show: boolean = true;
    public percent: number = 0;
    public direction: 'H' | 'V' = 'H';

    ngOnChanges(changes: SimpleChanges): void {
        this.percent =
            typeof this.progress === 'number' ? this.progress : (this.progress.value / this.progress.total) * 100;
        this.percent = +Math.abs(this.percent).toFixed(2);
        if (this.percent > 100) this.percent = 100;

        this.direction = this.align === 'LR' || this.align === 'RL' ? 'H' : 'V';

        this.ngAfterViewInit();
    }

    ngAfterViewInit(): void {
        this.show = true;
        this.className = '';
        if (!this.contentView || this.component) return;

        const contentView: HTMLDivElement = this.contentView.nativeElement;
        this.show = contentView.children.length !== 0;
        this.className = !this.show ? 'ngx-helper-hidden' : '';
    }
}
