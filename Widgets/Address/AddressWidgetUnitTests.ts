/// <reference path="Address.ts" />
/// <reference path="AddressWidget.ts" />
/// <reference path="PageDriver.ts" />
/// <reference path="AddressMock.ts" />
/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />
/// <reference path="../Scripts/typings/sinon/sinon.d.ts" />
/// <reference path="../Scripts/typings/jqueryui/jqueryui.d.ts" />

//#region test initialisation
var testAddressEditor;
var page;
var addressMock;
QUnit.module("", {
    setup: () => {
        var editor = cloneAddressEditor();
        page = new PageDriver(editor);
        addressMock = new AddressMock();
    },

    teardown: () => {
        addressMock.Restore();
        //addressEditor.addressForm("destroy");
    }
});

function cloneAddressEditor() {
    testAddressEditor = $("#AddressEditor")
        .clone(true)
        .prop({ id: "testAddressEditor" })
        .appendTo($("#qunit-fixture"));

    return testAddressEditor;
}
//#endregion

//#region helper methods

function initFormControl() {
    testAddressEditor.addressEditor({
        address: addressMock.Address
    });
}

//#endregion

test("given postcode typed in when control looses focus then sets postcode in Address entity", () => {

    addressMock.ExpectsPostcodeSet(12305);
    initFormControl();

    page.enterPostcode(12305);

    addressMock.Verify();
});

test("given user entered valid postcode when promise resolved then sets towns list with result", () => {

    addressMock.ExpectsPostcodeSet(12305);
    initFormControl();

    page.enterPostcode(12305);

    var items = page.getTowns();

    equal(items.length, 1);
    equal($(items[0]).text(), "Berlin");
    equal($(items[0]).prop("id"), "04617500");
});

test("given user entered postcode when loading data from server then shows busy indicator", () => {

    addressMock.StubServerHang();
    initFormControl();

    page.enterPostcode(12305);

    var items = page.getTowns();

    ok(page.hasTownsBusyIndicator);
});
