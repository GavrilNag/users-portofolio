import { v4 as uuidv4 } from "uuid";
import { IIDProvider } from "./id-provider";

export class SystemIDProvider implements IIDProvider {
  generate(): string {
    return uuidv4();
  }
}
