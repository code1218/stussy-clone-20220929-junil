package com.stussy.stussyclone20220929junil.service.admin;

import com.stussy.stussyclone20220929junil.dto.admin.ProductAdditionReqDto;

public interface ProductService {
    public boolean addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception;
}
