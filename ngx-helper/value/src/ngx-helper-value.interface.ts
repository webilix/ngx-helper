import { NgxHelperValue } from './ngx-helper-value.type';

export interface INgxHelperValue {
    title: string;
    value: NgxHelperValue;
    description?: string;
    block?: boolean;
    copy?: boolean;
}
