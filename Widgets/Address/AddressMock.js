var AddressMock = (function () {
    function AddressMock() {
        this._address = new AddressEditor.Address("");
        this._addressMock = sinon.mock(this._address);
    }
    AddressMock.prototype.ExpectsPostcodeSet = function (postcode) {
        var d = $.Deferred();

        //d.resolve([{ TownName: "Berlin", DestinationAlphanumber: "04617500" }]);
        d.resolve([new AddressEditor.TownDto("Berlin", "04617500")]);

        this._addressMock.expects("setPostcode").withExactArgs(postcode).once().returns(d);
    };

    AddressMock.prototype.StubServerHang = function () {
        var d = $.Deferred();

        //d.resolve([{ townname: "Berlin", destinationAlphanumber: "04617500" }]);
        this._addressMock.expects("setPostcode").once().returns(d);
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
