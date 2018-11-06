namespace Server.Net.Entities
{
    public class User
    {
        public int key { get; set; }
        public string name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}