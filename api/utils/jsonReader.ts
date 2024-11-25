import { handleError } from 'src/errors/app-error';
import * as fs from 'fs';
import * as path from 'path';

export async function jsonReader(
  seedJsonPathFile: string,
  seedJsonNameFile: string,
) {
  try {
    const filePath = path.join(
      process.cwd(),
      seedJsonPathFile,
      seedJsonNameFile,
    );
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  } catch (error) {
    handleError(error);
  }
}
