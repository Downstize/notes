using NotesBackend.Model;

namespace NotesBackend.Repository;

public interface INotesRepository
{
    Task<Note?> GetNoteByIdAsync(int id);
    Task<List<Note>> GetNotesAsync();
    Task AddNoteAsync(Note note);
    Task UpdateNoteAsync(Note note);
    Task DeleteNoteAsync(Note note);
}