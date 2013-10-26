/// <reference path="Address.ts" />
/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />
/// <reference path="../Scripts/typings/sinon/sinon.d.ts" />
//#region test initialisation
var ajaxStub = null;
var address = null;
QUnit.module("", {
    setup: function () {
        StubGetTownsList();
        address = new AddressEditor.Address("/getTownsList/");
    },
    teardown: function () {
        if (ajaxStub !== null)
            ajaxStub.restore();
    }
});

function StubGetTownsList() {
    ajaxStub = sinon.stub(jQuery, "ajax", function (args) {
        var d = $.Deferred();

        var postcode = parseInt(args.url.substring(14));

        switch (postcode) {
            case 12305:
                d.resolve([{ Name: "Berlin", DestinationAlphanumber: "04617500" }]);
                break;
            default:
                d.reject(null, null, "invalid postcode: " + postcode);
                break;
        }

        return d;
    });
}

function StubGetTownsListToNeverFinish() {
    ajaxStub.restore();
    ajaxStub = sinon.stub(jQuery, "ajax", function (args) {
        var d = $.Deferred();
        return d;
    });
}

//#endregion
//#region
test("given no state when setting postcode then sends request to server", 1, function () {
    address.setPostcode(12305);

    var m = sinon.match({ url: "/getTownsList/12305" });
    ok(ajaxStub.calledWithMatch(m), "expected ajax call to server to url: /getTownsList with args: postcode=12305");
});

test("given postcode set when request to server sent then returns promise with list of towns", 1, function () {
    var promise = address.setPostcode(12305);

    promise.done(function (r) {
        deepEqual(r, [new AddressEditor.TownDto("Berlin", "04617500")], "expected result to contain Berlin");
    });
});

test("given valid postcode when request to server done then sets towns list", 1, function () {
    var promise = address.setPostcode(12305);

    promise.done(function (r) {
        var expected = [new AddressEditor.TownDto("Berlin", "04617500")];
        deepEqual(address.townsList, expected, "expected result to contain Berlin");
    });
});

test("given invalid postcode when request returns from server then promise is rejected", 1, function () {
    var promise = address.setPostcode(12345);

    promise.fail(function (a, b, m) {
        equal(m, "invalid postcode: 12345");
    });
});

test("given request in progress when accessing townsList then fails", 1, function () {
    StubGetTownsListToNeverFinish();

    var promise = address.setPostcode(12305);

    raises(function () {
        var l = address.townsList;
    }, function (e) {
        return e instanceof AddressEditor.OperationInProgressException && e.message === "Operation in progress. Cannot access TownsList property while data is still loading. Please use promise.done to access data.";
    }, "Expected exception to be thrown.");
});
//# sourceMappingURL=AddressUnitTests.js.map
