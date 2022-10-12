package com.stussy.stussyclone20220929junil.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductImgFile {
    private int id;
    private int product_id;
    private String origin_name;
    private String temp_name;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
