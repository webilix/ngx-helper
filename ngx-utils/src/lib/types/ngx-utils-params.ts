import {
    INgxUtilsParamComment,
    INgxUtilsParamDate,
    INgxUtilsParamFavorite,
    INgxUtilsParamSearch,
    INgxUtilsParamSelect,
} from '../interfaces/ngx-utils-params';

export type NgxUtilsParams =
    // VIEW
    | INgxUtilsParamComment
    // INPUTS
    | INgxUtilsParamDate
    | INgxUtilsParamFavorite
    | INgxUtilsParamSearch
    | INgxUtilsParamSelect;

export interface INgxUtilsParamsOrder {
    title?: string;
    type: 'ASC' | 'DESC';
    options: { id: string; title: string }[];
    default?: string;
}

export interface INgxUtilsParamsValue {
    page: number;
    params: { [key: string]: { value: any; param: string } };
    order: { type: 'ASC' | 'DESC'; option: string; param: string };
}

export interface INgxUtilsParamsUpdate {
    [key: string]: any;
}
