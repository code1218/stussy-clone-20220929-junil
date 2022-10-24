package com.stussy.stussyclone20220929junil.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ShopPageController {

    @GetMapping("/collections/{category}")
    public String loadCollections(@PathVariable String category) {
        return  "shop/collections";
    }

}
