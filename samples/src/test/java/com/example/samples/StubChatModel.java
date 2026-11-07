package com.example.samples;

import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.response.ChatResponse;

public class StubChatModel implements ChatModel {

    private final String reply;

    public StubChatModel(String reply) {
        this.reply = reply;
    }

    @Override
    public ChatResponse doChat(ChatRequest request) {
        return ChatResponse.builder().aiMessage(new AiMessage(reply)).build();
    }
}
