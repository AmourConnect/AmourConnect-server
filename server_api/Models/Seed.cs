using server_api.Data;


namespace server_api.Models
{
    public class SeedData
    {
        private readonly ApiDbContext ApiDbContext;
        public SeedData(ApiDbContext context)
        {
            this.ApiDbContext = context;
        }
        public void SeedApiDbContext()
        {
            if (!ApiDbContext.User.Any())
            {
                for (int i = 0; i < 50; i++)
                {
                    User newUser = new User
                    {
                        Pseudo = GenerateRandomName(),
                        Email = GenerateRandomEmail(),
                        PasswordHash = GenerateRandomPassword(),
                        city = GenerateRandomCity(),
                        sex = GenerateRandomGender(),
                        grade = "User"
                    };

                    ApiDbContext.User.Add(newUser);
                }

                ApiDbContext.SaveChanges();
            }
        }
        private string GenerateRandomName()
        {
            string[] names = { "John", "Jane", "Bob", "Alice", "Charlie", "Emma", "Oliver", "Sophia", "William", "Ava" };
            Random rand = new Random();
            return names[rand.Next(names.Length)];
        }

        private string GenerateRandomEmail()
        {
            string[] domains = { "gmail.com", "yahoo.com", "hotmail.com", "outlook.com" };
            Random rand = new Random();
            return $"{GenerateRandomName().ToLower()}@{domains[rand.Next(domains.Length)]}";
        }

        private string GenerateRandomPassword()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random rand = new Random();
            return new string(Enumerable.Repeat(chars, 8).Select(s => s[rand.Next(s.Length)]).ToArray());
        }

        private string GenerateRandomCity()
        {
            string[] cities = { "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille" };
            Random rand = new Random();
            return cities[rand.Next(cities.Length)];
        }

        private string GenerateRandomGender()
        {
            string[] genders = { "M", "F" };
            Random rand = new Random();
            return genders[rand.Next(genders.Length)];
        }
    }
}