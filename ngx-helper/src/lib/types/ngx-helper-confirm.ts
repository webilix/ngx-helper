export type NgxHelperConfirm = 'ACTIVE' | 'ARCHIVE' | 'BLOCK' | 'DEACTIVE' | 'DELETE';

export interface INgxHelperConfirm {
    title: string;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
}

export const NgxHelperConfirmInfo: { [key in NgxHelperConfirm]: INgxHelperConfirm } = {
    ACTIVE: { title: 'فعال', icon: 'check_box', color: 'primary' },
    ARCHIVE: { title: 'آرشیو', icon: 'inventory_2', color: 'warn' },
    BLOCK: { title: 'مسدود', icon: 'disabled_by_default', color: 'warn' },
    DEACTIVE: { title: 'غیرفعال', icon: 'disabled_by_default', color: 'warn' },
    DELETE: { title: 'حذف', icon: 'delete', color: 'warn' },
};

export interface INgxHelperConfirmConfig {
    title: string;
    message: string;
    description: boolean | 'REQUIRED';
}

export interface INgxHelperConfirmResponse {
    confirmed: boolean;
    value?: any;
}
