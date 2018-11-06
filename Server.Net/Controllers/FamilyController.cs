using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Server.Net.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Server.Net.Services;
using Server.Net.Dtos;
using Server.Net.Entities;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FamilyController : ControllerBase
    {
        private IFamilyService _familyService;
        private readonly AppSettings _appSettings;

        public FamilyController(
            IFamilyService familyService,
            IOptions<AppSettings> appSettings)
        {
            _familyService = familyService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("AddMember")]
        public IActionResult AddMember([FromBody]Member memberParam)
        {
            try{
                var member = _familyService.AddMember(memberParam);
                return Ok(member);
            }
            catch(AppException ex) {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetMembers(int parentid)
        {
            var members = _familyService.GetMembers(parentid);
            return Ok(members);
        }
        [HttpPut("{id}")]
        public IActionResult Update([FromBody]Member memberParam)
        {
            // map dto to entity and set id
            try
            {
                // save 
                Member member = _familyService.Update(memberParam);
                return Ok(member);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _familyService.Delete(id);
            return Ok();
        }
    }
}