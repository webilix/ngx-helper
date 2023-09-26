import { ComponentType } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';

import { Helper } from '@webilix/helper-library';

import { NgxHelperMenu } from '@webilix/ngx-helper/menu';

@Component({
    selector: 'ngx-helper-box',
    templateUrl: './ngx-helper-box.component.html',
    styleUrls: ['./ngx-helper-box.component.scss'],
})
export class NgxHelperBoxComponent implements OnChanges, AfterViewInit {
    @ViewChild('contentView') private readonly contentView?: ElementRef;

    @Input({ required: true }) title!: string;

    @Input({ required: false }) icon?: string;
    @Input({ required: false }) menu: NgxHelperMenu[] = [];
    @Input({ required: false }) component?: ComponentType<any>;
    @Input({ required: false }) padding: string | number = '1rem';

    public show: boolean = true;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.padding = Helper.IS.string(this.padding) ? this.padding : this.padding.toString() + 'px';
        this.ngAfterViewInit();
    }

    ngAfterViewInit(): void {
        this.show = true;
        if (!this.contentView || this.component) return;

        const contentView: HTMLDivElement = this.contentView.nativeElement;
        this.show = contentView.children.length !== 0;
        this.changeDetectorRef.detectChanges();
    }
}
