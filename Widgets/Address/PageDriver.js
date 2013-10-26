/// <reference path="../Scripts/typings/jqueryui/jqueryui.d.ts" />
var PageDriver = (function () {
    function PageDriver(editor) {
        this._editor = editor;
    }
    PageDriver.prototype.enterPostcode = function (val) {
        $(".addressForm_postcode", this._editor).val(val);
        $(".addressForm_postcode", this._editor).change();
    };

    PageDriver.prototype.getTowns = function () {
        var items = $(".addressForm_town", this._editor).children();
        return items;
    };

    Object.defineProperty(PageDriver.prototype, "hasTownsBusyIndicator", {
        get: function () {
            var el = $(".addressForm_town", this._editor).next();

            return el.is("img");
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PageDriver.prototype, "isTownsListDisabled", {
        get: function () {
            var el = $(".addressForm_town", this._editor);

            return el.prop("disabled") === true;
        },
        enumerable: true,
        configurable: true
    });
    return PageDriver;
})();
//# sourceMappingURL=PageDriver.js.map
