using System.ComponentModel.DataAnnotations;

namespace NotesBackend.Model;

public class Note
{
    public int Id { get; set; }
    [MaxLength(100, ErrorMessage = "Название заметки не может превышать 100 символов!")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Содержание заметки не может быть пустым!")]
    [MaxLength(1000, ErrorMessage = "Содержание заметки не может превышать 1000 символов!")]
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ModifiedAt { get; set; }
}