import { Cache } from "cache-manager";
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
export type CacheKeyBuilder = (...args: any[]) => string;

export interface CacheOptions {
  key?: string | CacheKeyBuilder;
  ttl?: number;
  hashable?: boolean;
  fallback?: boolean;
}

export interface CacheableContext {
  cacheManager: Cache;
  [key: string]: any;
}
