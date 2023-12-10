using SignalR.Project.Hackaton.DomainModel.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Microsoft.Extensions.Configuration;

namespace SignalR.Project.Hackaton.DAL
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> dbContextOptions) : base(dbContextOptions) { }
        public DbSet<User> Users { get; set; }
        public DbSet<ConnectionChat> Connections { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Visit> Visits { get; set; }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {
            builder.Properties<DateOnly>().HaveConversion<DateTime>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ConnectionChat>(ConnectionChatConfigure);
            modelBuilder.Entity<User>(UserConfigure);
            modelBuilder.Entity<Message>(MessageConfigure);
            modelBuilder.Entity<Visit>(VisitConfigure);
        }
        public void MessageConfigure(EntityTypeBuilder<Message> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Msg).IsRequired().HasMaxLength(200);
            builder.Property(p => p.UserId).IsRequired();
            builder.Property(p => p.DateTime).IsRequired();
        }
        public void VisitConfigure(EntityTypeBuilder<Visit> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Date).IsRequired();
        }
        public void ConnectionChatConfigure(EntityTypeBuilder<ConnectionChat> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.ConnectionId).IsRequired();
            builder.Property(p => p.AESKey).IsRequired();
        }
        public void UserConfigure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.FirstName).IsRequired().HasMaxLength(25);
            builder.Property(p => p.LastName).IsRequired().HasMaxLength(25);
            builder.Property(p => p.Email).IsRequired().HasMaxLength(182);
        }
    }
}
