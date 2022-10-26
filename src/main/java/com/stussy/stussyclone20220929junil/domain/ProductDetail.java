package com.stussy.stussyclone20220929junil.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductDetail {
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
    private List<ProductImgFile> productImgFiles;
}
