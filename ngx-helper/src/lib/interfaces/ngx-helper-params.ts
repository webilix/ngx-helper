export interface INgxHelperParam {
    name: string;
    title?: string;
    english?: boolean;
    value?: string;
    required?: boolean;
}

export interface INgxHelperParamComment extends Omit<INgxHelperParam, 'name' | 'title' | 'value' | 'required'> {
    type: 'COMMENT';
    title: string;
    value: string;
}

export interface INgxHelperParamBoolean extends Omit<INgxHelperParam, 'title' | 'english' | 'value' | 'required'> {
    type: 'BOOLEAN';
    value?: boolean;
    icon?: string;
}

export interface INgxHelperParamDate extends Omit<INgxHelperParam, 'english' | 'value'> {
    type: 'DATE';
    value?: Date;
    minDate?: Date;
    maxDate?: Date;
}

export interface INgxHelperParamMenu extends Omit<INgxHelperParam, 'title' | 'value' | 'required'> {
    type: 'MENU';
    value: string;
    icon?: string;
    options: ({ title: string; value: string; icon?: string; color?: 'primary' | 'accent' | 'warn' } | 'SEPERATOR')[];
}

export interface INgxHelperParamPlate extends Omit<INgxHelperParam, 'english' | 'value' | 'required'> {
    type: 'PLATE';
    value?: string | string[];
    letter?: string;
}

export interface INgxHelperParamSearch extends Omit<INgxHelperParam, 'required'> {
    type: 'SEARCH';
}

export interface INgxHelperParamSelect extends Omit<INgxHelperParam, 'title'> {
    type: 'SELECT';
    title: string;
    icon?: string;
    list?: boolean;
    options: { id: string; title: string }[];
}
