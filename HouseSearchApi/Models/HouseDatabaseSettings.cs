using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HouseSearchApi.Models 
{
    public class HouseDatabaseSettings : IHouseDatabaseSettings
    {
        public string HouseCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IHouseDatabaseSettings
    {
        string HouseCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}