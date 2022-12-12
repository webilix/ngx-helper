import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NgxUtilsService } from './ngx-utils.service';

@Component({
    selector: 'ngx-utils',
    template: '',
    styles: [':host { display: none }'],
})
export class NgxUtilsComponent implements OnInit {
    constructor(
        public readonly viewContainerRef: ViewContainerRef,
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    ngOnInit(): void {
        this.ngxUtilsService.viewContainerRef = this.viewContainerRef;
    }
}
