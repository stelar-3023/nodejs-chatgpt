import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';
import * as dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

// openai
//   .createChatCompletion({
//     model: 'gpt-3.5-turbo-0301',
//     messages: [{ role: 'user', content: 'Hello' }],
//   })
//   .then((response) => {
//     console.log(response.data.choices[0].message.content);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.on('line', async (input) => {
  await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [{ role: 'user', content: input }],
    })
    .then((response) => {
      console.log(response.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((error) => {
      console.log(error);
    });
});
