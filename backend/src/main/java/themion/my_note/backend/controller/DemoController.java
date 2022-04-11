package themion.my_note.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

// import themion.my_note.backend.domain.Member;

// react와의 연결 테스트
@RestController
@AllArgsConstructor
public class DemoController {

    @GetMapping("")
    public String noRoute() {
        return "noRoute";
    }

    @GetMapping("test1")
    public String test1() {
        return "test1";
    }

    @GetMapping("test2")
    public String test2() {
        return "test2";
    }

}
