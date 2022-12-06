export interface INgxUtilsListMenu<D> {
    title: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    route?: string[];
    action?: (id: string) => void;
    hideOn?: (data: D) => boolean;
}
