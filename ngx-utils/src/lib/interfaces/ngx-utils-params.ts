export interface INgxUtilsParam {
    name: string;
    title?: string;
    english?: boolean;
}

export interface INgxUtilsParamDate extends Omit<INgxUtilsParam, 'english'> {
    type: 'DATE';
}

export interface INgxUtilsParamFavorite extends Omit<INgxUtilsParam, 'title' | 'english'> {
    type: 'FAVORITE';
}

export interface INgxUtilsParamSearch extends INgxUtilsParam {
    type: 'SEARCH';
}

export interface INgxUtilsParamSelect extends Omit<INgxUtilsParam, 'title'> {
    type: 'SELECT';
    title: string;
    icon?: string;
    options: { id: string; title: string }[];
}
