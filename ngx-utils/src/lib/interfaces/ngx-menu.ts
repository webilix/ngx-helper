export interface INgxUtilsMenu {
    title: string;
    click: string[] | (() => void);
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
    hideOn?: () => boolean;
}
