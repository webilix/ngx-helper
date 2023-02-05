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

import { NgxUtilsMenu } from '../../types/ngx-utils-menu';

@Component({
    selector: 'ngx-utils-box',
    templateUrl: './ngx-utils-box.component.html',
    styleUrls: ['./ngx-utils-box.component.scss'],
})
export class NgxUtilsBoxComponent implements OnChanges, AfterViewInit {
    @ViewChild('contentView') private readonly contentView?: ElementRef;

    @Input() title?: string;
    @Input() icon?: string;
    @Input() menu: NgxUtilsMenu[] = [];
    @Input() component?: ComponentType<any>;
    @Input() padding: string | number = '1rem';

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
