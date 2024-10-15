// Função para calcular o dígito verificador do CNPJ
function calcularDvCnpj(digitos, pesos) {
    const soma = digitos.reduce((acc, d, i) => acc + d * pesos[i], 0);
    const resto = soma % 11;
    const dv = 11 - resto;
    return dv < 10 ? dv : 0;
}

// Função para garantir que o dígito seja ímpar (diferente de 9)
function ajustarDvImpar(dv) {
    if (dv % 2 === 0) { // Se for par, soma 1 para torná-lo ímpar
        dv += 1;
    }
    if (dv === 9) { // Se for 9, ajusta para 7
        dv = 7;
    }
    return dv;
}

// Função para validar um CNPJ gerado
function validarCnpj(cnpj) {
    const pesosPrimeiroDv = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesosSegundoDv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    // Verificar primeiro dígito verificador
    const primeiroDv = calcularDvCnpj(cnpj.slice(0, 12), pesosPrimeiroDv);
    if (primeiroDv !== cnpj[12]) {
        return false;
    }

    // Verificar segundo dígito verificador
    const segundoDv = calcularDvCnpj(cnpj.slice(0, 13), pesosSegundoDv);
    if (segundoDv !== cnpj[13]) {
        return false;
    }

    return true;
}

// Função para gerar CNPJ válido com ambos os dígitos verificadores ímpares (não 9)
function gerarCnpj4() {
    while (true) {
        const cnpj = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).concat([0, 0, 0, 1]); // Base do CNPJ

        const pesosPrimeiroDv = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const pesosSegundoDv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        // Calcular o primeiro dígito verificador
        let primeiroDv = calcularDvCnpj(cnpj, pesosPrimeiroDv);
        primeiroDv = ajustarDvImpar(primeiroDv); // Ajustar para ser ímpar e diferente de 9
        cnpj.push(primeiroDv);

        // Calcular o segundo dígito verificador
        let segundoDv = calcularDvCnpj(cnpj, pesosSegundoDv);
        segundoDv = ajustarDvImpar(segundoDv); // Ajustar para ser ímpar e diferente de 9
        cnpj.push(segundoDv);

        // Verificar se o CNPJ gerado é válido
        if (validarCnpj(cnpj)) {
            // Transformar o CNPJ em string e retornar
            return cnpj.join('');
        }
    }
}

// Exemplo de uso
console.log(gerarCnpj4());
// Exemplo de uso
function exibirCnpj4() {
    const cpfGerado = gerarCnpj4();
    document.getElementById("cnpj4-resultado").innerText = `CPF Gerado: ${cpfGerado}`;
}