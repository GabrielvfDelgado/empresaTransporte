import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Passageiro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ select: false })
  cpf: string;
}
