import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Passagem } from "./passagem.entity";

@Entity()
export default class Onibus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lugares: number;

  @Column()
  tipo: string;

  @OneToMany(() => Passagem, (passagem) => passagem.onibus, { cascade: true })
  passagens: Passagem[];
}
