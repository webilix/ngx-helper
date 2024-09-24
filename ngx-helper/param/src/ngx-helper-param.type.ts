import {
    INgxHelperParamBoolean,
    INgxHelperParamComment,
    INgxHelperParamDate,
    INgxHelperParamMenu,
    INgxHelperParamPlate,
    INgxHelperParamSearch,
    INgxHelperParamSelect,
} from './ngx-helper-param.interface';

export type NgxHelperParam =
    // DIVIDER (NEW LINE)
    | 'DIVIDER'
    // VIEW
    | INgxHelperParamComment
    // INPUTS
    | INgxHelperParamBoolean
    | INgxHelperParamDate
    | INgxHelperParamMenu
    | INgxHelperParamPlate
    | INgxHelperParamSearch
    | INgxHelperParamSelect;

export interface INgxHelperParamOrder {
    title?: string;
    type: 'ASC' | 'DESC';
    options: { id: string; title: string }[];
    default?: string;
    flex?: number;
    width?: number;
}

export interface INgxHelperParamValue {
    page: number;
    params: { [key: string]: { value: any; param: string } };
    order: { type: 'ASC' | 'DESC'; option: string; param: string };
}

export interface INgxHelperParamUpdate {
    [key: string]: any;
}
