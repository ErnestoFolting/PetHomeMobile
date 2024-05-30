using Microsoft.EntityFrameworkCore.Migrations;
using System.Reflection;

#nullable disable

namespace backendPetHome.DAL.Migrations
{
    public partial class addDBFunctions : Migration
    {
        private string _projectDirectory;
        public addDBFunctions()
        {
            _projectDirectory = Directory.GetCurrentDirectory();

            // Navigate up to the solution root
            while (!Directory.GetFiles(_projectDirectory, "*.sln").Any())
            {
                DirectoryInfo parent = Directory.GetParent(_projectDirectory);
                if (parent == null)
                {
                    Console.WriteLine("Solution file not found. Unable to determine solution root.");
                    return;
                }
                _projectDirectory = parent.FullName;
            }
        }

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string[] fileNames = Directory.GetFiles(Path.Combine(_projectDirectory, "DAL/Data/FunctionsUp"), "*.sql");
            fileNames.OrderBy(el => new FileInfo(el).CreationTime);
            foreach (string file in fileNames)
            {
                var sql = File.ReadAllText(file);
                migrationBuilder.Sql(sql);
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            string[] fileNames = Directory.GetFiles(Path.Combine(_projectDirectory, "DAL/Data/FunctionsDown"), "*.sql");
            fileNames.OrderByDescending(el => new FileInfo(el).CreationTime);
            foreach (string file in fileNames)
            {
                var sql = File.ReadAllText(file);
                migrationBuilder.Sql(sql);
            }
        }
    }
}
