using AmourConnect.Domain.Dtos.GetDtos;
using AmourConnect.Domain.Dtos.SetDtos;
using Microsoft.AspNetCore.Mvc;
using AmourConnect.API.Filters;
using AmourConnect.App.Interfaces.Controllers;
namespace AmourConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeUser))]
    public class UserController : Controller
    {
        private readonly IUserCase _userCase;

        public UserController(IUserCase userCase)
        {
            _userCase = userCase;
        }



        [HttpGet("GetUsersToMach")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUsersToMach()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            ICollection<GetUserDto> AllUsers = await _userCase.GetUsersToMach();
            return Ok(AllUsers);
        }



        [HttpGet("GetUserConnected")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUserOnly()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            GetUserDto userDto = await _userCase.GetUserOnly();

            return Ok(userDto);
        }


        [HttpPatch("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromForm] SetUserUpdateDto setUserUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _userCase.UpdateUser(setUserUpdateDto);

            return NoContent();
        }


        [HttpGet("GetUser/{Id_User}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUser([FromRoute] int Id_User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            GetUserDto userDto = await _userCase.GetUser(Id_User);

            if (userDto == null)
            {
                return NotFound();
            }

            return Ok(userDto);
        }
    }
}