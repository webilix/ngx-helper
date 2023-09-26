import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ngx-helper-pagination',
    templateUrl: './ngx-helper-pagination.component.html',
    styleUrls: ['./ngx-helper-pagination.component.scss'],
})
export class NgxHelperPaginationComponent implements OnChanges {
    @Input({ required: true }) current?: number;
    @Input({ required: true }) total?: number;
    @Input({ required: true }) margin: number = 1;

    @Output() page: EventEmitter<number> = new EventEmitter<number>();

    public list: string[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        this.list = [];
        if (!this.current || !this.total || this.total < 2) return;

        const total: number = this.total;
        const current: number = this.current;

        if (total <= 7) {
            this.list = [...Array(total).keys()].map((n: number) => (n + 1).toString());
            return;
        }

        const begin: number | null = current <= 7 ? current : null;
        const end: number | null = current > total - 7 ? total - current : null;

        if (current <= 5 && begin !== 5 && (!begin || !end || begin <= end)) {
            this.list = [...Array(7).keys()].map((n: number) => (n + 1).toString());
            this.list.push('.', total.toString());
            return;
        }

        if (current > total - 5 && end !== 4 && (!begin || !end || begin > end)) {
            this.list = [...Array(7).keys()].reverse().map((n: number) => (total - n).toString());
            this.list.unshift('1', '.');
            return;
        }

        this.list = [...Array(5).keys()].reverse().map((n: number) => (current - n + 2).toString());
        this.list.unshift('1', '.');
        this.list.push('.', total.toString());
    }
}
