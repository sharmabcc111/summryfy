package org.example.service;


import org.example.dto.SummaryDto;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

public interface SummaryService {

    SummaryDto uploadFile(MultipartFile file) ;

SummaryDto getFile(Long id);

   // List<SummaryDto> getAllFiles();
   Page<SummaryDto> getAllFiles(int page, int size);
    void deleteFile(@PathVariable Long id);
}
