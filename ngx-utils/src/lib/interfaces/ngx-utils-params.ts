export interface INgxUtilsParamsDate {
    type: 'DATE';
    name: string;
    title?: string;
}

export interface INgxUtilsParamsSearch {
    type: 'SEARCH';
    name: string;
    title?: string;
    english?: boolean;
}

export interface INgxUtilsParamsSelect {
    type: 'SELECT';
    name: string;
    title: string;
    english?: boolean;
    icon?: string;
    options: { id: string; title: string }[];
}
