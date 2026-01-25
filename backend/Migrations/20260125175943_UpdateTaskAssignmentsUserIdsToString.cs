using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTaskAssignmentsUserIdsToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6bdb4545-e4a4-446e-9209-a035cb9f4f76");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "915a2d94-df98-44ab-a797-d21164441448");

            migrationBuilder.AlterColumn<string>(
                name: "User_Id",
                table: "TaskAssignments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "TaskAssignments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2bc7e3f9-06bb-4aa5-99d2-e239df51b2dd", null, "User", "User" },
                    { "35462b4a-533b-49e5-8ce9-a40903420dfe", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_AppUserId",
                table: "TaskAssignments",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignments_AspNetUsers_AppUserId",
                table: "TaskAssignments",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskAssignments_AspNetUsers_AppUserId",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_AppUserId",
                table: "TaskAssignments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2bc7e3f9-06bb-4aa5-99d2-e239df51b2dd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "35462b4a-533b-49e5-8ce9-a40903420dfe");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "TaskAssignments");

            migrationBuilder.AlterColumn<int>(
                name: "User_Id",
                table: "TaskAssignments",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6bdb4545-e4a4-446e-9209-a035cb9f4f76", null, "User", "User" },
                    { "915a2d94-df98-44ab-a797-d21164441448", null, "Admin", "ADMIN" }
                });
        }
    }
}
