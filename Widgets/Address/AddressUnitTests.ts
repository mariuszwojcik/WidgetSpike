/// <reference path="Address.ts" />
/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />
/// <reference path="../Scripts/typings/sinon/sinon.d.ts" />

//#region test initialisation
var ajaxStub = null;
var address = null;
QUnit.module("", {
    setup: () => {
        StubGetTownsList();
        address = new AddressEditor.Address("/getTownsList");
    },

    teardown: () => {
        if (ajaxStub !== null)
            ajaxStub.restore();
    }
});

function StubGetTownsList() {

    ajaxStub = sinon.stub(jQuery, "ajax", (args) => {
        var d = $.Deferred();

        switch (args.data.postcode) {
            case 12305:
                d.resolve([{ Name: "Berlin", DestinationAlphanumber: "04617500" }]);
                break;
            default:
                d.reject("invalid postcode: " + args.data.postcode);
                break;
        }

        return d;
    });

}

function StubGetTownsListToNeverFinish() {

    ajaxStub.restore();
    ajaxStub = sinon.stub(jQuery, "ajax", (args) => {
        var d = $.Deferred();
        return d;
    });

}
//#endregion

//#region

test("given no state when setting postcode then sends request to server", 1, () => {

    address.setPostcode(12305);

    var m = sinon.match({ url: "/getTownsList", data: { postcode: 12305 } });
    ok(ajaxStub.calledWithMatch(m), "expected ajax call to server to url: /getTownsList with args: postcode=12305");

});

test("given postcode set when request to server sent then returns promise with list of towns", 1, () => {

    var promise = address.setPostcode(12305);

    promise.done((r: any) => {
        deepEqual(r, [new AddressEditor.TownDto("Berlin", "04617500")], "expected result to contain Berlin");
    });

});

test("given valid postcode when request to server done then sets towns list", 1, () => {

    var promise = address.setPostcode(12305);

    promise.done((r: any) => {
        var expected = [new AddressEditor.TownDto("Berlin", "04617500")];
        deepEqual(address.townsList, expected, "expected result to contain Berlin");
    });

});

test("given invalid postcode when request returns from server then promise is rejected", 1, () => {

    var promise = address.setPostcode(12345);

    promise.fail((m) => {
        equal(m, "invalid postcode: 12345");
    });

});

test("given request in progress when accessing townsList then fails", 1, () => {

    StubGetTownsListToNeverFinish();

    var promise = address.setPostcode(12305);

    raises(() => {
        var l = address.townsList;
    }, (e) => {
        return e instanceof AddressEditor.OperationInProgressException
            && e.message === "Operation in progress. Cannot access TownsList property while data is still loading. Please use promise.done to access data.";
    }, "Expected exception to be thrown.");

});

//#endregion