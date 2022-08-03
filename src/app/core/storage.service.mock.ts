import { StorageService } from "./storage.service";

export class StorageFakeService extends StorageService {

    storage: any = {} 

    override saveItem<T>(key: string, item: T): void {
        this.storage[key] = item;
    }

    override getItem<T>(key: string): T | null {
        return this.storage[key] ?? null;
    }
}