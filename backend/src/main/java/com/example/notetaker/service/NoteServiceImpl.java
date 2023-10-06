package com.example.notetaker.service;

import com.example.notetaker.model.Note;
import com.example.notetaker.repository.NoteRepository;
import org.hibernate.annotations.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteRepository noteRepository;
    @Override
    public Note saveNote(Note note) {
        return noteRepository.save(note);
    }

    @Override
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @Override
    public void deleteById(Integer id) {
        noteRepository.deleteById(id);
    }


    @Override
    public Note getNoteById(Integer id) {
        return noteRepository.findById(id).orElse(null);
    }

    @Override
    public Note updateNote(Note newNote, Integer id) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setName(newNote.getName());
                    note.setContent(newNote.getContent());
                    return noteRepository.save(note);
                }).orElse(null);
    }
}
