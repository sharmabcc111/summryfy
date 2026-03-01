package org.example.mapper;

import org.example.dto.SummaryDto;
import org.example.entity.Summary;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SummaryMapper {

    SummaryDto toDto(Summary summary);


}