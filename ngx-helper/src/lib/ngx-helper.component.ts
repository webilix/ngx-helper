import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NgxHelperContainerService } from './providers';

@Component({
    selector: 'ngx-helper',
    template: '',
    styles: [':host { display: none }'],
})
export class NgxHelperComponent implements OnInit {
    constructor(
        public readonly viewContainerRef: ViewContainerRef,
        private readonly ngxHelperContainerService: NgxHelperContainerService,
    ) {}

    ngOnInit(): void {
        this.ngxHelperContainerService.viewContainerRef = this.viewContainerRef;
    }
}
