import { Repository } from "typeorm";
import Onibus from "../Entities/onibus.entity";
import { Passageiro } from "../Entities/passageiro.entity";
import { Passagem } from "../Entities/passagem.entity";
import Rota from "../Entities/rota.entity";

export class PassagemService {
  constructor(private readonly repositorio: Repository<Passagem>) {}

  verificaLugar(qtd: number) {
    const situacao = qtd > 0 ? true : false;
    return situacao;
  }

  verificaRota(rotas: Array<string>, comecoViagem: string, fimViagem: string) {
    const situacao =
      rotas[0] == comecoViagem && rotas[rotas.length - 1] == fimViagem
        ? true
        : false;
    return situacao;
  }

  async reservaLugar(passageiro: Passageiro, onibus: Onibus, rota: Rota) {
    let lugaresDisponiveis = this.verificaLugar(onibus.lugares);
    if (!lugaresDisponiveis) {
      throw new Error("Nao existe vaga no onibus");
    }
    onibus.lugares -= 1;
    const passagem = new Passagem();
    passagem.comecoViagem = "centro";
    passagem.fimViagem = "copacabana";
    passagem.horario = new Date();
    passagem.passageiro = passageiro;

    let temDesconto = this.verificaRota(
      rota.paradas,
      passagem.comecoViagem,
      passagem.fimViagem
    );
    if (temDesconto) {
      passagem.valor = 7;
      await this.repositorio.save(passagem);
      return passagem;
    }
    passagem.valor = 10;
    await this.repositorio.save(passagem);
    return passagem;
  }
}
