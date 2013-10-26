/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="Address.ts" />

interface JQuery {
    addressEditor(): JQuery;
    addressEditor(settings: Object): JQuery;
}


$(function () {
    $.widget("custom.addressEditor", {
        options: {
            getTownsListWebApiUrl: "/api/Address/GetTowns",

            address: null
        },

        _create: function () {
            this.address = this.options.address !== null
            ? this.options.address
            : new AddressEditor.Address(this.options.getTownsListWebApiUrl);

            this._initPostcode();
        },

        Address: function () {
            return this.address;
        },

        _initPostcode: function () {
            var $this = this;
            
            $(".addressForm_postcode", this.element)
                .change(() => {
                    var val = parseInt($(".addressForm_postcode", $this.element).val());
                    console.log(val);

                    var loader = $("<img src ='/Content/ajax-loader.gif'/ >").insertAfter($(".addressForm_town", $this.element));
                    $(".addressForm_town", this.element).empty();
                    $(".addressForm_town", this.element).prop("disabled", true);


                    $this.address.setPostcode(val)
                        .done(t => {
                            var $el = this.element;
                            $.each(t, (idx, i) => {
                                var opt = $("<option />").text(i.TownName).prop("id", i.DestinationAlphanumber);
                                $(".addressForm_town", $el).append(opt)
                            });
                        }).fail((a,b,c) => {
                            console.error(c);
                        }).always(() => {
                            loader.remove();
                            $(".addressForm_town", this.element).prop("disabled", false);
                        });
                })

        },

        _destroy: function () {
            this.element.remove();
        }
    });
});
