class AddressMock {
    _address: AddressEditor.Address;
    _addressMock: any;

    constructor() {
        this._address = new AddressEditor.Address("");
        this._addressMock = sinon.mock(this._address);
    }

    public ExpectsPostcodeSet(postcode: number) {
        var d = $.Deferred();
        //d.resolve([{ TownName: "Berlin", DestinationAlphanumber: "04617500" }]);
        d.resolve([new AddressEditor.TownDto("Berlin", "04617500")]);

        this._addressMock.expects("setPostcode")
            .withExactArgs(postcode)
            .once()
            .returns(d);

    }

    public StubServerHang() {
        var d = $.Deferred();
        //d.resolve([{ townname: "Berlin", destinationAlphanumber: "04617500" }]);

        this._addressMock.expects("setPostcode")
            .once()
            .returns(d);
    }

    public Verify() {
        this._addressMock.verify();
    }

    public Restore() {
        this._addressMock.restore();
    }

    public get Address(): any {
        return this._address;
    }
}