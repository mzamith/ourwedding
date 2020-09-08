using Microsoft.EntityFrameworkCore.Migrations;

namespace OurWedding.API.Migrations
{
    public partial class AddedRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "WasRemoved",
                table: "Invitee",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WasRemoved",
                table: "Invitee");
        }
    }
}
