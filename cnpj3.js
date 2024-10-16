function calcularDvCnpj(digitos, pesos) {
    const soma = digitos.reduce((acc, d, i) => acc + d * pesos[i], 0);
    const resto = soma % 11;
    const dv = 11 - resto;
    return dv < 10 ? dv : 0;
}

// Função para gerar CNPJ com dígitos verificadores iguais a 9
function gerarCnpj3() {
    while (true) {
        // Gera os primeiros 12 dígitos do CNPJ
        const cnpj = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).concat([0, 0, 0, 1]); // Os 4 últimos dígitos fixos (0001)

        // Pesos para o cálculo dos dígitos verificadores
        const pesosPrimeiroDv = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const pesosSegundoDv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        // Calcula o primeiro dígito verificador
        const primeiroDv = calcularDvCnpj(cnpj, pesosPrimeiroDv);

        // Verifica se o primeiro dígito verificador é 9
        if (primeiroDv !== 9) {
            continue; // Gera um novo CNPJ se o primeiro dígito verificador não for 9
        }

        cnpj.push(primeiroDv);

        // Calcula o segundo dígito verificador
        const segundoDv = calcularDvCnpj(cnpj, pesosSegundoDv);

        // Verifica se o segundo dígito verificador é 9
        if (segundoDv !== 9) {
            continue; // Gera um novo CNPJ se o segundo dígito verificador não for 9
        }

        cnpj.push(segundoDv);

        // Formata o CNPJ em uma string e retorna
        return cnpj.join('');
    }
}

// Exemplo de uso
console.log(gerarCnpj3());

// Exemplo de uso
function exibirCnpj3() {
    const cpfGerado = gerarCnpj3();
    document.getElementById("cnpj3-resultado").innerText = `${cpfGerado}`;
}
