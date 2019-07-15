using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HouseSearchApi.Models 
{
    public class School
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public Address Address { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}