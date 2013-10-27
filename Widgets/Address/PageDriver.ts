/// <reference path="../Scripts/typings/jqueryui/jqueryui.d.ts" />

class PageDriver {
    private _editor;

    constructor(editor: any) {
        this._editor = editor;
    }

    public enterPostcode(val: number) {
        $(".addressForm_postcode", this._editor).val(val);
        $(".addressForm_postcode", this._editor).trigger("change");
        //$(".addressForm_postcode", this._editor).change();
    }

    public getTowns(): any {
        var items = $(".addressForm_town", this._editor).children();
        return items;
    }

    public get hasTownsBusyIndicator(): boolean {
        var el = $(".addressForm_town", this._editor).next();

        return el.is("img");
    }

    public get isTownsListDisabled(): boolean {
        var el = $(".addressForm_town", this._editor);

        return el.prop("disabled") === true;
    }

    public get postcodeValidationMessage(): string {

        var el = $(".field-validation-error[data-valmsg-for='postcode']", this._editor);

        return el.children().text();
    }
}
