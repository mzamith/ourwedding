using Microsoft.EntityFrameworkCore.Migrations;

namespace OurWedding.API.Migrations
{
    public partial class AddedWelcomeMessageAndTeam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Team",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WelcomeMessage",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Team",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WelcomeMessage",
                table: "AspNetUsers");
        }
    }
}
