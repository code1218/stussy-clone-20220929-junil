package com.stussy.stussyclone20220929junil.dto.shop;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Builder
@Data
public class ProductDetailRespDto {
    private int groupId;
    private String name;
    private int price;
    private Map<String, List<String>> options;
    private List<String> imgNames;
}
