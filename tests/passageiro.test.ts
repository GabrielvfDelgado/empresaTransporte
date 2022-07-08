import { Repository } from "typeorm";
import Onibus from "../src/4 - Dominio/Entities/onibus.entity";
import { Passageiro } from "../src/4 - Dominio/Entities/passageiro.entity";
import { Passagem } from "../src/4 - Dominio/Entities/passagem.entity";
import Rota from "../src/4 - Dominio/Entities/rota.entity";
import PassageiroService from "../src/4 - Dominio/Services/passageiroService";

describe("Passagem Service", () => {
  let service: PassageiroService;
  let repositorio: Repository<Passageiro>;
  let repositorioPassagem: Repository<Passagem>;

  beforeEach(() => {
    repositorio = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Passageiro>;
    repositorioPassagem = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Passagem>;

    service = new PassageiroService(repositorio, repositorioPassagem);
  });

  it("Passageiro compra passagem", async () => {
    const rota = new Rota();
    rota.paradas = ["centro", "flamengo", "botafogo", "copacabana"];

    const onibus = new Onibus();
    onibus.lugares = 28;
    onibus.tipo = "leito";

    const passageiro = new Passageiro();
    passageiro.nome = "Gabriel";
    passageiro.id = 3;

    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(passageiro);
    const compra = await service.comprarPassagem(
      "centro",
      "copacabana",
      onibus,
      rota,
      3
    );

    expect(compra).toBeDefined();
    expect(compra.passageiro.nome).toBe("Gabriel");
    expect(compra.comecoViagem).toBe("centro");
    expect(onibus.lugares).toBe(27);
  });

  it("Cancelar compra", async () => {
    const rota = new Rota();
    rota.paradas = ["centro", "flamengo", "botafogo", "copacabana"];

    const onibus = new Onibus();
    onibus.lugares = 28;
    onibus.tipo = "leito";

    const passageiro = new Passageiro();
    passageiro.nome = "Gabriel";
    passageiro.id = 3;

    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(passageiro);
    const compra = await service.comprarPassagem(
      "centro",
      "copacabana",
      onibus,
      rota,
      3
    );

    expect(onibus.lugares).toBe(27);

    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(passageiro);
    jest.spyOn(repositorioPassagem, "findOne").mockResolvedValueOnce(compra);
    const cancelar = await service.cancelarPassagem(passageiro.id, onibus);

    expect(cancelar).toBeDefined();
    expect(cancelar).toBe(1);
    expect(onibus.lugares).toBe(28);
  });
});
