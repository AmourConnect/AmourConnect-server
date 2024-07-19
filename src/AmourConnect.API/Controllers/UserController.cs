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

            var AllUsers = await _userCase.GetUsersToMach();

            if (AllUsers.message == "user JWT deconnected")
            {
                return Unauthorized();
            }

            return Ok(AllUsers.UsersToMatch);
        }



        [HttpGet("GetUserConnected")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUserOnly()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userDto = await _userCase.GetUserOnly();

            if (userDto.message == "user JWT deconnected")
            {
                return Unauthorized();
            }

            return Ok(userDto.UserToMatch);
        }


        [HttpPatch("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromForm] SetUserUpdateDto setUserUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userCase.UpdateUser(setUserUpdateDto);

            if (result.message == "user JWT deconnected")
            {
                return Unauthorized();
            }

            return NoContent();
        }


        [HttpGet("GetUser/{Id_User}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUser([FromRoute] int Id_User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userDto = await _userCase.GetUser(Id_User);

            if (userDto.message == "user JWT deconnected")
            {
                return Unauthorized();
            }

            if (userDto.message == "no found :/")
            {
                return NotFound();
            }

            return Ok(userDto.userID);
        }
    }
}