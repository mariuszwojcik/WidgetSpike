class AddressMock {
    _address: AddressEditor.Address;
    _addressMock: any;

    constructor() {
        this._address = new AddressEditor.Address("");
        this._addressMock = sinon.mock(this._address);
    }

    public ExpectsPostcodeSet(postcode: number) {
        var d = $.Deferred();
        d.resolve([new AddressEditor.TownDto("Berlin", "04617500")]);

        this._addressMock.expects("setPostcode")
            .withExactArgs(postcode)
            .once()
            .returns(d);

    }

    public ExpectToFailOnPostcodeSet(postcode: number) {
        var d = $.Deferred();
        d.reject(null, null, "Invalid postcode: " + postcode);

        this._addressMock.expects("setPostcode")
            .withExactArgs(postcode)
            .once()
            .returns(d);
    }

    public StubServerHang(postcode: number) {
        var d = $.Deferred();

        this._addressMock.expects("setPostcode")
            .withExactArgs(postcode)
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