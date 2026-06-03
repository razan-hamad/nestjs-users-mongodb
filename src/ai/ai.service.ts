import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async ask(message: string) {

    const response =
      await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      });

    return response.choices[0].message.content;
  }
}