import { NgxHelperValue } from '@webilix/ngx-helper/value';

export interface INgxHelperTag {
    value: NgxHelperValue;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
    description?: string;
    click?: string[] | (() => void);
}
