package com.stussy.stussyclone20220929junil.controller.admin;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequestMapping("/admin")
@Controller
public class AdminPageController {

    @GetMapping("/product/addition")
    public String loadProductAddition() {
        return "admin/product_add";
    }

}
