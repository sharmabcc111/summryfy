package org.example.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "summary")
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String fileName;
    String filePath;
    String contentType;
    @Column(length = 5000)
    String summaryText;


    public static String generateSummary(String text){
        if(text == null || text.isBlank()){
            return "no content found";
        }
        text = text.replace("\r\n", "\n");
        text = text.replaceAll("\\n{2,}", "\n");
        text = text.replaceAll("\\s+", " ").trim();
        int limit = Math.max(text.length(),500);
        return text.substring(0,limit)+"...";
    }

}
