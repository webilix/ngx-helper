import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Params, Router } from '@angular/router';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Validator } from '@webilix/validator-library';

import { INgxUtilsParamsDate, INgxUtilsParamsSearch, INgxUtilsParamsSelect } from '../../interfaces/ngx-utils-params';
import { NgxUtilsMenu } from '../../types/ngx-utils-menu';
import { INgxUtilsParamsValues, NgxUtilsParams } from '../../types/ngx-utils-params';
import { NgxUtilsService } from '../../ngx-utils.service';

import { NgxUtilsParamsSelectComponent } from './select/ngx-utils-params-select.component';

@Component({
    selector: 'ngx-utils-params',
    templateUrl: './ngx-utils-params.component.html',
    styleUrls: ['./ngx-utils-params.component.scss'],
})
export class NgxUtilsParamsComponent implements OnInit, OnChanges {
    @Input() route: string[] = ['/'];
    @Input() page: number = 1;
    @Input() params: NgxUtilsParams[] = [];
    @Output() changed: EventEmitter<INgxUtilsParamsValues> = new EventEmitter<INgxUtilsParamsValues>();

    public menu: { [key: string]: NgxUtilsMenu[] } = {};
    public values: { [key: string]: any } = {};

    private jalali = JalaliDateTime();

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly router: Router,
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    ngOnInit(): void {
        const params: URLSearchParams = new URLSearchParams(window.location.search);

        const page: string | null = params.get('page');
        this.page = page === null ? 1 : !Validator.STRING.isNumeric(page || '') ? 1 : +page;

        this.params.forEach((param: NgxUtilsParams) => {
            const value: string | null = params.get(param.name);
            if (Validator.VALUE.isEmpty(value)) {
                this.values[param.name] = null;
                return;
            }

            switch (param.type) {
                case 'SEARCH':
                    this.values[param.name] = value;
                    break;
                case 'SELECT':
                    this.values[param.name] = param.options.find((o) => o.id === value) ? value : null;
                    break;
                case 'DATE':
                    if (value === null || !Validator.STRING.isDate(value)) this.values[param.name] = null;
                    else {
                        const gregorian = this.jalali.gregorian(value).date;
                        this.values[param.name] = new Date(`${gregorian}T00:00:00`);
                    }
                    break;
            }
        });

        this.params.forEach((param: NgxUtilsParams) => {
            if (param.type !== 'SELECT' || param.options.length > 15) return;

            this.menu[param.name] = param.options.map((o) => ({
                title: o.title,
                english: !!param.english,
                click: () => this.setSelect(param, o.id),
            }));
        });

        this.emitValues();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['page'] || changes['page'].firstChange) return;
        this.emitValues();
        this.updateRoute();
        this.changeDetectorRef.detectChanges();
    }

    emitValues(): void {
        const values: INgxUtilsParamsValues = { page: this.page, params: {} };
        this.params.forEach((param: NgxUtilsParams) => {
            switch (param.type) {
                case 'SEARCH':
                case 'SELECT':
                    values.params[param.name] = {
                        value: this.values[param.name],
                        param: this.values[param.name] || '',
                    };
                    break;
                case 'DATE':
                    values.params[param.name] = {
                        value: this.values[param.name],
                        param: this.values[param.name] ? (this.values[param.name] as Date).toJSON() : '',
                    };
                    break;
            }
        });

        this.changed.emit(values);
    }

    updateRoute(): void {
        const queryParams: Params = {};
        if (this.page !== 1) queryParams['page'] = this.page.toString();
        this.params.forEach((param: NgxUtilsParams) => {
            const value: any = this.values[param.name];
            if (Validator.VALUE.isEmpty(value)) return;
            switch (param.type) {
                case 'SEARCH':
                case 'SELECT':
                    queryParams[param.name] = value;
                    break;
                case 'DATE':
                    queryParams[param.name] = this.jalali.toString(value, { format: 'Y-M-D' });
                    break;
            }
        });

        this.router.navigate(this.route, { queryParams });
    }

    setSearch(param: INgxUtilsParamsSearch, value: string): void {
        value = value.trim();
        this.values[param.name] = value || null;
        this.emitValues();
        this.updateRoute();
    }

    getSelectTitle(param: INgxUtilsParamsSelect, value: string): string {
        return param.options.find((o) => o.id === value)?.title || '';
    }

    setSelect(param: INgxUtilsParamsSelect, value: string): void {
        this.values[param.name] = param.options.find((o) => o.id === value) ? value : null;
        this.emitValues();
        this.updateRoute();
    }

    getSelect(param: INgxUtilsParamsSelect): void {
        const value: string = this.values[param.name];
        this.ngxUtilsService.openBottomSheet<string>(NgxUtilsParamsSelectComponent, param.title, { param, value }).then(
            (value) => {
                this.values[param.name] = value;
                this.emitValues();
                this.updateRoute();
            },
            () => {},
        );
    }

    resetSelect(param: INgxUtilsParamsSelect): void {
        this.values[param.name] = null;
        this.emitValues();
        this.updateRoute();
    }

    setDate(param: INgxUtilsParamsDate): void {
        this.ngxUtilsService.getDate({ title: param.title || 'تاریخ', value: this.values[param.name] }).then(
            (date: Date) => {
                this.values[param.name] = date;
                this.emitValues();
                this.updateRoute();
            },
            () => {},
        );
    }

    resetDate(param: INgxUtilsParamsDate): void {
        this.values[param.name] = null;
        this.emitValues();
        this.updateRoute();
    }
}
