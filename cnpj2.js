// Função para calcular o dígito verificador do CNPJ
function calcularDvCnpj(digitos, pesos) {
    const soma = digitos.reduce((acc, d, i) => acc + d * pesos[i], 0);
    const resto = soma % 11;
    const dv = 11 - resto;
    return dv < 10 ? dv : 0;
}

// Função para gerar um CNPJ com dígitos verificadores pares
function gerarCnpj2() {
    while (true) {
        // Gera os primeiros 12 dígitos do CNPJ
        const cnpj = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).concat([0, 0, 0, 1]); // Os 4 últimos dígitos fixos (0001)

        // Pesos para o cálculo dos dígitos verificadores
        const pesosPrimeiroDv = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const pesosSegundoDv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        // Calcula o primeiro dígito verificador
        const primeiroDv = calcularDvCnpj(cnpj, pesosPrimeiroDv);

        // Ajusta o primeiro dígito verificador para ser par, se necessário
        if (primeiroDv % 2 !== 0) {
            continue; // Gera um novo CNPJ se o primeiro dígito verificador não for par
        }

        cnpj.push(primeiroDv);

        // Calcula o segundo dígito verificador
        const segundoDv = calcularDvCnpj(cnpj, pesosSegundoDv);

        // Ajusta o segundo dígito verificador para ser par, se necessário
        if (segundoDv % 2 !== 0) {
            continue; // Gera um novo CNPJ se o segundo dígito verificador não for par
        }

        cnpj.push(segundoDv);

        // Formata o CNPJ em uma string e retorna
        return cnpj.join('');
    }
}

// Exemplo de uso
console.log(gerarCnpj2());

// Exemplo de uso
function exibirCnpj2() {
    const cpfGerado = gerarCnpj2();
    document.getElementById("cnpj2-resultado").innerText = `CPF Gerado: ${cpfGerado}`;
}