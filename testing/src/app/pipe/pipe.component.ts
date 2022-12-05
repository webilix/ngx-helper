import { Component } from '@angular/core';

@Component({
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent {
    public html: string = '<a href="https://google.com" target="_blank">GOOGLE</a><br>2ND line of HTML code!';
}
