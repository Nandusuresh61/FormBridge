import { Survey } from "@/domain/entities/Survey";

export interface IGetRecentSubmissionsUseCase {
  execute(): Promise<Survey[]>;
}
