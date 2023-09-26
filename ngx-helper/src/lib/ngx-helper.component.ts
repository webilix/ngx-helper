import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NgxHelperContainerService } from './providers';
import { NgxHelperService } from './ngx-helper.service';

@Component({
    selector: 'ngx-helper',
    template: '',
    styles: [':host { display: none }'],
})
export class NgxHelperComponent implements OnInit {
    constructor(
        public readonly viewContainerRef: ViewContainerRef,
        private readonly ngxHelperService: NgxHelperService,
        private readonly ngxHelperContainerService: NgxHelperContainerService,
    ) {}

    ngOnInit(): void {
        this.ngxHelperService.viewContainerRef = this.viewContainerRef;
        this.ngxHelperContainerService.viewContainerRef = this.viewContainerRef;
    }
}
