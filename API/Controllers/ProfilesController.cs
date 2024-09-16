using API.DTOs;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = username }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto updateProfileDto)
        {
            return HandleResult(await Mediator.Send(new Edit.Command
            {
                DisplayName = updateProfileDto.DisplayName,
                Bio = updateProfileDto.Bio
            }));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query
            { UserName = username, Predicate = predicate }));
        }
    }
}