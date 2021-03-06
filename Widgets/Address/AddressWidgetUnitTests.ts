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

test("given user entered postcode when loading data from server then shows busy indicator", () => {

    addressMock.StubServerHang(12305);
    initFormControl();

    page.enterPostcode(12305);

    var items = page.getTowns();

    ok(page.hasTownsBusyIndicator, "expected bsy indicator to be shown when loading data from server.");
});

test("given user entered valid postcode when loading data from server then disables towns list control", () => {
    addressMock.StubServerHang(12305);
    initFormControl();

    page.enterPostcode(12305);

    ok(page.isTownsListDisabled, "expected towns list to be disabled when loading data from server");
});

test("given user entered valid postcode when promise resolved then sets towns list with result", () => {

    addressMock.ExpectsPostcodeSet(12305);
    initFormControl();

    page.enterPostcode(12305);

    var items = page.getTowns();

    equal(items.length, 1, "expected one town loaded.");
    equal($(items[0]).text(), "Berlin");
    equal($(items[0]).prop("id"), "04617500");
});

test("given user entered valid postcode when promise resolved then hides busy indicator", () => {

    addressMock.ExpectsPostcodeSet(12305);
    initFormControl();

    page.enterPostcode(12305);

    var items = page.getTowns();

    ok(page.hasTownsBusyIndicator === false, "expected loading indicator to be hidden once data has been loaded.");
});

test("given user entered valid post code when data loaded from server then towns list should be enabled", () => {
    addressMock.ExpectsPostcodeSet(12305);
    initFormControl();

    page.enterPostcode(12305);

    var items = page.getTowns();

    ok(page.isTownsListDisabled === false, "expected towns list to be enabled once data has been loaded.");

});

test("given towns list filled when user enters new postcode then clears towns list", () => {

    addressMock.ExpectsPostcodeSet(12305);
    addressMock.StubServerHang(74172);
    initFormControl();

    page.enterPostcode(12305);
    page.enterPostcode(74172);

    var items = page.getTowns();

    equal(items.length, 0, "expected towns list to be cleared when loading data from server.");
});

test("given user entered invalid post code when data loaded from server then shows validation error", 1, () => {

    addressMock.ExpectToFailOnPostcodeSet(12305);
    initFormControl();

    page.enterPostcode(12305);

    var validationError = page.postcodeValidationMessage;
    equal(validationError, "Invalid postcode.", "Expected validation error to be shown.");
});