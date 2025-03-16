using Microsoft.EntityFrameworkCore;
using NotesBackend.Model;

namespace NotesBackend.Data;

public class ApplicationDbContext : DbContext
{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                modelBuilder.Entity<Note>().HasKey(x => x.Id);
        }
}