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
        if (dv === 7 || dv === 9) { // Evita 7 e 9, ajustando para outros ímpares
            dv = dv === 7 ? 5 : 3 ;
        }
        return dv;
    }

    // Função para garantir que o segundo dígito verificador seja ímpar
    function forcarSegundoDvImpar(cpf, pesosSegundoDv) {
        let segundoDv = calcularDvCpf(cpf, pesosSegundoDv);
        if (segundoDv % 2 === 0) { // Se for par, ajusta para ser ímpar
            segundoDv = segundoDv === 9 ? 7 : segundoDv + 1; // Ajusta para 7 se for 9, senão incrementa
        }
        return segundoDv;
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
    function gerarCpf3() {
        const cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)); // Base do CPF

        const pesosPrimeiroDv = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        const pesosSegundoDv = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

        // Calcular o primeiro dígito verificador
        let primeiroDv = calcularDvCpf(cpf, pesosPrimeiroDv);
        primeiroDv = ajustarPrimeiroDv(primeiroDv); // Ajustar para ser ímpar (diferente de 7 ou 9)
        cpf.push(primeiroDv);

        // Calcular o segundo dígito verificador e forçar que seja ímpar
        let segundoDv = forcarSegundoDvImpar(cpf, pesosSegundoDv);
        cpf.push(segundoDv);

        // Verificar se o CPF gerado é válido
        if (validarCpf(cpf)) {
            return cpf.join('');
        } else {
            return gerarCpf3(); // Tentar novamente
        }
    }

    // Função para exibir o CPF gerado
    function exibirCpf3() {
        const cpfGerado3 = gerarCpf3();
        const primeiroDv = parseInt(cpfGerado3[9]); // Penúltimo dígito no CPF gerado

        if (primeiroDv === 7 || primeiroDv === 9) {
            document.getElementById("cpf3-resultado").innerText = `O primeiro dígito verificador é ${primeiroDv}. GERE UM NOVO CPF!`;
        } else {
            document.getElementById("cpf3-resultado").innerText = `${cpfGerado3}`;
        }
    }