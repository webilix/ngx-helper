export type NgxUtilsConfirm = 'ACTIVE' | 'BLOCK' | 'DEACTIVE' | 'DELETE';

export interface INgxUtilsConfirm {
    title: string;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
}

export const NgxUtilsConfirmInfo: { [key in NgxUtilsConfirm]: INgxUtilsConfirm } = {
    ACTIVE: { title: 'فعال', icon: 'check_box', color: 'primary' },
    BLOCK: { title: 'مسدود', icon: 'disabled_by_default', color: 'warn' },
    DEACTIVE: { title: 'غیرفعال', icon: 'disabled_by_default', color: 'warn' },
    DELETE: { title: 'حذف', icon: 'delete', color: 'warn' },
};
