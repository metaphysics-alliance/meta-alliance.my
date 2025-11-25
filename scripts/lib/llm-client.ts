
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface LLMResponse {
  content: string;
  model: string;
}

export class LLMClient {
  private geminiKey: string | undefined;
  private openaiKey: string | undefined;

  constructor() {
    this.geminiKey = process.env.GEMINI_API_KEY;
    this.openaiKey = process.env.OPENAI_API_KEY;
  }

  get isConfigured(): boolean {
    return !!(this.geminiKey || this.openaiKey);
  }

  async generate(prompt: string): Promise<LLMResponse> {
    if (this.geminiKey) {
      return this.generateWithGemini(prompt);
    } else if (this.openaiKey) {
      return this.generateWithOpenAI(prompt);
    } else {
      throw new Error('No API key configured for Brain Agent (GEMINI_API_KEY or OPENAI_API_KEY)');
    }
  }

  private async generateWithGemini(prompt: string): Promise<LLMResponse> {
    try {
      const genAI = new GoogleGenerativeAI(this.geminiKey!);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return {
        content: text,
        model: 'gemini-1.5-flash'
      };
    } catch (error) {
      console.error('[LLMClient] Gemini generation failed:', error);
      throw error;
    }
  }

  private async generateWithOpenAI(prompt: string): Promise<LLMResponse> {
    // Basic fetch implementation to avoid adding 'openai' dependency if not needed yet
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        model: 'gpt-4o'
      };
    } catch (error) {
      console.error('[LLMClient] OpenAI generation failed:', error);
      throw error;
    }
  }
}
