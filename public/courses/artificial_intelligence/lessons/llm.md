### LLM (Large Language Model)

#### Learning
Imagine you want to teach a robot how to understand and speak like a human. The first thing you'd do is give it a massive amount of reading material, books, articles, websites, Wikipedia pages, and more. This is called the training data, and it can be as large as 10 terabytes of text. That's like millions of books!
The robot (or model) reads all this text and starts to learn patterns. It figures out how words relate to each other, how sentences are built, and how ideas connect. This learning process is called training, and it's where the model builds its understanding of language, not by memorizing, but by recognizing patterns.

#### Compressing
Once the model has finished learning, it doesn't keep all the text. Instead, it compresses everything it learned into a much smaller file called the parameter file. You can think of this like a zip file. It doesn't contain the original books, but it holds the essence of what was learned.
This parameter file contains billions of tiny settings, called parameters, which help the model decide what to say when you ask it a question. For example, Meta's LLaMA 2 model has 70 billion parameters, yet the whole file is only about 140 gigabytes. That's incredibly compact, considering it was trained on 10 terabytes of text!

#### Running
To use the model, you need a second file called the run file. This is a small program—usually written in Python or C, that loads the parameter file and lets you interact with the model. It's like the remote control that activates the brain. Once you run it, the model is ready to chat, answer questions, write essays, translate languages, and more. All using the compressed knowledge it gained during training.

#### GPUs

Training a model on 10 terabytes of text and compressing it into a smart, usable format takes enormous computing power. That’s where GPUs (graphics processing units) come in. These are super-fast chips that can handle massive amounts of data quickly. Without GPUs, training an LLM would take years. With them, it can be done in weeks or even days. That’s why GPUs are the backbone of modern AI development.

#### Tokens

OpenAI's large language models process text using tokens, which are common sequences of characters found in a set of text. The models learn to understand the statistical relationships between these tokens, and excel at producing the next token in a sequence of tokens.

Refer: https://platform.openai.com/tokenizer

Think of tokens as tiny pieces of text, like words or parts of words. For example.
- The sentence “I love pizza” might be split into 3 tokens: ["I", "love", "pizza"].
- Longer or more complex words might be broken into multiple tokens.
LLMs don’t read text the way humans do,they process it as a sequence of tokens.

Every LLM has a maximum number of tokens it can remember or work with at one time. This is called the context window. For example
- Older models like GPT-3 had a limit of around 4,000 tokens.
- Newer models like GPT-4 can handle 8,000 to 32,000 tokens, depending on the version.
Once the conversation gets too long and exceeds the token limit, the model starts to forget earlier parts of the chat.




