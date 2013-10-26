using System.Collections.Generic;

namespace WebApiServices.Areas.RouteDebugger.Models
{
    public class RouteDataInfo
    {
        public string RouteTemplate { get; set; }

        public KeyValuePair<string, string>[] Data { get; set; }
    }
}
