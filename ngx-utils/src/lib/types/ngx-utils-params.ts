import { INgxUtilsParamsDate, INgxUtilsParamsSearch, INgxUtilsParamsSelect } from '../interfaces/ngx-utils-params';

export type NgxUtilsParams = INgxUtilsParamsDate | INgxUtilsParamsSearch | INgxUtilsParamsSelect;

export interface INgxUtilsParamsValues {
    page: number;
    params: { [key: string]: { value: any; param: string } };
}

export interface INgxUtilsParamsUpdate {
    [key: string]: any;
}
