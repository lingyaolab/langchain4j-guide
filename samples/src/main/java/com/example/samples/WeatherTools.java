package com.example.samples;

import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;

public class WeatherTools {

    @Tool("查询指定城市的天气，只读")
    public String weather(@P("城市名，例如 Beijing") String city) {
        return city + ": 18C, sunny";
    }
}
