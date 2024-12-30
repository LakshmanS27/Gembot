export async function* streamGemini({ model = 'gemini-pro', contents = [] } = {}) {
    const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model, contents }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error: ${response.status} - ${error}`);
    }

    yield* streamResponseChunks(response);
}

async function* streamResponseChunks(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value);

        const chunks = buffer.split('\n\n');
        for (let i = 0; i < chunks.length - 1; i++) {
            const chunk = chunks[i].trim();
            if (chunk.startsWith('data:')) {
                const json = chunk.replace('data:', '').trim();
                try {
                    const { text, error } = JSON.parse(json);
                    if (error) throw new Error(error);
                    yield text;
                } catch (err) {
                    console.error('Error parsing chunk:', err);
                }
            }
        }
        buffer = chunks[chunks.length - 1];
    }
}
