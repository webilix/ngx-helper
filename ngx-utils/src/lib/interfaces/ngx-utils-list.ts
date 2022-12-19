export interface INgxUtilsListMenu<D> {
    icon: string;
    title: string;
    click: string[] | ((id: string) => void);
    color?: 'primary' | 'accent' | 'warn';
    hideOn?: (data: D) => boolean;
    disableOn?: (data: D) => boolean;
}
