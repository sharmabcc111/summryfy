package org.example.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults( level =AccessLevel.PRIVATE)
public class SummaryDto {
    Long id;
    String fileName;
    String filePath;
    String contentType;
    String summaryText;

}