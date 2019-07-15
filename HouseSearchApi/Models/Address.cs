using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HouseSearchApi.Models 
{
    public class Address
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Line1 { get; set; }
        public string  Line2 { get; set; }
        public string Suburb { get; set; }
        public string Postcode { get; set; }
        public string State { get; set; }

        public string AddressString => $"{Line1} {Line2} {Suburb} {State} {Postcode}";
    }
}