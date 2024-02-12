
NEWSCHEMA('OpenAI', function(schema) {
    schema.action('ask', {
        name: 'Ask to chatgpt',
        input: '*message:String',
        action: async function($, model) {
            var message = model.message;
            const completion = await MAIN.openai.completions.create({
              model: 'gpt-3.5-turbo-instruct',
              prompt: `${message}`,
              max_tokens: 100,
              temperature: 0.5 
            });
         
            $.callback({ message: completion.choices[0].text });
        }
    })

})