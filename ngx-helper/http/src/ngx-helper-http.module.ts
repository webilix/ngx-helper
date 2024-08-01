import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';

import { NgxHelperHttpService } from './ngx-helper-http.service';
import { NgxHelperHttpDownloadComponent } from './download/ngx-helper-http-download.component';
import { NgxHelperHttpUploadComponent } from './upload/ngx-helper-http-upload.component';

@NgModule({
    declarations: [NgxHelperHttpDownloadComponent, NgxHelperHttpUploadComponent],
    imports: [CommonModule, MatIconModule, MatProgressBarModule, NgxHelperPipeModule],
    providers: [NgxHelperHttpService, provideHttpClient(withInterceptorsFromDi())],
})
export class NgxHelperHttpModule {}
