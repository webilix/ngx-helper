import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';

import { NgxHelperToastService } from './ngx-helper-toast.service';
import { NgxHelperToastComponent } from './ngx-helper-toast.component';

@NgModule({
    declarations: [NgxHelperToastComponent],
    imports: [CommonModule, MatIconModule, NgxHelperPipeModule],
    providers: [NgxHelperToastService],
})
export class NgxHelperToastModule {}
