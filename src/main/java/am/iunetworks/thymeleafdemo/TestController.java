package am.iunetworks.thymeleafdemo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController("/")
@RequestMapping
public class TestController {


    @GetMapping(value = "test")
    public ModelAndView getTestPage() {

        return  new ModelAndView("test");
    }
    @GetMapping()
    public ModelAndView getWelcomePage() {

        return new ModelAndView("welcome");
    }
    @GetMapping(value = "file")
    public ModelAndView getWelcomePageslide() {

        return new ModelAndView("file");
    }
    @GetMapping(value = "Home")
    public ModelAndView getWelcomePageslide3() {

        return new ModelAndView("Home");
    }
}
