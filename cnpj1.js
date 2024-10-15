// Função para calcular o dígito verificador
function calcularDvCnpj(digitos, pesos) {
    const soma = digitos.reduce((acc, digito, index) => acc + digito * pesos[index], 0);
    const resto = soma % 11;
    const dv = 11 - resto;
    return dv < 10 ? dv : 0;
}

// Função para garantir que o primeiro dígito seja ímpar (diferente de 9)
function ajustarPrimeiroDv(dv) {
    if (dv % 2 === 0) {
        dv += 1;
    }
    if (dv === 9) {
        dv = 7;
    }
    return dv;
}

// Função para garantir que o segundo dígito seja par
function ajustarSegundoDv(dv) {
    return dv % 2 !== 0 ? dv + 1 : dv;
}

// Função para validar o CNPJ gerado
function validarCnpj(cnpj) {
    const pesosPrimeiroDv = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesosSegundoDv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const primeiroDv = calcularDvCnpj(cnpj.slice(0, 12), pesosPrimeiroDv);
    if (primeiroDv !== cnpj[12]) return false;

    const segundoDv = calcularDvCnpj(cnpj.slice(0, 13), pesosSegundoDv);
    if (segundoDv !== cnpj[13]) return false;

    return true;
}

// Função para gerar CNPJ válido com as restrições dos dígitos verificadores
function gerarCnpj1() {
    let cnpj = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).concat([0, 0, 0, 1]);

    const pesosPrimeiroDv = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesosSegundoDv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let primeiroDv = calcularDvCnpj(cnpj, pesosPrimeiroDv);
    primeiroDv = ajustarPrimeiroDv(primeiroDv);
    cnpj.push(primeiroDv);

    let segundoDv = calcularDvCnpj(cnpj, pesosSegundoDv);
    segundoDv = ajustarSegundoDv(segundoDv);
    cnpj.push(segundoDv);

    return validarCnpj(cnpj) ? cnpj.join('') : gerarCnpj1();
}

// Exemplo de uso
console.log("CNPJ Gerado:", gerarCnpj1());

function exibirCnpj1() {
    const cnpjGerado = gerarCnpj1();
    document.getElementById("cnpj1-resultado").innerText = `: ${cnpjGerado}`;
}