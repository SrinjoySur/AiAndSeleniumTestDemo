package com.srinjoysur.aiandselenium;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Simple AI helper that provides heuristic suggestions for Selenium locators.
 * This is a placeholder for future integration with real LLM services.
 */
public class AIHelper {

    /**
     * Suggests a locator strategy by analyzing available attributes.
     * @param tag tag name (e.g., input, button)
     * @param id id attribute
     * @param classes list of CSS classes
     * @param text visible text
     * @return suggested CSS selector string
     */
    public static String suggestCss(String tag, String id, List<String> classes, String text) {
        StringBuilder sb = new StringBuilder();
        if (tag != null && !tag.isBlank()) {
            sb.append(tag);
        }
        if (id != null && !id.isBlank()) {
            sb.append("#").append(id);
        }
        if (classes != null && !classes.isEmpty()) {
            String classSel = classes.stream()
                    .filter(c -> c != null && !c.isBlank())
                    .map(c -> "." + c)
                    .collect(Collectors.joining());
            sb.append(classSel);
        }
        if (text != null && !text.isBlank()) {
            // Non-standard, just a hint; a real solution may use XPath contains(text())
            sb.append("[data-text='").append(escape(text)).append("']");
        }
        return sb.length() > 0 ? sb.toString() : "*";
    }

    private static String escape(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
