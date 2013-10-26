/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

module AddressEditor {

    export class Address {
        private _getTownsListUrl: string = "/api/Address/";

        private _loadingData = false;
        private _townsList = [];

        constructor(getTownsListUrl: string) {
            this._getTownsListUrl = getTownsListUrl;

        }


        get townsList(): TownDto[] {
            if (this._loadingData)
                throw new OperationInProgressException("Operation in progress. Cannot access TownsList property while data is still loading. Please use promise.done to access data.");

            return this._townsList;
        }
        
        public setPostcode(value: number) {

            this._loadingData = true;
            var url = this._getTownsListUrl + value;
            var result = $.get(url);
            
            var promise = result.pipe((ajaxResult) => {
                var result = [];
                $.each(ajaxResult, (idx, item) => {
                    result.push(new TownDto(item.Name, item.DestinationAlphanumber));
                });
                return result;
            });

            promise.done((towns) => {
                this._townsList = towns;
            }).fail((a,b,c,d,e) => {
                console.log(c);
            }).always(() => {
                this._loadingData = false;
            });

            return promise;
        }
    }

    export class TownDto {
        private _townName: string;
        private _destAN: string;

        constructor(townName: string, destAN: string) {
            this._townName = townName;
            this._destAN = destAN;
        }

        get TownName(): string {
            return this._townName;
        }

        get DestinationAlphanumber(): string {
            return this._destAN;
        }
    }

    export class OperationInProgressException {
        public message: string;

        constructor(message: string) {
            this.message = message;
        }
    }
}
