using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HouseSearchApi.Models 
{
    public class House
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public decimal Rent { get; set; }
        public decimal Price { get; set; }
        public string LandSize { get; set; }
        public Address Address { get; set; }
        public IList<School> Schools { get; set; }
        public IList<Station> Stations { get; set; }
        public IList<BusStop> BusStops { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }        
    }
}