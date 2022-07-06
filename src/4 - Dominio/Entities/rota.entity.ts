import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Passagem } from "./passagem.entity";

@Entity()
export default class Rota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paradas: Array<string>;

  @OneToMany(() => Passagem, (passagem) => passagem.rota)
  passagens: Passagem[];
}
