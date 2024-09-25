import { embedMany } from 'ai';
import { azure } from '@ai-sdk/azure';

const embeddingModel = azure.textEmbeddingModel(process.env.AZURE_DEVELOPMENT_NAME || '');

const generateChunks = (input: string): string[] => {
    return input
      .trim()
      .split('.')
      .filter(i => i !== '');
  };


  export const generateEmbeddings = async (
    value: string,
  ): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = generateChunks(value);
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
  };