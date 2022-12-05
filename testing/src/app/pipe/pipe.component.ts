import { Component } from '@angular/core';

@Component({
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent {
    public html: string = '<a href="https://google.com" target="_blank">GOOGLE</a><br>2ND line of HTML code!';
    public style: string = 'font-size: 15px; color: red;';
    public script: string = '<script>console.log("AAA")</script>';
    public date: Date = new Date(new Date().getTime() - 123456789000);
}
