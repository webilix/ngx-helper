export interface INgxHelperConfirm {
    title: string;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
}

export interface INgxHelperConfirmConfig {
    title: string;
    message: string;
    question: string;
    description: boolean | 'REQUIRED';
}

export interface INgxHelperConfirmResponse {
    confirmed: boolean;
    value?: any;
}
