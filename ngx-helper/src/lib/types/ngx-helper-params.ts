import {
    INgxHelperParamBoolean,
    INgxHelperParamComment,
    INgxHelperParamDate,
    INgxHelperParamPlate,
    INgxHelperParamSearch,
    INgxHelperParamSelect,
} from '../interfaces';

export type NgxHelperParams =
    // SEPERATOR (NEW LINE)
    | 'SEPERATOR'
    // VIEW
    | INgxHelperParamComment
    // INPUTS
    | INgxHelperParamBoolean
    | INgxHelperParamDate
    | INgxHelperParamPlate
    | INgxHelperParamSearch
    | INgxHelperParamSelect;

export interface INgxHelperParamsOrder {
    title?: string;
    type: 'ASC' | 'DESC';
    options: { id: string; title: string }[];
    default?: string;
}

export interface INgxHelperParamsValue {
    page: number;
    params: { [key: string]: { value: any; param: string } };
    order: { type: 'ASC' | 'DESC'; option: string; param: string };
}

export interface INgxHelperParamsUpdate {
    [key: string]: any;
}
