import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ngx-utils-pagination',
    templateUrl: './ngx-utils-pagination.component.html',
    styleUrls: ['./ngx-utils-pagination.component.scss'],
})
export class NgxUtilsPaginationComponent implements OnChanges {
    @Input() current?: number;
    @Input() total?: number;
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
