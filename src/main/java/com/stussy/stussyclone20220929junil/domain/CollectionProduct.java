package com.stussy.stussyclone20220929junil.domain;

import com.stussy.stussyclone20220929junil.dto.shop.CollectionListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CollectionProduct {
    private int group_id;
    private String category;
    private String name;
    private int price;
    private String img_name;

    public CollectionListRespDto toListRespDto() {
        return CollectionListRespDto.builder()
                .groupId(group_id)
                .category(category)
                .name(name)
                .price(price)
                .imgName(img_name)
                .build();

    }
}
