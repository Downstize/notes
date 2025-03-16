using Microsoft.EntityFrameworkCore;
using NotesBackend.Model;

namespace NotesBackend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.Migrate();
            
            if (!context.Notes.Any())
            {
                context.Notes.Add(new Note
                {
                    Title = "Это моя самая первая заметка",
                    Content = "Данная заметка была создана автоматически (не пугайтесь :3)",
                    CreatedAt = DateTime.UtcNow,
                    ModifiedAt = DateTime.UtcNow
                });

                context.SaveChanges();
            }
        }
    }
}