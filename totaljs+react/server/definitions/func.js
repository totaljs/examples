const { OpenAI } = require('openai');
MAIN.openai = new OpenAI({ apiKey: CONF.openai_key });
