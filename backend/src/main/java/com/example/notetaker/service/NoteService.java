package com.example.notetaker.service;
import com.example.notetaker.model.Note;

import java.util.List;

public interface NoteService {

    public Note saveNote (Note note);
    public List<Note> getAllNotes();
    public void deleteById(Integer id);
    public Note getNoteById(Integer id);
    public Note updateNote(Note note, Integer id);
}
