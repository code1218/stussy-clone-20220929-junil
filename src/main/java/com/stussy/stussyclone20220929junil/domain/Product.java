package com.stussy.stussyclone20220929junil.domain;

import com.stussy.stussyclone20220929junil.dto.admin.ProductListRespDto;
import com.stussy.stussyclone20220929junil.dto.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
    private int id;
    private String category;
    private int group_id;
    private String name;
    private int price;
    private String color;
    private String size;

    private String info_simple;
    private String info_detail;
    private String info_option;
    private String info_management;
    private String info_shipping;

    private List<ProductImgFile> product_img_files;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public ProductListRespDto toListRespDto() {
        return ProductListRespDto.builder()
                .id(id)
                .category(category)
                .name(name)
                .price(price)
                .color(color)
                .size(size)
                .infoSimple(info_simple)
                .infoDetail(info_detail)
                .infoOption(info_option)
                .infoManagement(info_management)
                .infoShipping(info_shipping)
                .productImgFiles(product_img_files)
                .build();
    }
}
