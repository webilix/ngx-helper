import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';
import { NgxHelperToastModule } from '@webilix/ngx-helper/toast';

import { NgxHelperHttpService } from './ngx-helper-http.service';
import { NgxHelperHttpDownloadComponent } from './download/ngx-helper-http-download.component';
import { NgxHelperHttpUploadComponent } from './upload/ngx-helper-http-upload.component';

@NgModule({
    declarations: [NgxHelperHttpDownloadComponent, NgxHelperHttpUploadComponent],
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
