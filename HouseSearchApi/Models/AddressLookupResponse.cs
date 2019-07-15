
using System.Collections.Generic;

namespace HouseSearchApi.Models 
{
    public class AddressLookupResponse
    {
        public List<LookupResult> Results { get; set; }
        public string Status { get; set; }
    }

    public class LookupResult
    {
        public string formatted_address { get; set; }
        public Geometry geometry { get; set; }
    }

    public class Geometry
    {
        public GeoLocation location { get; set; }
    }

    public class GeoLocation 
    {
        public double lat { get; set; }
        public double lng { get; set; }
    }
}