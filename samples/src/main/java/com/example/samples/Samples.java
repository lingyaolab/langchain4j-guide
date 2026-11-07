package com.example.samples;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.service.AiServices;

public final class Samples {

    private Samples() {
    }

    public static ChatModel model() {
        String apiKey = System.getenv("DEEPSEEK_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Set DEEPSEEK_API_KEY first (or use the offline tests).");
        }
        return OpenAiChatModel.builder()
                .baseUrl("https://api.deepseek.com/v1")
                .apiKey(apiKey)
                .modelName(System.getenv().getOrDefault("DEEPSEEK_MODEL", "deepseek-chat"))
                .temperature(0.0)
                .build();
    }

    public static void main(String[] args) {
        ChatModel model = model();

        System.out.println("=== direct chat ===");
        System.out.println(model.chat("用一句话解释 LangChain4j 的 ChatModel。"));

        System.out.println("=== AI Service ===");
        Assistant assistant = AiServices.builder(Assistant.class)
                .chatModel(model)
                .build();
        System.out.println(assistant.chat("用一句话解释 AI Service。"));

        System.out.println("=== tools ===");
        Assistant withTools = AiServices.builder(Assistant.class)
                .chatModel(model)
                .tools(new WeatherTools())
                .build();
        System.out.println(withTools.chat("北京天气如何？"));
    }
}
