using HouseSearchApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace HouseSearchApi.Services
{
    public class HouseService
    {
        private readonly string _apiKey;
        private readonly IMongoCollection<House> _houses;

        public HouseService(IHouseDatabaseSettings settings, IApiSettings apiSettings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _houses = database.GetCollection<House>(settings.HouseCollectionName);
            _apiKey = apiSettings.ApiKey;
        }

        public List<House> Get() =>
            _houses.Find(book => true).ToList();

        public House Get(string id) =>
            _houses.Find<House>(house => house.Id == id).FirstOrDefault();

        public House Create(House house)
        {
            LoadLatAndLongValues(house);
            _houses.InsertOne(house);
            return house;
        }

        private void LoadLatAndLongValues(House house)
        {
            var httpClient = new HttpClient { BaseAddress = new Uri("https://maps.googleapis.com/maps/api/geocode/") };
            var response = httpClient.GetAsync($"json?address={house.Address?.AddressString}&key={_apiKey}").Result;
            if (response.IsSuccessStatusCode)
            {
                var apiResponse = response.Content.ReadAsAsync<AddressLookupResponse>().Result;
                if (apiResponse?.Results?.Count > 0)
                {
                    house.Latitude = (double)apiResponse?.Results[0].geometry?.location?.lat;
                    house.Longitude = (double)apiResponse?.Results[0].geometry?.location?.lng;
                }                
            }

            // Load Lat & Lng
            LoadStationLocationDetails(httpClient, house);
            LoadSchoolLocationDetails(httpClient, house);            
        }

        private void LoadSchoolLocationDetails(HttpClient httpClient, House house)
        {
            if (house.Schools.Count == 0)
                return;

            foreach(var school in house.Schools)
            {
                if (school?.Address == null) continue;
                if (school.Latitude != 0 && school.Longitude != 0) continue;

                var schoolAddress = $"{school.Name} {school.Address.AddressString}";
                var response = httpClient.GetAsync($"json?address={schoolAddress}&key={_apiKey}").Result;
                if (response.IsSuccessStatusCode)
                {
                    var apiResponse = response.Content.ReadAsAsync<AddressLookupResponse>().Result;
                    if (apiResponse?.Results?.Count > 0)
                    {
                        school.Latitude = (double)apiResponse?.Results[0].geometry?.location?.lat;
                        school.Longitude = (double)apiResponse?.Results[0].geometry?.location?.lng;
                    }                
                }
            }
        }

        private void LoadStationLocationDetails(HttpClient httpClient, House house)
        {
            if (house.Stations?.Count == 0)
                return;

            foreach(var station in house.Stations)
            {
                if (station.Latitude != 0 && station.Longitude != 0) continue;

                var stationName = station.Name;
                if (!stationName.EndsWith("station", StringComparison.OrdinalIgnoreCase))
                {
                    stationName = string.Concat(stationName, " Station");
                }
                var response = httpClient.GetAsync($"json?address={station.Name}&key={_apiKey}").Result;
                if (response.IsSuccessStatusCode)
                {
                    var apiResponse = response.Content.ReadAsAsync<AddressLookupResponse>().Result;
                    if (apiResponse?.Results?.Count > 0)
                    {
                        station.Latitude = (double)apiResponse?.Results[0].geometry?.location?.lat;
                        station.Longitude = (double)apiResponse?.Results[0].geometry?.location?.lng;
                    }                
                }
            }
        }

        public void Update(string id, House houseIn)
        {
            LoadLatAndLongValues(houseIn);
            _houses.ReplaceOne(house => house.Id == id, houseIn);
        }
            

        public void Remove(House houseIn) =>
            _houses.DeleteOne(house => house.Id == houseIn.Id);

        public void Remove(string id) => 
            _houses.DeleteOne(house => house.Id == id);
    }
}
