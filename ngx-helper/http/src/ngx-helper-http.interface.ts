export interface INgxHelperHttpUpload {
    header: { [key: string]: any };
    body: { [key: string]: any };
    maxSize: string; //{#}{B, KB, MB, GB, TB}
    mimes: string[];
}
