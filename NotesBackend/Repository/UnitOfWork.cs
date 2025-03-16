using NotesBackend.Data;

namespace NotesBackend.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    public INotesRepository Notes { get; }

    public UnitOfWork(ApplicationDbContext context, INotesRepository notes)
    {
        _context = context;
        Notes = notes;
    }

    public async Task<int> CommitAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}