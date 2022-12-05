import { Component } from '@angular/core';

@Component({
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent {
    public fixed: boolean = false;
    public color: 'primary' | 'accent' | 'warn' = 'primary';

    changeColor(): void {
        this.color = this.color === 'primary' ? 'accent' : this.color === 'accent' ? 'warn' : 'primary';
    }
}
