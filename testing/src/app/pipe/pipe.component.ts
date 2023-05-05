import { Component } from '@angular/core';

@Component({
    host: { selector: 'pipe' },
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent {
    public html: string = '<a href="https://google.com" target="_blank">GOOGLE</a>\n2ND line of HTML code!';
    public style: string =
        'font-size: 15px; color: red; background-color: gray; padding: 0 1rem; text-shadow: 0 1px 0 #000;';
    public date: Date = new Date(new Date().getTime() - 123456789000);
    public period: { from: Date; to: Date } = {
        from: new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
        to: new Date(),
    };
}
