using Microsoft.EntityFrameworkCore;
using Server.Net.Entities;

namespace Server.Net.data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Member> Members { get; set; }
    }
}