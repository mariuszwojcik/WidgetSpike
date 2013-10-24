/// <reference path="../Scripts/typings/jqueryui/jqueryui.d.ts" />

class PageDriver {
    private _editor;

    constructor(editor: any) {
        this._editor = editor;
    }

    public enterPostcode(val: number) {
        $(".addressForm_postcode", this._editor).val(12305);
        $(".addressForm_postcode", this._editor).change();
    }

    public getTowns(): any {
        var items = $(".addressForm_town", this._editor).children();
        return items;
    }

    public get hasTownsBusyIndicator(): boolean {
        var el = $(".addressForm_town", this._editor).next();

        return el.is("img");
    }
}
