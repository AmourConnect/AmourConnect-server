using AmourConnect.Domain.Entities;
using AmourConnect.Infra.Interfaces;
using AmourConnect.Infra.Persistence;

namespace AmourConnect.Infra.Seeders
{
    internal class UserSeeder(AmourConnectDbContext context) : IUserSeeder
    {
        public async Task Seed()
        {
            if (await context.Database.CanConnectAsync())
            {
                if (!context.User.Any())
                {
                    Random random = new Random();
                    for (int i = 0; i < 200; i++)
                    {
                        User newUser = new User
                        {
                            Pseudo = _GenerateRandomName(),
                            Description = _GenerateRandomName() + _GenerateRandomPassword(),
                            EmailGoogle = _GenerateRandomEmail(),
                            userIdGoogle = _GenerateRandomPassword(),
                            city = _GenerateRandomCity(),
                            sex = _GenerateRandomGender(),
                            date_of_birth = DateTime.UtcNow.AddYears(-random.Next(18, 65)),
                            account_created_at = DateTime.UtcNow
                        };
                        context.User.Add(newUser);
                    }
                    await context.SaveChangesAsync();
                }
            }
        }
        private string _GenerateRandomName()
        {
            string[] names = { "John", "Jane", "Bob", "Alice", "Charlie", "Emma", "Oliver", "Sophia", "William", "Ava" };
            Random rand = new Random();
            return names[rand.Next(names.Length)];
        }

        private string _GenerateRandomEmail()
        {
            string[] domains = { "gmail.com", "yahoo.com", "hotmail.com", "outlook.com" };
            Random rand = new Random();
            return $"{_GenerateRandomName().ToLower()}@{domains[rand.Next(domains.Length)]}";
        }

        private string _GenerateRandomPassword()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random rand = new Random();
            return new string(Enumerable.Repeat(chars, 8).Select(s => s[rand.Next(s.Length)]).ToArray());
        }

        private string _GenerateRandomCity()
        {
            string[] cities = { "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille" };
            Random rand = new Random();
            return cities[rand.Next(cities.Length)];
        }

        private string _GenerateRandomGender()
        {
            string[] genders = { "M", "F" };
            Random rand = new Random();
            return genders[rand.Next(genders.Length)];
        }
    }
}