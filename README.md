Також я створив програму, яка створює для мене файл.csv, щоб краще зрозуміти, як працює CsvHelper.

using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Text.Unicode;
using System.Collections.Generic;
using System.Xml;
using System.IO;
using System.Linq;
using NPOI.SS.Formula.Functions;
using CsvHelper;
using System.Globalization;

namespace CodeWars
{
    static class Program
    {
        public static void Main(string[] args)
        {
            var studentObjects = new List<Student>() {
      new Student {
        Name = "Andriy", Married = true, DateOfBirth =  DateTime.Parse("2003-11-20"),Phone ="0991300932",Salary=2000
      },
      new Student {
        Name = "Artur", Married = true, DateOfBirth =  DateTime.Parse("2003-12-20"),Phone ="0991300948",Salary=3000
      },
      new Student {
        Name = "Michailo", Married = false, DateOfBirth =  DateTime.Parse("2005-11-20"),Phone ="0991300968",Salary=500
      },
      new Student {
        Name = "Vadym", Married = true, DateOfBirth =  DateTime.Parse("2007-07-20"),Phone ="0991300987",Salary=1000
      },
      new Student {
        Name = "Anton", Married = false, DateOfBirth =  DateTime.Parse("2008-06-20"),Phone ="0991300999",Salary=700
      },
      new Student {
        Name = "Bogdan", Married = true, DateOfBirth =  DateTime.Parse("2010-11-20"),Phone ="0991300977",Salary=1300
      }
            };

            using (var writer = new StreamWriter(@"F:\students.csv"))

            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(studentObjects);
            }
        }
    }
}
