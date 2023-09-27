export interface INgxHelperStyle {
    fontSize: string;
    faFont: string;
    enFont: string;

    iconFont: string;
    iconSize: string;

    primaryColor: string;
    accentColor: string;
    warnColor: string;

    borderColor: string;
    backgroundColor: string;

    dialogWidth: string;
}

export interface INgxHelperConfig {
    style?: Partial<INgxHelperStyle>;
    timezone?: string;
    toastXPosition?: 'LEFT' | 'CENTER' | 'RIGHT';
}
