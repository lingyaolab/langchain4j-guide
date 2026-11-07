package com.example.samples;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface Assistant {

    @SystemMessage("你是一个简洁的 Java 助教，回答不超过两句话。")
    String chat(@UserMessage String message);
}
