import { azure } from '@ai-sdk/azure';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: azure(process.env.AZURE_DEVELOPMENT_NAME || ''),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}