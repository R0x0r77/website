package com.kosiorek.website.modules;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping(value = {
            "/",
            "/{path:[^\\.]+}",
            "/{path1:[^\\.]+}/{path2:[^\\.]+}",
            "/{path1:[^\\.]+}/{path2:[^\\.]+}/{path3:[^\\.]+}"
    })
    public String forwardAngularRoutes() {
        return "forward:/index.html";
    }
}