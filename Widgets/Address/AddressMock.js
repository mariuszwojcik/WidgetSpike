var AddressMock = (function () {
    function AddressMock() {
        this._address = new AddressEditor.Address("");
        this._addressMock = sinon.mock(this._address);
    }
    AddressMock.prototype.ExpectsPostcodeSet = function (postcode) {
        var d = $.Deferred();
        d.resolve([new AddressEditor.TownDto("Berlin", "04617500")]);

        this._addressMock.expects("setPostcode").withExactArgs(postcode).once().returns(d);
    };

    AddressMock.prototype.ExpectToFailOnPostcodeSet = function (postcode) {
        var d = $.Deferred();
        d.fail(null, null, "Invalid postcode: " + postcode);

        this._addressMock.expects("setPostcode").withExactArgs(postcode).once().returns(d);
    };

    AddressMock.prototype.StubServerHang = function (postcode) {
        var d = $.Deferred();

        this._addressMock.expects("setPostcode").withExactArgs(postcode).once().returns(d);
    };

    AddressMock.prototype.Verify = function () {
        this._addressMock.verify();
    };

    AddressMock.prototype.Restore = function () {
        this._addressMock.restore();
    };

    Object.defineProperty(AddressMock.prototype, "Address", {
        get: function () {
            return this._address;
        },
        enumerable: true,
        configurable: true
    });
    return AddressMock;
})();
//# sourceMappingURL=AddressMock.js.map
