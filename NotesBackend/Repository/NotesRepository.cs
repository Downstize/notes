using Microsoft.EntityFrameworkCore;
using NotesBackend.Data;
using NotesBackend.Model;

namespace NotesBackend.Repository;

public class NotesRepository : INotesRepository
{
    private readonly ApplicationDbContext _context;

    public NotesRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Note?> GetNoteByIdAsync(int id)
    {
        return await _context.Notes.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Note>> GetNotesAsync()
    {
        return await _context.Notes.ToListAsync();
    }

    public async Task AddNoteAsync(Note note)
    {
        note.CreatedAt = DateTime.UtcNow;
        note.ModifiedAt = DateTime.UtcNow;
        await _context.Notes.AddAsync(note);
    }

    public async Task UpdateNoteAsync(Note note)
    {
        var existingNote = await _context.Notes.AsNoTracking().FirstOrDefaultAsync(x => x.Id == note.Id);
        if (existingNote == null) throw new Exception("Заметка не найдена!");

        note.CreatedAt = existingNote.CreatedAt;
        note.ModifiedAt = DateTime.UtcNow;
        _context.Notes.Update(note);
    }

    public async Task DeleteNoteAsync(Note note)
    {
        _context.Notes.Remove(note);
    }
}