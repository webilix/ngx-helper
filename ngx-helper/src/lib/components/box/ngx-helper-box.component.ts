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

import { NgxHelperMenu } from '../../types';

@Component({
    selector: 'ngx-helper-box',
    templateUrl: './ngx-helper-box.component.html',
    styleUrls: ['./ngx-helper-box.component.scss'],
})
export class NgxHelperBoxComponent implements OnChanges, AfterViewInit {
    @ViewChild('contentView') private readonly contentView?: ElementRef;

    @Input() title?: string;
    @Input() icon?: string;
    @Input() menu: NgxHelperMenu[] = [];
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
