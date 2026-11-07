# LangChain4j 1.23.0 配套示例

对齐版本：**LangChain4j 1.23.0** + **JDK 17**。

## 运行

```bash
export JAVA_HOME="C:\\Program Files\\Microsoft\\jdk-17.0.21.21-hotspot"
export PATH="$JAVA_HOME/bin:$PATH"

cd samples
mvn test
DEEPSEEK_API_KEY=... mvn -q exec:java -Dexec.mainClass=com.example.samples.Samples
```

Windows PowerShell：

```powershell
$env:JAVA_HOME="C:\Program Files\Microsoft\jdk-17.0.21.21-hotspot"
$env:PATH="$env:JAVA_HOME\bin;$env:PATH"
$env:DEEPSEEK_API_KEY="..."
mvn test
mvn -q exec:java "-Dexec.mainClass=com.example.samples.Samples"
```

## 内容

- `Samples`：直接 ChatModel、AI Service、带工具的 AI Service。
- `Assistant`：`@SystemMessage` + `@UserMessage`。
- `WeatherTools`：`@Tool` / `@P`。
- `AssistantTest`：离线 `StubChatModel`，不访问网络。

## 说明

- `mvn test` 不需要 API Key。
- `Samples` 需要 `DEEPSEEK_API_KEY`，默认走 `https://api.deepseek.com/v1`。
- 真实模型冒烟只在手动运行时发生，不进入测试。
