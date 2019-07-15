using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HouseSearchApi.Services;
using HouseSearchApi.Models;

namespace HouseSearchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseController : ControllerBase
    {
        private readonly HouseService _houseService;
        public HouseController(HouseService houseService)
        {
            _houseService = houseService;
        }

        [HttpGet]
        public ActionResult<HouseResponse> Get() =>
            new HouseResponse { Houses = _houseService.Get() };

        [HttpGet("{id:length(24)}", Name = "GetHouse")]
        public ActionResult<House> Get(string id)
        {
            var house = _houseService.Get(id);

            if (house == null)
            {
                return NotFound();
            }

            return house;
        }   

        [HttpPost]
        public ActionResult<House> Create(House house)
        {
            _houseService.Create(house);

            return CreatedAtRoute("GetHouse", new { id = house.Id.ToString() }, house);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, House houseIn)
        {
            var house = _houseService.Get(id);

            if (house == null)
            {
                return NotFound();
            }

            _houseService.Update(id, houseIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var house = _houseService.Get(id);

            if (house == null)
            {
                return NotFound();
            }

            _houseService.Remove(house.Id);

            return NoContent();
        }
    }
}