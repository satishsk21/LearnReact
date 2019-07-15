namespace HouseSearchApi.Models 
{
    public class ApiSettings  : IApiSettings
    {
        public string ApiKey { get; set; }
    }

    public interface IApiSettings 
    {
        string ApiKey {get; set;}
    }
}