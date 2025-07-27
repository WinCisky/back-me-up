import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// For Cloudflare Workers environment
export function createDB(d1: any) {
  return drizzle(d1, { schema });
}

export type Database = ReturnType<typeof createDB>;

// Export the schema for use in other parts of the app
export { users } from './schema';
export type { User, NewUser } from './schema';

// Export the user service
export { UserService } from './user-service';
