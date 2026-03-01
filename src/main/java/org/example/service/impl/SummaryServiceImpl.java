package org.example.service.impl;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.example.dto.SummaryDto;
import org.example.entity.Summary;
import org.example.mapper.SummaryMapper;
import org.example.repo.SummaryRepo;
import org.example.service.SummaryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
  public class SummaryServiceImpl implements  SummaryService {



    private final SummaryRepo summaryRepo;
    private final SummaryMapper summaryMapper;


@Transactional
    public SummaryDto uploadFile(MultipartFile file) {

        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads";

            // Create folder if not exists
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            // Save file
            File destination = new File(folder, file.getOriginalFilename());
            file.transferTo(destination);

            // Create entity
            Summary summary = new Summary();
            summary.setFileName(file.getOriginalFilename());
            summary.setFilePath(destination.getAbsolutePath());

            Summary saved = summaryRepo.save(summary);

            return summaryMapper.toDto(saved);

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }
@Transactional
    @Override
    public SummaryDto getFile(Long id) {
        Summary summary = summaryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found in DB"));

        try {
            Path path = Paths.get(summary.getFilePath());
           File file = path.toFile();

           if(!file.exists()){
               throw new RuntimeException("File not found on disk");

           }

            PDDocument document = PDDocument.load(file);
           PDFTextStripper stripper = new PDFTextStripper();
           String fullText =  stripper.getText(document);
           document.close();

          String summaryText = Summary.generateSummary(fullText);
          summary.setSummaryText(summaryText);
           return summaryMapper.toDto(summary);
        } catch (Exception e) {
            throw new RuntimeException("Error reading file", e);
        }
    }
//    @Transactional
//    public List<SummaryDto> getAllFiles(){
//        return summaryRepo.findAll()
//                .stream()
//                .map(summaryMapper::toDto)
//                .toList();
//    }
@Transactional
public Page<SummaryDto> getAllFiles(int page, int size) {

    Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

    return summaryRepo.findAll(pageable)
            .map(summaryMapper::toDto);
}
@Transactional
    public void deleteFile(Long id){
    summaryRepo.deleteById(id);

}


}