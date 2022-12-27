import {
    INgxUtilsParamDate,
    INgxUtilsParamFavorite,
    INgxUtilsParamSearch,
    INgxUtilsParamSelect,
} from '../interfaces/ngx-utils-params';

export type NgxUtilsParams = INgxUtilsParamDate | INgxUtilsParamFavorite | INgxUtilsParamSearch | INgxUtilsParamSelect;

export interface INgxUtilsParamsValues {
    page: number;
    params: { [key: string]: { value: any; param: string } };
}

export interface INgxUtilsParamsUpdate {
    [key: string]: any;
}
