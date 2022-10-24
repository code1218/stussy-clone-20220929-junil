package com.stussy.stussyclone20220929junil.service;

import com.stussy.stussyclone20220929junil.dto.shop.CollectionListRespDto;

import java.util.List;

public interface ShopService {
    public List<CollectionListRespDto> getCollections(String category, int page) throws Exception;
}
