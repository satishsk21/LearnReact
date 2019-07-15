using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HouseSearchApi.Models 
{
    public class Station
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsParkingAvailable { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}