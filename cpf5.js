function calcularDv(digitos) {
    const pesoInicial = digitos.length + 1;
    const soma = digitos.reduce((acc, digito, index) => acc + digito * (pesoInicial - index), 0);
    const resto = soma % 11;
    const dv = 11 - resto;
    return dv < 10 ? dv : 0;
}

function gerarCpf5() {
    while (true) {
        // Gera os primeiros 9 dígitos do CPF
        let cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

        // Calcula o primeiro dígito verificador
        const primeiroDv = calcularDv(cpf);

        // Verifica se o primeiro dígito verificador é exatamente 7
        if (primeiroDv !== 7) continue; // Gera um novo CPF se o primeiro dígito verificador não for 7

        cpf.push(primeiroDv);

        // Calcula o segundo dígito verificador
        const segundoDv = calcularDv(cpf);

        // Verifica se o segundo dígito verificador é ímpar
        if (segundoDv % 2 === 0) continue; // Gera um novo CPF se o segundo dígito verificador não for ímpar

        cpf.push(segundoDv);

        // Formata o CPF em uma string
        return cpf.join('');
    }
}

// Exemplo de uso
console.log("CPF Gerado:", gerarCpf5());
function exibirCpf5() {
    const cpfGerado = gerarCpf5();
    document.getElementById("cpf5-resultado").innerText = `: ${cpfGerado}`;
}
