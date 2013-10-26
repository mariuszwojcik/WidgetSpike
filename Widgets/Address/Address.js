/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
var AddressEditor;
(function (AddressEditor) {
    var Address = (function () {
        function Address(getTownsListUrl) {
            this._getTownsListUrl = "/api/Address/";
            this._loadingData = false;
            this._townsList = [];
            this._getTownsListUrl = getTownsListUrl;
        }
        Object.defineProperty(Address.prototype, "townsList", {
            get: function () {
                if (this._loadingData)
                    throw new OperationInProgressException("Operation in progress. Cannot access TownsList property while data is still loading. Please use promise.done to access data.");

                return this._townsList;
            },
            enumerable: true,
            configurable: true
        });

        Address.prototype.setPostcode = function (value) {
            var _this = this;
            this._loadingData = true;
            var url = this._getTownsListUrl + value;
            var result = $.get(url);

            var promise = result.pipe(function (ajaxResult) {
                var result = [];
                $.each(ajaxResult, function (idx, item) {
                    result.push(new TownDto(item.Name, item.DestinationAlphanumber));
                });
                return result;
            });

            promise.done(function (towns) {
                _this._townsList = towns;
            }).fail(function (a, b, c, d, e) {
                console.log(c);
            }).always(function () {
                _this._loadingData = false;
            });

            return promise;
        };
        return Address;
    })();
    AddressEditor.Address = Address;

    var TownDto = (function () {
        function TownDto(townName, destAN) {
            this._townName = townName;
            this._destAN = destAN;
        }
        Object.defineProperty(TownDto.prototype, "TownName", {
            get: function () {
                return this._townName;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TownDto.prototype, "DestinationAlphanumber", {
            get: function () {
                return this._destAN;
            },
            enumerable: true,
            configurable: true
        });
        return TownDto;
    })();
    AddressEditor.TownDto = TownDto;

    var OperationInProgressException = (function () {
        function OperationInProgressException(message) {
            this.message = message;
        }
        return OperationInProgressException;
    })();
    AddressEditor.OperationInProgressException = OperationInProgressException;
})(AddressEditor || (AddressEditor = {}));
//# sourceMappingURL=Address.js.map
