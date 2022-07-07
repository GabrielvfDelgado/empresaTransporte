import { Repository } from "typeorm";
import Onibus from "../src/4 - Dominio/Entities/onibus.entity";
import { Passageiro } from "../src/4 - Dominio/Entities/passageiro.entity";
import { Passagem } from "../src/4 - Dominio/Entities/passagem.entity";
import Rota from "../src/4 - Dominio/Entities/rota.entity";
import { PassagemService } from "../src/4 - Dominio/Services/passagemService";

describe("Passagem Service", () => {
  let service: PassagemService;
  let repositorio: Repository<Passagem>;

  beforeEach(() => {
    repositorio = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Passagem>;

    service = new PassagemService(repositorio);
  });

  it("Reserva lugar para o passageiro", async () => {
    const rota = new Rota();
    rota.paradas = ["centro", "flamengo", "botafogo", "copacabana"];

    const passageiro = new Passageiro();
    passageiro.nome = "Gabriel";

    const onibus = new Onibus();
    onibus.lugares = 28;
    onibus.tipo = "leito";

    const reserva = await service.reservaLugar(passageiro, onibus, rota);

    expect(reserva).toBeDefined();
    expect(reserva.passageiro.nome).toBe("Gabriel");
    expect(reserva.comecoViagem).toBe("centro");
    expect(reserva.fimViagem).toBe("copacabana");
    expect(reserva.valor).toBe(7);
    expect(onibus.lugares).toBe(27);
  });

  it("Verifica Promocao", async () => {
    const rota = new Rota();
    rota.paradas = ["centro", "flamengo", "botafogo", "copacabana"];

    const promocao = await service.verificaRota(
      rota.paradas,
      "centro",
      "copacabana"
    );

    expect(promocao).toBeDefined();
    expect(promocao).toBe(true);
  });

  it("Verifica Vagas", async () => {
    const onibus = new Onibus();
    onibus.lugares = 28;
    onibus.tipo = "leito";

    const vaga = await service.verificaLugar(onibus.lugares);

    expect(vaga).toBeDefined();
    expect(vaga).toBe(true);
  });
});
