using System.Collections.Generic;

namespace HouseSearchApi.Models 
{
    public class HouseResponse
    {
        public IList<House> Houses { get; set; }
    }
}