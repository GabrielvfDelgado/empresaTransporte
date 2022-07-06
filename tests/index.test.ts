import { Passageiro } from "../src/4 - Dominio/Entities/passageiro.entity";

describe("testing entity", () => {
  it("Criando passageiro", () => {
    const passageiro = new Passageiro();

    passageiro.nome = "Gabriel";
    passageiro.cpf = "111.111.111-00";

    expect(passageiro.nome).toBe("Gabriel");
    expect(passageiro.cpf).toBe("111.111.111-00");
  });
});
