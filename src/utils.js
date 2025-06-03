export function validarCNPJ(cnpj) {
    if (!cnpj == null) return false;
    cnpj = cnpj.replace(/\D/g, "");
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 2 ? 9 : peso - 1;
    }
    let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (parseInt(cnpj.charAt(12)) !== digito1) return false;
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 2 ? 9 : peso - 1;
    }
    let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return parseInt(cnpj.charAt(13)) === digito2;
}

export function formatarCNPJ(cnpj) {
    if (cnpj == null) return "";
    return cnpj
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
}

export function formatarCEP(cep) {
    if (cep == null) return "";
    return cep.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

export function formatarCPF(cpf) {
    if (cpf == null) return "";
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length > 11) {
        cpf = cpf.slice(0, 11);
    }
    return cpf.replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatarTelefone(telefone) {
    if (telefone == null) return "";
    telefone = telefone.replace(/\D/g, "");
    if (telefone.length === 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    if (telefone.length === 10) {
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return telefone
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 15);
}

export function validarTelefone(telefone) {
    if (telefone == null) return false;
    telefone = telefone.replace(/\D/g, "");
    return telefone.length === 10 || telefone.length === 11;
}

export function formatarData(data) {
    if (data == null) return "";
    const date = new Date(data);
    if (!isNaN(date)) {
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    return data;
}

export function validarEmail(email) {
    if (email == null) return false;
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

export function validarSenha(senha, confirmarSenha) {
    if (senha == null || confirmarSenha == null) return false;
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return re.test(senha) && senha === confirmarSenha;
}

export function validarCPF(cpf) {
    if (cpf == null) return false;
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf[i - 1]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) {
        return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf[i - 1]) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

export function validarNome(nome) {
    if (nome == null) return false;
    return typeof nome === 'string' && nome.trim().length >= 3;
}
