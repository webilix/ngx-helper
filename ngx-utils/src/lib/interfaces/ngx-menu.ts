export interface INgxUtilsMenu {
    title: string;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
    route?: string[];
    action?: () => void;
}
