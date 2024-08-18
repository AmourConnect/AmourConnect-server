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
    public class UserController(IUserCase userCase) : Controller
    {
        private readonly IUserCase _userCase = userCase;


        [HttpGet("GetUsersToMach")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUsersToMach()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succes, message, UsersToMatch) = await _userCase.GetUsersToMach();

            JWTDeconnected(message);

            return Ok(UsersToMatch);
        }



        [HttpGet("GetUserConnected")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUserOnly()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succes, message, UserToMatch) = await _userCase.GetUserOnly();

            JWTDeconnected(message);

            return Ok(UserToMatch);
        }


        [HttpPatch("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromForm] SetUserUpdateDto setUserUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succes, message) = await _userCase.UpdateUser(setUserUpdateDto);

            JWTDeconnected(message);

            return NoContent();
        }


        [HttpGet("GetUser/{Id_User}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GetUserDto>))]
        public async Task<IActionResult> GetUser([FromRoute] int Id_User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succes, message, userID) = await _userCase.GetUser(Id_User);

            JWTDeconnected(message);

            return message == "no found :/"
            ? NotFound()
            : Ok(userID);
        }

        private IActionResult JWTDeconnected(string message)
        {
            if (message == "user JWT deconnected")
                return Unauthorized();

            return null;
        }
    }
}