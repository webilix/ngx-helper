import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';
import { NgxHelperToastModule } from '@webilix/ngx-helper/toast';

import { NgxHelperHttpService } from './ngx-helper-http.service';
import { NgxHelperDownloadComponent } from './download/ngx-helper-download.component';
import { NgxHelperUploadComponent } from './upload/ngx-helper-upload.component';

@NgModule({
    declarations: [NgxHelperDownloadComponent, NgxHelperUploadComponent],
    imports: [
        CommonModule,
        HttpClientModule,

        MatIconModule,
        MatProgressBarModule,

        NgxHelperPipeModule,
        NgxHelperToastModule,
    ],
    providers: [NgxHelperHttpService],
})
export class NgxHelperHttpModule {}
