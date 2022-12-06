import { Component } from '@angular/core';

@Component({
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent {
    public html: string = '<a href="https://google.com" target="_blank">GOOGLE</a>\n2ND line of HTML code!';
    public style: string = 'font-size: 15px; color: red;';
    public date: Date = new Date(new Date().getTime() - 123456789000);
}
