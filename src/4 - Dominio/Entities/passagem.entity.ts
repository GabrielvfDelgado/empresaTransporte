import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Onibus from "./onibus.entity";
import { Passageiro } from "./passageiro.entity";
import Rota from "./rota.entity";

@Entity()
export class Passagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valor: number;

  @Column()
  comecoViagem: string;

  @Column()
  fimViagem: string;

  @Column()
  horario: Date;

  @ManyToOne(() => Rota, (rota) => rota.passagens)
  @JoinColumn({ name: "idRota" })
  rota: Rota;

  @ManyToOne(() => Onibus, (onibus) => onibus.passagens)
  @JoinColumn({ name: "idOnibus" })
  onibus: Onibus;

  @OneToOne(() => Passageiro)
  @JoinColumn({ name: "idPassageiro" })
  passageiro: Passageiro;
}
