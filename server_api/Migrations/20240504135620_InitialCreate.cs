using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server_api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id_User = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userIdGoogle = table.Column<string>(type: "text", nullable: false),
                    Pseudo = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    EmailGoogle = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Profile_picture = table.Column<byte[]>(type: "bytea", nullable: true),
                    date_token_session_expiration = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    token_session_user = table.Column<string>(type: "text", nullable: true),
                    grade = table.Column<string>(type: "text", nullable: false),
                    city = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    sex = table.Column<string>(type: "text", nullable: false),
                    date_of_birth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    account_created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id_User);
                });

            migrationBuilder.CreateTable(
                name: "Swipe",
                columns: table => new
                {
                    Id_Swipe = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Id_User = table.Column<int>(type: "integer", nullable: false),
                    Id_User_which_was_Swiped = table.Column<int>(type: "integer", nullable: false),
                    Date_of_swiping = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Swipe", x => x.Id_Swipe);
                    table.ForeignKey(
                        name: "FK_Swipe_User_Id_User",
                        column: x => x.Id_User,
                        principalTable: "User",
                        principalColumn: "Id_User",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Swipe_User_Id_User_which_was_Swiped",
                        column: x => x.Id_User_which_was_Swiped,
                        principalTable: "User",
                        principalColumn: "Id_User",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Swipe_Id_User",
                table: "Swipe",
                column: "Id_User");

            migrationBuilder.CreateIndex(
                name: "IX_Swipe_Id_User_which_was_Swiped",
                table: "Swipe",
                column: "Id_User_which_was_Swiped");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Swipe");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
