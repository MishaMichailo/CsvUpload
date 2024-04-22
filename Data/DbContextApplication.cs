using Microsoft.EntityFrameworkCore;
using CsvUpload.Models;



namespace CsvUpload.Data
{
    public class DbContextApplication:DbContext
    {
        public DbContextApplication(DbContextOptions<DbContextApplication> options) : base(options) { }
        public DbSet<DataModel> DataModels { get; set; }
    }
}
