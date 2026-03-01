package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.dto.SummaryDto;
import org.example.service.SummaryService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/summary")
@RequiredArgsConstructor
public class SummaryController {


    private final SummaryService summaryService;

    @PostMapping
    public SummaryDto uploadFile(@RequestParam("file") MultipartFile file) {
        return summaryService.uploadFile(file);
    }
    @GetMapping("/{id}")
    public SummaryDto getFile(@PathVariable Long id){
        return summaryService.getFile(id);
    }
//    @GetMapping
//    public List<SummaryDto> getAllFiles(){
//        return summaryService.getAllFiles();
//    }
@GetMapping
public Page<SummaryDto> getAllFiles(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
) {
    return summaryService.getAllFiles(page, size);
}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id){
        summaryService.deleteFile(id);
        return ResponseEntity.ok("Deleted successfully");
    }

}



