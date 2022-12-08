export interface INgxUtilsListMenu<D> {
    title: string;
    click: string[] | ((id: string) => void);
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    hideOn?: (data: D) => boolean;
}
