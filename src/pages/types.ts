export enum FORM_MODE_ENUM {
    EDIT = 'edit',
    ADD = 'add',
    PREVIEW = 'preview',
}

export interface FORM_MODE {
    mode: FORM_MODE_ENUM.EDIT | FORM_MODE_ENUM.ADD | FORM_MODE_ENUM.PREVIEW;
}
