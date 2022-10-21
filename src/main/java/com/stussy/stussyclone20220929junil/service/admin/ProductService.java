package com.stussy.stussyclone20220929junil.service.admin;

import com.stussy.stussyclone20220929junil.domain.Product;
import com.stussy.stussyclone20220929junil.dto.admin.ProductAdditionReqDto;
import com.stussy.stussyclone20220929junil.dto.admin.ProductListRespDto;
import com.stussy.stussyclone20220929junil.dto.admin.ProductModificationReqDto;

import java.util.List;

public interface ProductService {
    public boolean addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception;
    public List<ProductListRespDto> getProductList(int pageNumber, String category, String searchText) throws Exception;
    public boolean updateProduct(ProductModificationReqDto productModificationReqDto) throws Exception;

}
