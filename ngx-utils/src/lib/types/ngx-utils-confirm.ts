export type NgxUtilsConfirm = 'ACTIVE' | 'ARCHIVE' | 'BLOCK' | 'DEACTIVE' | 'DELETE';

export interface INgxUtilsConfirm {
    title: string;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
}

export const NgxUtilsConfirmInfo: { [key in NgxUtilsConfirm]: INgxUtilsConfirm } = {
    ACTIVE: { title: 'فعال', icon: 'check_box', color: 'primary' },
    ARCHIVE: { title: 'آرشیو', icon: 'inventory_2', color: 'warn' },
    BLOCK: { title: 'مسدود', icon: 'disabled_by_default', color: 'warn' },
    DEACTIVE: { title: 'غیرفعال', icon: 'disabled_by_default', color: 'warn' },
    DELETE: { title: 'حذف', icon: 'delete', color: 'warn' },
};

export interface INgxUtilsConfirmConfig {
    title: string;
    message: string;
    description: boolean | 'REQUIRED';
}

export interface INgxUtilsConfirmResponse {
    confirmed: boolean;
    value?: any;
}
