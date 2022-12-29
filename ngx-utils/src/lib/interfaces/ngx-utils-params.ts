export interface INgxUtilsParam {
    name: string;
    title?: string;
    english?: boolean;
    value?: string;
    required?: boolean;
}

export interface INgxUtilsParamDate extends Omit<INgxUtilsParam, 'english' | 'value'> {
    type: 'DATE';
    value?: Date;
    minDate?: Date;
    maxDate?: Date;
}

export interface INgxUtilsParamFavorite extends Omit<INgxUtilsParam, 'title' | 'english' | 'value' | 'required'> {
    type: 'FAVORITE';
    value?: boolean;
}

export interface INgxUtilsParamSearch extends Omit<INgxUtilsParam, 'required'> {
    type: 'SEARCH';
}

export interface INgxUtilsParamSelect extends Omit<INgxUtilsParam, 'title'> {
    type: 'SELECT';
    title: string;
    icon?: string;
    options: { id: string; title: string }[];
}
