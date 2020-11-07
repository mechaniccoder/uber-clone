import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";
import { verificationTarget } from "../types";
import User from "./User";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "text",
    enum: [verificationTarget.PHONE, verificationTarget.EMAIL],
  })
  target: verificationTarget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  private createKey(): void {
    if (this.target === verificationTarget.PHONE) {
      let randomKey = Math.floor(Math.random() * 100000).toString();

      if (randomKey.length === 4) {
        randomKey + "0";
      }

      this.key = randomKey;
    } else {
      this.key = Math.random().toString(36).substring(2);
    }
  }
}

export default Verification;
