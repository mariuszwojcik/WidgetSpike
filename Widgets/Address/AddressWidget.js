/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="Address.ts" />
$(function () {
    $.widget("custom.addressEditor", {
        options: {
            getTownsListWebApiUrl: "/api/Address/GetTowns",
            address: null
        },
        _create: function () {
            this.address = this.options.address !== null ? this.options.address : new AddressEditor.Address(this.options.getTownsListWebApiUrl);

            this._initPostcode();
        },
        Address: function () {
            return this.address;
        },
        _initPostcode: function () {
            var _this = this;
            var $this = this;

            $(".addressForm_postcode", this.element).change(function () {
                var val = parseInt($(".addressForm_postcode", $this.element).val());
                console.log(val);

                var loader = $("<img src ='/Content/ajax-loader.gif'/ >").insertAfter($(".addressForm_town", $this.element));

                $this.address.setPostcode(val).done(function (t) {
                    var $el = _this.element;
                    $.each(t, function (idx, i) {
                        var opt = $("<option />").text(i.TownName).prop("id", i.DestinationAlphanumber);
                        $(".addressForm_town", $el).append(opt);
                    });
                }).fail(function (e) {
                    console.error(e);
                }).always(function () {
                    loader.remove();
                });
            });
        },
        _destroy: function () {
            this.element.remove();
        }
    });
});
//# sourceMappingURL=AddressWidget.js.map
