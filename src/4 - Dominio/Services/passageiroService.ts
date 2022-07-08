import { Repository } from "typeorm";
import Onibus from "../Entities/onibus.entity";
import { Passageiro } from "../Entities/passageiro.entity";
import { Passagem } from "../Entities/passagem.entity";
import Rota from "../Entities/rota.entity";
import { PassagemService } from "./passagemService";

export default class PassageiroService {
  constructor(
    private readonly repositorio: Repository<Passageiro>,
    private readonly repositorioPassagem: Repository<Passagem>
  ) {}

  async buscaPassageiro(idPassageiro: number) {
    let passageiro = await this.repositorio.findOne({
      where: {
        id: idPassageiro,
      },
    });
    if (passageiro?.id == idPassageiro && passageiro != null) {
      return passageiro;
    }
    return null;
  }

  async buscaPassagem(cliente: Passageiro) {
    let passagem = await this.repositorioPassagem.findOne({
      where: {
        passageiro: cliente,
      },
    });
    if (passagem?.passageiro == cliente && passagem != null) {
      return passagem;
    }
    return null;
  }

  async comprarPassagem(
    comecoViagem: string,
    fimViagem: string,
    onibus: Onibus,
    rota: Rota,
    idPassageiro: number
  ) {
    let passageiro = await this.buscaPassageiro(idPassageiro);
    let service = new PassagemService(this.repositorioPassagem);
    if (passageiro == null) {
      throw new Error("Nao existe esse passageiro");
    }
    let passagem = service.reservaLugar(
      passageiro,
      onibus,
      rota,
      comecoViagem,
      fimViagem
    );

    return passagem;
  }

  async cancelarPassagem(idPassageiro: number, onibus: Onibus) {
    let passageiro = await this.buscaPassageiro(idPassageiro);
    if (!passageiro) {
      throw new Error("Nao existe esse passageiro");
    }
    let passagem = await this.buscaPassagem(passageiro);
    if (!passagem) {
      throw new Error("Nao existe esse passageiro");
    }
    passagem = null;
    onibus.lugares += 1;
    return 1;
  }
}
