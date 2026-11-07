package com.example.samples;

import static org.junit.jupiter.api.Assertions.assertEquals;

import dev.langchain4j.service.AiServices;
import org.junit.jupiter.api.Test;

class AssistantTest {

    @Test
    void aiServiceUsesStubModel() {
        Assistant assistant = AiServices.builder(Assistant.class)
                .chatModel(new StubChatModel("stub answer"))
                .build();

        assertEquals("stub answer", assistant.chat("hello"));
    }

    @Test
    void toolsArePlainJava() {
        assertEquals("Beijing: 18C, sunny", new WeatherTools().weather("Beijing"));
    }
}
