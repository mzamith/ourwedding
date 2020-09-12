using Microsoft.EntityFrameworkCore.Migrations;

namespace OurWedding.API.Migrations
{
    public partial class AddedWantsTransportation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "WantsTransportation",
                table: "InviteAnswer",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WantsTransportation",
                table: "InviteAnswer");
        }
    }
}
