package am.iunetworks.thymeleafdemo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class TestController {


    @GetMapping(value = "/test")
    public String getTestPage() {

        return "test";
    }
    @GetMapping(value = "/welcome")
    public String getWelcomePage() {

        return "welcome";
    }
}
