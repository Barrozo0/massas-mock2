// Função para calcular o dígito verificador
function calcularDv(digitos) {
    const peso = digitos.length + 1;
    const soma = digitos.reduce((acc, d, i) => acc + d * (peso - i), 0);
    const resto = soma % 11;
    const dv = 11 - resto;
    return dv < 10 ? dv : 0;
}

// Função para gerar CPF
function gerarCpf1() {
    while (true) {
        // Gera os primeiros 9 dígitos do CPF
        const cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

        // Calcula o primeiro dígito verificador
        const primeiroDv = calcularDv(cpf);

        // Ajusta o primeiro dígito verificador para ser par, se necessário
        if (primeiroDv % 2 !== 0) {
            continue; // Gera um novo CPF se o primeiro dígito verificador não for par
        }

        cpf.push(primeiroDv);

        // Calcula o segundo dígito verificador
        const segundoDv = calcularDv(cpf);

        // Ajusta o segundo dígito verificador para ser par, se necessário
        if (segundoDv % 2 !== 0) {
            continue; // Gera um novo CPF se o segundo dígito verificador não for par
        }

        cpf.push(segundoDv);

        // Formata o CPF em uma string
        return cpf.join('');
    }
}

// Exemplo de uso
console.log(gerarCpf());

// Exemplo de uso
function exibirCpf1() {
    const cpfGerado = gerarCpf1();
    document.getElementById("cpf1-resultado").innerText = `: ${cpfGerado}`;
}