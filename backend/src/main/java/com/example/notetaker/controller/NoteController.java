package com.example.notetaker.controller;

import com.example.notetaker.model.Note;
import com.example.notetaker.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/note")
@CrossOrigin
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping("/add")
    public String add(@RequestBody Note note)
    {
        noteService.saveNote(note);
        return "New note is added.";
    }
    @GetMapping("/getAll")
    public List<Note> getAllNotes()
    {
        return noteService.getAllNotes();
    }

    @GetMapping("/get/{id}")
    public Note getNote(@PathVariable Integer id)
    {
        return noteService.getNoteById(id);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Integer id)
    {
        noteService.deleteById(id);
        return "Deleted of id" + id;
    }
    @PutMapping("/update/{id}")
    public String updateNote (@RequestBody Note newNote, @PathVariable Integer id)
    {
        noteService.updateNote(newNote, id);
        return "Updated user.";
    }

    }





