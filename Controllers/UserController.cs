using Microsoft.AspNetCore.Mvc;
using CsvUpload.DTO;
using CsvUpload.Data;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using CsvUpload.Models;

namespace CsvUpload.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public UserController(DbContextApplication context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public IActionResult Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var userDataList = new List<DataDTO>();
            CsvConfiguration config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true
            };

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, config))
            {
                userDataList = csv.GetRecords<DataDTO>().ToList();
            }

            var dataModels = userDataList.Select(dto => new DataModel
            {
                Name = dto.Name,
                DateOfBirth = dto.DateOfBirth,
                Married = dto.Married,
                Phone = dto.Phone,
                Salary = dto.Salary
            });

            _context.DataModels.AddRange(dataModels);
            _context.SaveChanges();

            return Ok(userDataList);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _context.DataModels.ToList();

            if (allUsers == null || allUsers.Count == 0)
            {
                return NotFound("No users found.");
            }

            return Ok(allUsers);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var userToDelete = _context.DataModels.FirstOrDefault(x => x.Id == id);

            if (userToDelete == null)
            {
                return NotFound("User not found.");
            }

            _context.DataModels.Remove(userToDelete);
            _context.SaveChanges();

            return Ok("User deleted successfully.");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] DataModel updatedUserData)
        {
            var existingUser = _context.DataModels.FirstOrDefault(x => x.Id == id);

            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            existingUser.Name = updatedUserData.Name;
            existingUser.DateOfBirth = updatedUserData.DateOfBirth;
            existingUser.Married = updatedUserData.Married;
            existingUser.Phone = updatedUserData.Phone;
            existingUser.Salary = updatedUserData.Salary;

            _context.SaveChanges();

            return Ok("User updated successfully.");
        }

    }
}