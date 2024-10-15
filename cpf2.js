// Função para calcular o dígito verificador
function calcularDvCpf(digitos, pesos) {
    const soma = digitos.reduce((acc, d, i) => acc + d * pesos[i], 0);
    const resto = soma % 11;
    const dv = 11 - resto;
    return dv < 10 ? dv : 0;
}

// Função para garantir que o primeiro dígito seja ímpar (diferente de 7 ou 9)
function ajustarPrimeiroDv(dv) {
    if (dv % 2 === 0) { // Se for par, soma 1 para torná-lo ímpar
        dv += 1;
    }
    if (dv === 7 || dv === 9) { // Se for 7 ou 9, ajusta para outro ímpar (ex: 5 ou 3)
        dv = dv === 7 ? 5 : 3;
    }
    return dv;
}

// Função para garantir que o segundo dígito seja par
function ajustarSegundoDv(dv) {
    if (dv % 2 !== 0) { // Se for ímpar, soma 1 para torná-lo par
        dv += 1;
    }
    return dv;
}

// Função para validar um CPF gerado
function validarCpf(cpf) {
    const pesosPrimeiroDv = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesosSegundoDv = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    // Verificar primeiro dígito verificador
    const primeiroDv = calcularDvCpf(cpf.slice(0, 9), pesosPrimeiroDv);
    if (primeiroDv !== cpf[9]) {
        return false;
    }

    // Verificar segundo dígito verificador
    const segundoDv = calcularDvCpf(cpf.slice(0, 10), pesosSegundoDv);
    if (segundoDv !== cpf[10]) {
        return false;
    }

    return true;
}

// Função para gerar CPF válido com as restrições dos dígitos verificadores
function gerarCpf2() {
    const cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)); // Base do CPF

    const pesosPrimeiroDv = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesosSegundoDv = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    // Calcular o primeiro dígito verificador
    let primeiroDv = calcularDvCpf(cpf, pesosPrimeiroDv);
    primeiroDv = ajustarPrimeiroDv(primeiroDv); // Ajustar para ser ímpar (diferente de 7 ou 9)
    cpf.push(primeiroDv);

    // Calcular o segundo dígito verificador
    let segundoDv = calcularDvCpf(cpf, pesosSegundoDv);
    segundoDv = ajustarSegundoDv(segundoDv); // Ajustar para ser par
    cpf.push(segundoDv);

    // Verificar se o CPF gerado é válido
    if (validarCpf(cpf)) {
        // Transformar o CPF em string e retornar
        return cpf.join('');
    } else {
        // Tentar novamente até gerar um CPF válido
        return gerarCpf2();
    }
}

// Exemplo de uso
console.log(gerarCpf2());

// Exemplo de uso
function exibirCpf2() {
    const cpfGerado = gerarCpf2();
    document.getElementById("cpf2-resultado").innerText = `CPF Gerado: ${cpfGerado}`;
}