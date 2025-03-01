import Together from "together-ai";

const together = new Together({ apiKey: '55e93f6fcb10aa78f67a53a83458a61c105b0c2f67642fc782774046abd50698' });

const response = await together.chat.completions.create({
    messages: [{"role": "user", "content": "What are some fun things to do in New York?"}],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
});

console.log(response.choices[0].message.content);