import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Helper } from '@webilix/helper-library';

import { INgxUtilsCalendarConfig } from '../../interfaces/ngx-utils-calendar';
import {
    INgxUtilsParamDate,
    INgxUtilsParamFavorite,
    INgxUtilsParamPlate,
    INgxUtilsParamSearch,
    INgxUtilsParamSelect,
} from '../../interfaces/ngx-utils-params';
import { NgxUtilsMenu } from '../../types/ngx-utils-menu';
import {
    INgxUtilsParamsOrder,
    INgxUtilsParamsUpdate,
    INgxUtilsParamsValue,
    NgxUtilsParams,
} from '../../types/ngx-utils-params';
import { NgxUtilsService } from '../../ngx-utils.service';

import { NgxUtilsParamsSelectComponent } from './select/ngx-utils-params-select.component';
import { NgxUtilsParamsPlateComponent } from './plate/ngx-utils-params-plate.component';

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
    @Input() order?: INgxUtilsParamsOrder;
    @Output() changed: EventEmitter<INgxUtilsParamsValue> = new EventEmitter<INgxUtilsParamsValue>();

    public menus: { [key: string]: NgxUtilsMenu[] } = {};
    public values: { [key: string]: any } = {};

    public orderMenu: NgxUtilsMenu[] = [];
    public orderValue: { type: 'ASC' | 'DESC'; option: string } = { type: 'ASC', option: '' };

    private jalali = JalaliDateTime();

    constructor(private readonly router: Router, private readonly ngxUtilsService: NgxUtilsService) {}

    ngOnInit(): void {
        if (this.params.length === 0) this.emitChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['page']) {
            if (!changes['page'].firstChange) this.updateRoute();
            else {
                const params: Params = this.getQueryParams();
                const page: string | null = params['page'] || null;
                this.page = page === null ? 1 : !Helper.IS.STRING.numeric(page || '') ? 1 : +page;
            }
        }

        if (changes['update'] && !changes['update'].firstChange) {
            const values: { [key: string]: any } = {};
            this.params.forEach((param: NgxUtilsParams) => {
                if (param.type === 'COMMENT') return;

                const value: any = changes['update'].currentValue[param.name];
                if (value === undefined || this.values[param.name] === value) return;

                switch (param.type) {
                    case 'DATE':
                        if (Helper.IS.date(value)) values[param.name] = value;
                        break;
                    case 'FAVORITE':
                        values[param.name] = value === true;
                        break;
                    case 'PLATE':
                        this.values[param.name] = Helper.IS.plate(value)
                            ? typeof value === 'string'
                                ? value
                                : value.join('-')
                            : null;
                        break;
                    case 'SEARCH':
                        if (Helper.IS.string(value)) values[param.name] = value;
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

        const hasParams: boolean = !!changes['params'];
        const hasOrder: boolean = !!(changes['order'] && this.order && this.order.options.length !== 0);

        if (hasParams) {
            this.values = {};
            const params: Params = this.getQueryParams();
            this.params.forEach((param: NgxUtilsParams) => {
                if (param.type === 'COMMENT') return;

                this.values[param.name] = null;

                const value: any = params[param.name] || param.value;
                if (Helper.IS.empty(value)) return;

                switch (param.type) {
                    case 'DATE':
                        if (Helper.IS.date(value)) this.values[param.name] = value;
                        else if (Helper.IS.STRING.date(value)) {
                            const gregorian = this.jalali.gregorian(value).date;
                            this.values[param.name] = new Date(`${gregorian}T00:00:00`);
                        }
                        break;
                    case 'FAVORITE':
                        this.values[param.name] = Helper.IS.boolean(value) ? value : value === 'TRUE';
                        break;
                    case 'PLATE':
                        this.values[param.name] = Helper.IS.plate(value)
                            ? typeof value === 'string'
                                ? value
                                : value.join('-')
                            : null;
                        break;
                    case 'SEARCH':
                        this.values[param.name] = Helper.IS.string(value) ? value : null;
                        break;
                    case 'SELECT':
                        this.values[param.name] = param.options.find((o) => o.id === value) ? value : null;
                        break;
                }
            });

            this.params.forEach((param: NgxUtilsParams) => {
                if (param.type !== 'SELECT' || param.options.length > 14) return;

                this.menus[param.name] = param.options.map((o) => ({
                    title: o.title,
                    english: !!param.english,
                    click: () => this.setSelect(param, o.id),
                }));
            });
        }

        if (hasOrder) {
            this.orderMenu =
                this.order?.options.map((o) => ({ title: o.title, click: () => this.setOrderOption(o.id) })) || [];

            const params: Params = this.getQueryParams();
            this.orderValue.type =
                params['ngx-utils-order-type'] === 'ASC' || params['ngx-utils-order-type'] === 'DESC'
                    ? params['ngx-utils-order-type']
                    : this.order?.type || 'ASC';
            this.orderValue.option =
                this.order?.options.find((o) => params['ngx-utils-order-option'] === o.id)?.id ||
                this.order?.options.find((o) => this.order?.default === o.id)?.id ||
                this.order?.options[0].id ||
                '';
        }

        if (hasParams || hasOrder) {
            const check: boolean[] = Object.keys(changes).map((change) => changes[change].firstChange);
            this.page = check.includes(false) ? 1 : this.page;
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
        const values: INgxUtilsParamsValue = {
            page: this.page,
            params: {},
            order: { type: 'ASC', option: '', param: '' },
        };

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
                case 'PLATE':
                    values.params[param.name] = {
                        value: this.values[param.name] ? this.values[param.name].split('-') : null,
                        param: this.values[param.name] || '',
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

        if (this.order)
            values.order = { ...this.orderValue, param: `${this.orderValue.type}:${this.orderValue.option}` };

        this.changed.emit(values);
    }

    updateRoute(): void {
        const queryParams: Params = this.getQueryParams();
        queryParams['page'] = this.page > 1 ? this.page.toString() : undefined;

        this.params.forEach((param: NgxUtilsParams) => {
            if (param.type === 'COMMENT') return;

            const value: any = this.values[param.name];
            if (Helper.IS.empty(value)) {
                queryParams[param.name] = undefined;
                return;
            }

            switch (param.type) {
                case 'DATE':
                    queryParams[param.name] = this.jalali.toString(value, { format: 'Y-M-D' });
                    break;
                case 'FAVORITE':
                    queryParams[param.name] = value == true ? 'TRUE' : undefined;
                    break;
                case 'PLATE':
                    queryParams[param.name] = value || undefined;
                    break;
                case 'SEARCH':
                case 'SELECT':
                    queryParams[param.name] = value || undefined;
                    break;
            }
        });

        if (this.order) {
            queryParams['ngx-utils-order-type'] =
                this.orderValue.type !== this.order.type ? this.orderValue.type : undefined;
            queryParams['ngx-utils-order-option'] =
                this.orderValue.option === this.order.default ||
                (!this.order.default && this.orderValue.option === this.order.options[0].id)
                    ? undefined
                    : this.orderValue.option;
        }

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
        const config: Partial<INgxUtilsCalendarConfig> = {
            title: param.title || 'تاریخ',
            value: this.values[param.name],
            minDate: param.minDate,
            maxDate: param.maxDate,
        };

        this.ngxUtilsService.getDate(config, (date: Date) => {
            if (this.values[param.name]?.getTime() === date.getTime()) return;

            this.page = 1;
            this.values[param.name] = date;
            this.updateRoute();
        });
    }

    setFavorite(param: INgxUtilsParamFavorite): void {
        this.page = 1;
        this.values[param.name] = !this.values[param.name];
        this.updateRoute();
    }

    setPlate(param: INgxUtilsParamPlate): void {
        this.ngxUtilsService.openBottomSheet<string>(NgxUtilsParamsPlateComponent, param.title || 'پلاک').then(
            (value) => {
                if (this.values[param.name] === value) return;

                this.page = 1;
                this.values[param.name] = value;
                this.updateRoute();
            },
            () => {},
        );
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

    getOrderTitle(): string {
        if (!this.order || this.order.options.length === 0) return '';

        return this.order.options.find((o) => o.id === this.orderValue.option)?.title || this.order.options[0]?.title;
    }

    setOrderOption(id: string): void {
        if (!this.order || this.order.options.length === 0) return;

        const option = this.order.options.find((o) => o.id === id);
        if (!option) return;

        this.orderValue.option = id;
        this.updateRoute();
    }

    changeOrderType(): void {
        if (!this.order || this.order.options.length === 0) return;

        this.orderValue.type = this.orderValue.type === 'ASC' ? 'DESC' : 'ASC';
        this.updateRoute();
    }
}
