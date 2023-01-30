export type NgxUtilsValue =
    | string
    | { type: 'BANK-CARD'; value: string; en?: true; join?: string }
    | { type: 'DATE'; value: Date; format?: string | 'FULL' | 'DATE' | 'TIME'; timezone?: string }
    | {
          type: 'DURATION';
          value: number | Date | { from: Date; to?: Date };
          en?: boolean;
          view?: 'FULL' | 'DAY' | 'HOUR';
      }
    | { type: 'EN'; value: string }
    | { type: 'MOBILE'; value: string; en?: true; join?: string }
    | { type: 'MULTILINE'; value: string; en?: boolean; html?: boolean }
    | { type: 'NUMBER'; value: number; en?: boolean }
    | { type: 'PRICE'; value: number; en?: boolean; short?: boolean }
    | { type: 'WEIGHT'; value: number; en?: boolean; short?: boolean };

export interface INgxUtilsValues {
    title: string;
    value: NgxUtilsValue;
    block?: boolean;
    copy?: boolean;
}
