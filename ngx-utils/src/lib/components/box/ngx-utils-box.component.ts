import { ComponentType } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-utils-box',
    templateUrl: './ngx-utils-box.component.html',
    styleUrls: ['./ngx-utils-box.component.scss'],
})
export class NgxUtilsBoxComponent {
    @Input() title?: string;
    @Input() icon?: string;
    @Input() component?: ComponentType<any>;
}
