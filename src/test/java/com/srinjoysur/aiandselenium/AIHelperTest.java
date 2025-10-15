package com.srinjoysur.aiandselenium;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class AIHelperTest {

    @Test
    void suggestCssShouldCombineAttributes() {
        String sel = AIHelper.suggestCss("input", "email", List.of("form-control", "primary"), "Sign In");
        assertTrue(sel.contains("input#email"));
        assertTrue(sel.contains(".form-control.primary"));
        assertTrue(sel.contains("data-text"));
    }
}
