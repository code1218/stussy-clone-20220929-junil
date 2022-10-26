package com.stussy.stussyclone20220929junil.service;

import com.stussy.stussyclone20220929junil.domain.ProductDetail;
import com.stussy.stussyclone20220929junil.dto.shop.CollectionListRespDto;
import com.stussy.stussyclone20220929junil.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService {

    private final ShopRepository shopRepository;

    @Override
    public List<CollectionListRespDto> getCollections(String category, int page) throws Exception {
        List<CollectionListRespDto> responses = new ArrayList<CollectionListRespDto>();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("category", category);
        map.put("index", (page - 1) * 16);

        shopRepository.getCollectionList(map).forEach(collection -> {
            responses.add(collection.toListRespDto());
        });

        return responses;
    }

    @Override
    public List<?> getProductDetails(int groupId) throws Exception {
        List<ProductDetail> productDetails = shopRepository.getProduct(groupId);
        List<String> colors = new ArrayList<String>();
        Map<String, List<String>> sizes = new HashMap<String, List<String>>();

        productDetails.forEach(productDetail -> {
            colors.add(productDetail.getColor());
        });

        return shopRepository.getProduct(groupId);
    }
}
