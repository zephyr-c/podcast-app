package com.zephyr.musicapp.controller;

import com.zephyr.musicapp.dto.PodcastDto;
import com.zephyr.musicapp.service.PodcastService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.HashMap;

// TODO: Add error checking to endpoints?
// TODO: Evaluate endpoint strategy for likes and dislikes, decide where that functionality lives

@RestController
@RequestMapping(value = "api/podcasts")
public class PodcastController {

    private final PodcastService podcastService;

    public PodcastController(final PodcastService podcastService){
        this.podcastService = podcastService;
    }

    @GetMapping
    public ResponseEntity<List<PodcastDto>> getAllPodcasts() {
        return ResponseEntity.ok(podcastService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PodcastDto> getPodcast(@PathVariable final Long id){
        return ResponseEntity.ok(podcastService.get(id));
    }

    @PostMapping
    public ResponseEntity<Long> createPodcast(@RequestBody @Valid final PodcastDto podcastDto){
        return new ResponseEntity<>(podcastService.create(podcastDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PodcastDto> updatePodcast(@PathVariable final Long id,
                                              @RequestBody @Valid final HashMap<String, String> updates) {
        return new ResponseEntity<>(podcastService.update(id, updates), HttpStatus.ACCEPTED);
    }

//    @PutMapping("/{id}/like")
//    public ResponseEntity<Void> likePodcast(@PathVariable final Long id) {
//        PodcastDto podcast = podcastService.get(id);
//        podcast.setNumLikes(podcast.getNumLikes() + 1);
//        podcastService.update(id, podcast);
//        return ResponseEntity.ok().build();
//    }
//
//    @PutMapping("/{id}/dislike")
//    public ResponseEntity<Void> dislikePodcast(@PathVariable final Long id) {
//        PodcastDto podcast = podcastService.get(id);
//        podcast.setNumDislikes(podcast.getNumDislikes() + 1);
//        podcastService.update(id, podcast);
//        return ResponseEntity.ok().build();
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePodcast(@PathVariable final Long id) {
        podcastService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
