namespace NotesBackend.Repository;

public interface IUnitOfWork : IDisposable
{
    INotesRepository Notes { get; }
    Task<int> CommitAsync();
}