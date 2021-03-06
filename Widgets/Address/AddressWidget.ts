/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="../Scripts/typings/jquery.validation/jquery.validation.d.ts" />
/// <reference path="Address.ts" />

interface JQuery {
    addressEditor(): JQuery;
    addressEditor(settings: Object): JQuery;
}

interface Validator {
    unobtrusive: any;
}

//#region setup validator methods

    jQuery.validator.addMethod('postcodeIsValid', function (value, element, params) {
        var val = $(element).prop("postcodeIsValid-value");
        var valid = val === false ? false : true;
        return valid;
    });

    jQuery.validator.unobtrusive.adapters.add('postcodeIsValid', {}, function (options) {
        options.rules['postcodeIsValid'] = {};
        options.messages['postcodeIsValid'] = options.message;
    });
    jQuery.validator.unobtrusive.parse('form');

//#endregion


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
                    //console.log(val);

                    var loader = $("<img src ='/Content/ajax-loader.gif'/ >").insertAfter($(".addressForm_town", $this.element));
                    $(".addressForm_town", this.element).empty();
                    $(".addressForm_town", this.element).prop("disabled", true);

                    $(".addressForm_postcode", this.element).prop("postcodeIsValid-value", true);
                    $this.address.setPostcode(val)
                        .done(t => {
                            $(".addressForm_postcode", $this.element).prop("postcodeIsValid-value", true).valid();
                            $.each(t, (idx, i) => {
                                var opt = $("<option />").text(i.TownName).prop("id", i.DestinationAlphanumber);
                                $(".addressForm_town", $this.element).append(opt)
                            });
                        }).fail((a,b,c) => {
                            //console.error(c);
                            $(".addressForm_postcode", $this.element).prop("postcodeIsValid-value", false).valid();
                        }).always(() => {
                            loader.remove();
                            $(".addressForm_postcode", $this.element).prop("postcodeIsValid-value", true);
                            $(".addressForm_town", $this.element).prop("disabled", false);
                        });
                })

        },

        _destroy: function () {
            this.element.remove();
        }
    });
});
