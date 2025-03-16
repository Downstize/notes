using Microsoft.AspNetCore.Mvc;
using NotesBackend.Model;
using NotesBackend.Repository;

namespace NotesBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NotesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public NotesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetNote(int id)
    {
        var note = await _unitOfWork.Notes.GetNoteByIdAsync(id);
        if (note == null) return NotFound("Заметка не найдена");
        return Ok(note);
    }

    [HttpGet]
    public async Task<IActionResult> GetNotes()
    {
        var notes = await _unitOfWork.Notes.GetNotesAsync();
        return Ok(notes);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateNote(Note note)
    {
        await _unitOfWork.Notes.AddNoteAsync(note);
        await _unitOfWork.CommitAsync();
        return Ok($"Заметка - {note.Title} успешно создана!");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, [FromBody] Note note)
    {
        if (id != note.Id) return BadRequest("Заметки с таким id не найдено. Изменения не сохранены");
        await _unitOfWork.Notes.UpdateNoteAsync(note);
        await _unitOfWork.CommitAsync();
        return Ok($"Заметка - {note.Title} успешно отредактирована!");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var note = await _unitOfWork.Notes.GetNoteByIdAsync(id);
        if (note == null) return NotFound("Заметка не найдена");
        await _unitOfWork.Notes.DeleteNoteAsync(note);
        await _unitOfWork.CommitAsync();
        return Ok($"Заметка - {note.Title} успешно удалена");
    }
}