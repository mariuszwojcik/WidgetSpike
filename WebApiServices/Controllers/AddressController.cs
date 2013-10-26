using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiServices.Controllers
{
    public class AddressController : ApiController
    {
        public IEnumerable<int> Get()
        {
            return new[] { 1465, 12305, 74172 };
        }

        public IEnumerable<TownData> Get(int postcode)
        {
            switch (postcode)
            {
                case 1465:
                    return new[]
                        {
                            new TownData("33992000", "Langebrück"),
                            new TownData("53862100", "Schönborn")
                        };

                case 12305:
                    return new[]
                        {
                            new TownData("04617500", "Berlin")
                        };

                case 74172:
                    return new[]
                        {
                            new TownData("40358000", "Neckarsulm")
                        };
            }


            var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("Invalid postcode {0}. Call /api/Address for list of all valid postcodes.", postcode)),
                    ReasonPhrase = "Postcode Not Found"
                };
            throw new HttpResponseException(resp);
        }

        public IEnumerable<StreetData> Get(int postcode, string da)
        {
            switch (postcode)
            {
                case 1465:
                    if (da == "33992000")
                        return new[]
                            {
                                new StreetData("33992000", "Gänsefuß"),
                                new StreetData("33992000", "Rudolf-Trache-Str.")
                            };

                    if (da == "53862100")
                        return new[]
                            {
                                new StreetData("53862100", "Am Hofgut"),
                                new StreetData("53862100", "Blumenstr.")
                            };
                    break;

                case 12305:
                    if (da == "04617500")
                        return new[]
                            {
                                new StreetData("04617500", "Kraatzweg"),
                                new StreetData("04617500", "Krontalstr.")
                            };
                    break;

                case 74172:
                    if (da == "40358000")
                        return new[]
                            {
                                new StreetData("40358000", "Ahornweg"),
                                new StreetData("40358000", "Albstr.")
                            };
                    break;
            }

            var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
            {
                Content = new StringContent(string.Format("Invalid postcode ({0}) or destinationAlphanumber ({1}). Call /api/Address/{0} for list of all valid towns.", postcode, da)),
                ReasonPhrase = "DestinationAlphanumber or Postcode Not Found"
            };
            throw new HttpResponseException(resp);
        }
    }

    public class TownData
    {
        public string DestinationAlphanumber { get; set; }
        public string Name { get; set; }

        public TownData()
        {
        }

        public TownData(string destinationAlphanumber, string name)
        {
            DestinationAlphanumber = destinationAlphanumber;
            Name = name;
        }
    }

    public class StreetData
    {
        public string DestinationAlphanumber { get; set; }
        public string FullStreetName { get; set; }

        public StreetData()
        {
        }

        public StreetData(string destinationAlphanumber, string fullStreetName)
        {
            DestinationAlphanumber = destinationAlphanumber;
            FullStreetName = fullStreetName;
        }
    }
}