import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

const BCRYPT_TIMES = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_TIMES);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword: string = await this.hashPassword(this.password);

      this.password = hashedPassword;
    }
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
