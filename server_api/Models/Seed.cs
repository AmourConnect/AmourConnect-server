using server_api.Data;


namespace server_api.Models
{
    public class SeedData
    {
        public void SeedApiDbContext(ApiDbContext context)
        {
            if (!context.User.Any())
            {
                Random random = new Random();
                for (int i = 0; i < 50; i++)
                {
                    User newUser = new User
                    {
                        Pseudo = _GenerateRandomName(),
                        Email = _GenerateRandomEmail(),
                        PasswordHash = _GenerateRandomPassword(),
                        city = _GenerateRandomCity(),
                        sex = _GenerateRandomGender(),
                        grade = "User",
                        date_of_birth = DateTime.UtcNow.AddYears(-random.Next(18, 65)),
                        account_created_at = DateTime.UtcNow
                    };

                    context.User.Add(newUser);
                }

                context.SaveChanges();
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