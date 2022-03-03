package com.zephyr.musicapp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

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
    public ResponseEntity<Void> updatePodcast(@PathVariable final Long id,
                                              @RequestBody @Valid final PodcastDto podcastDto) {
        podcastService.update(id, podcastDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePodcast(@PathVariable final Long id) {
        podcastService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
