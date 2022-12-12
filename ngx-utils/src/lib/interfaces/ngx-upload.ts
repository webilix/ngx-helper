export interface INgxUtilsUpload<E> {
    header: { [key: string]: any };
    body: { [key: string]: any };
    maxSize: number;
    mimes: string[];
}
