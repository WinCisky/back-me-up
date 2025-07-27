import { eq } from 'drizzle-orm';
import type { Database } from './index';
import { users, type NewUser } from './schema';

export class UserService {
  constructor(private db: Database) {}

  async createUser(userData: NewUser) {
    const result = await this.db.insert(users).values(userData).returning();
    return result[0];
  }

  async getUserById(id: string) {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  }

  async getUserByEmail(email: string) {
    const result = await this.db.select().from(users).where(eq(users.email, email));
    return result[0] || null;
  }

  async getUserByGoogleId(googleId: string) {
    const result = await this.db.select().from(users).where(eq(users.googleId, googleId));
    return result[0] || null;
  }

  async updateUser(id: string, userData: Partial<NewUser>) {
    const result = await this.db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }

  async deleteUser(id: string) {
    await this.db.delete(users).where(eq(users.id, id));
  }

  async getAllUsers() {
    return await this.db.select().from(users);
  }
}
