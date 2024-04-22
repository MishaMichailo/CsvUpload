using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;

namespace CsvUpload.DTO
{
    public class DataDTO
    {
        [Name("Name")]
        public string Name { get; set; }
        [Name("DOB")]
        public DateTime DateOfBirth { get; set; }
        [Name("Married")]
        public bool Married { get; set; }
        [Name("Phone")]
        public string Phone { get; set; }
        [Name("Salary")]
        public decimal Salary { get; set; }
    }
}
