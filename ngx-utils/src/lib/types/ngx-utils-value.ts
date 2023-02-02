export type NgxUtilsValue =
    | string
    | { type: 'BANK-CARD'; value: string; view?: 'CARD' | 'BANK'; english?: true; join?: string }
    | { type: 'DATE'; value: Date; format?: string | 'FULL' | 'DATE' | 'TIME'; timezone?: string }
    | {
          type: 'DURATION';
          value: number | Date | { from: Date; to?: Date };
          english?: boolean;
          format?: 'FULL' | 'DAY' | 'HOUR';
      }
    | { type: 'ENGLISH'; value: string }
    | { type: 'MOBILE'; value: string; english?: true; join?: string }
    | { type: 'MULTILINE'; value: string; english?: boolean; html?: boolean }
    | { type: 'NUMBER'; value: number; english?: boolean }
    | { type: 'PRICE'; value: number; currency?: string; english?: boolean; short?: boolean }
    | { type: 'WEIGHT'; value: number; english?: boolean; short?: boolean };

export interface INgxUtilsValues {
    title: string;
    value: NgxUtilsValue;
    block?: boolean;
    copy?: boolean;
}
