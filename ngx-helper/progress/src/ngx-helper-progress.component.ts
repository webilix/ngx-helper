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
    @Input({ required: false }) color?: string;

    public show: boolean = true;
    public value: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        this.value =
            typeof this.progress === 'number' ? this.progress : (this.progress.value / this.progress.total) * 100;
        this.value = +Math.abs(this.value).toFixed(2);
        if (this.value > 100) this.value = 100;

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
