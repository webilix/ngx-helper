import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Validator } from '@webilix/validator-library';

import {
    INgxUtilsParamDate,
    INgxUtilsParamFavorite,
    INgxUtilsParamSearch,
    INgxUtilsParamSelect,
} from '../../interfaces/ngx-utils-params';
import { NgxUtilsMenu } from '../../types/ngx-utils-menu';
import { INgxUtilsParamsUpdate, INgxUtilsParamsValues, NgxUtilsParams } from '../../types/ngx-utils-params';
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
    @Input() update: INgxUtilsParamsUpdate = {};
    @Output() changed: EventEmitter<INgxUtilsParamsValues> = new EventEmitter<INgxUtilsParamsValues>();

    public menu: { [key: string]: NgxUtilsMenu[] } = {};
    public values: { [key: string]: any } = {};

    private jalali = JalaliDateTime();

    constructor(private readonly router: Router, private readonly ngxUtilsService: NgxUtilsService) {}

    ngOnInit(): void {
        const params: Params = this.getQueryParams();

        const page: string | null = params['page'] || null;
        this.page = page === null ? 1 : !Validator.STRING.isNumeric(page || '') ? 1 : +page;

        if (this.params.length === 0) this.emitChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['page'] && !changes['page'].firstChange) this.updateRoute();

        if (changes['update'] && !changes['update'].firstChange) {
            const values: { [key: string]: any } = {};
            this.params.forEach((param: NgxUtilsParams) => {
                if (param.type === 'COMMENT') return;

                const value: any = changes['update'].currentValue[param.name];
                if (value === undefined || this.values[param.name] === value) return;

                switch (param.type) {
                    case 'DATE':
                        if (Validator.VALUE.isDate(value)) values[param.name] = value;
                        break;
                    case 'FAVORITE':
                        values[param.name] = value === true;
                        break;
                    case 'SEARCH':
                        if (Validator.VALUE.isString(value)) values[param.name] = value;
                        break;
                    case 'SELECT':
                        if (param.options.find((o) => o.id === value)) values[param.name] = value;
                        break;
                }
            });

            if (Object.keys(values).length !== 0) {
                this.page = 1;
                this.values = { ...this.values, ...values };
                this.updateRoute();
            }
        }

        if (changes['params']) {
            this.values = {};
            const params: Params = this.getQueryParams();
            this.params.forEach((param: NgxUtilsParams) => {
                if (param.type === 'COMMENT') return;

                this.values[param.name] = null;

                const value: any = params[param.name] || param.value;
                if (Validator.VALUE.isEmpty(value)) return;

                switch (param.type) {
                    case 'DATE':
                        if (Validator.VALUE.isDate(value)) this.values[param.name] = value;
                        else if (Validator.STRING.isDate(value)) {
                            const gregorian = this.jalali.gregorian(value).date;
                            this.values[param.name] = new Date(`${gregorian}T00:00:00`);
                        }
                        break;
                    case 'FAVORITE':
                        this.values[param.name] = Validator.VALUE.isBoolean(value) ? value : value === 'TRUE';
                        break;
                    case 'SEARCH':
                        this.values[param.name] = Validator.VALUE.isString(value) ? value : null;
                        break;
                    case 'SELECT':
                        this.values[param.name] = param.options.find((o) => o.id === value) ? value : null;
                        break;
                }
            });

            this.params.forEach((param: NgxUtilsParams) => {
                if (param.type !== 'SELECT' || param.options.length > 14) return;

                this.menu[param.name] = param.options.map((o) => ({
                    title: o.title,
                    english: !!param.english,
                    click: () => this.setSelect(param, o.id),
                }));
            });

            this.page = 1;
            this.emitChanges();
        }
    }

    getQueryParams(): Params {
        const params: URLSearchParams = new URLSearchParams(window.location.search);
        const queryParams: Params = {};
        params.forEach((value: string, key: string) => (queryParams[key] = value));
        return queryParams;
    }

    emitChanges(): void {
        const values: INgxUtilsParamsValues = { page: this.page, params: {} };
        this.params.forEach((param: NgxUtilsParams) => {
            switch (param.type) {
                case 'DATE':
                    values.params[param.name] = {
                        value: this.values[param.name],
                        param: this.values[param.name]
                            ? this.jalali.gregorian(this.jalali.toString(this.values[param.name], { format: 'Y-M-D' }))
                                  .date
                            : '',
                    };
                    break;
                case 'FAVORITE':
                    values.params[param.name] = {
                        value: this.values[param.name],
                        param: this.values[param.name] ? 'TRUE' : 'FALSE',
                    };
                    break;
                case 'SEARCH':
                case 'SELECT':
                    values.params[param.name] = {
                        value: this.values[param.name],
                        param: this.values[param.name] || '',
                    };
                    break;
            }
        });

        this.changed.emit(values);
    }

    updateRoute(): void {
        const queryParams: Params = this.getQueryParams();
        queryParams['page'] = this.page > 1 ? this.page.toString() : undefined;
        this.params.forEach((param: NgxUtilsParams) => {
            if (param.type === 'COMMENT') return;

            const value: any = this.values[param.name];
            if (Validator.VALUE.isEmpty(value)) return;

            switch (param.type) {
                case 'DATE':
                    queryParams[param.name] = this.jalali.toString(value, { format: 'Y-M-D' });
                    break;
                case 'FAVORITE':
                    queryParams[param.name] = value == true ? 'TRUE' : undefined;
                    break;
                case 'SEARCH':
                case 'SELECT':
                    queryParams[param.name] = value;
                    break;
            }
        });

        this.router.navigate(this.route, { queryParams });
        this.emitChanges();
    }

    resetValue(param: NgxUtilsParams): void {
        if (param.type === 'COMMENT') return;
        if (this.values[param.name] === null) return;

        this.page = 1;
        this.values[param.name] = null;
        this.updateRoute();
    }

    setDate(param: INgxUtilsParamDate): void {
        this.ngxUtilsService
            .getDate({
                title: param.title || 'تاریخ',
                value: this.values[param.name],
                minDate: param.minDate,
                maxDate: param.maxDate,
            })
            .then(
                (date: Date) => {
                    if (this.values[param.name]?.getTime() === date.getTime()) return;

                    this.page = 1;
                    this.values[param.name] = date;
                    this.updateRoute();
                },
                () => {},
            );
    }

    setFavorite(param: INgxUtilsParamFavorite): void {
        this.page = 1;
        this.values[param.name] = !this.values[param.name];
        this.updateRoute();
    }

    setSearch(param: INgxUtilsParamSearch, value: string): void {
        if (this.values[param.name] === (value.trim() || null)) return;

        this.page = 1;
        this.values[param.name] = value.trim() || null;
        this.updateRoute();
    }

    getSelectTitle(param: INgxUtilsParamSelect, value: string): string {
        return param.options.find((o) => o.id === value)?.title || '';
    }

    setSelect(param: INgxUtilsParamSelect, value: string | null): void {
        if (this.values[param.name] === value) return;

        this.page = 1;
        this.values[param.name] = param.options.find((o) => o.id === value) ? value : null;
        this.updateRoute();
    }

    getSelect(param: INgxUtilsParamSelect): void {
        const value: string = this.values[param.name];
        this.ngxUtilsService.openBottomSheet<string>(NgxUtilsParamsSelectComponent, param.title, { param, value }).then(
            (value) => {
                if (this.values[param.name] === value) return;

                this.page = 1;
                this.values[param.name] = value;
                this.updateRoute();
            },
            () => {},
        );
    }
}
