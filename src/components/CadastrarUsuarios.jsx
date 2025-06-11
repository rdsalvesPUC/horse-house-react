import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useUser} from "../contexts/UserData.jsx";
import ModalCadastro from "./ModalCadastro.jsx";
import Input from "./Input.jsx";

export default function CadastrarUsuarios() {
    const navigate = useNavigate();
    const [harasList, setHarasList] = useState([]);
    const [haras, setHaras] = useState("");
    const [userData, updateUser] = useUser();
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        telefone: "",
        cpf: "",
        dataNascimento: "",
        tipoUsuario: "",
        harasId: "",
        crmv: ""
    })
    return (
        <ModalCadastro titulo="Cadastro de Usuários" subtitulo="Cadastre todos os tipos de funcionários no seu Haras">
            <Input nome="Nome"
                   erro={false}
                   textoErro="O Nome é obrigatório."
                   placeHolder="Digite seu nome"
                   valor={formData.nome}
                   tipo="text"
                   onchange={(value) => setFormData({...formData, nome: value})}
                   variant="register"/>
            <Input nome="Sobrenome"
                   erro={false}
                   textoErro="O Sobrenome é obrigatório."
                   placeHolder="Digite seu sobrenome"
                   valor={formData.sobrenome}
                   tipo="text"
                   onchange={(value) => setFormData({...formData, sobrenome: value})}
                   variant="register"/>


            {/*EMAIL*/}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">E-mail<span className="text-error"> *</span></label>
                <input id="email" type="text" className="rounded-md p-3 text-sm border border-secondary"
                       placeholder="Digite seu e-mail"/>
                <p id="email-erro" className="text-error text-sm mt-1 hidden">O E-mail é obrigatório.</p>
                <span id="email-invalido"
                      className="text-error text-sm hidden">Insira um e-mail válido.</span>
            </div>

            {/*SENHA*/}
            <div className="flex flex-col gap-2">
                <label htmlFor="senha" className="font-medium">Senha<span
                    className="text-error"> *</span></label>
                <input id="senha" type="password" className="rounded-md p-3 text-sm border border-secondary"
                       placeholder="Digite sua senha"/>
                <p id="senha-erro" className="text-error text-sm mt-1 hidden">A Senha é obrigatória.</p>
                <div className="text-sm text-gray-600 mt-2">
                    <div id="senha-requisitos" className="font-medium">A senha deve conter:</div>
                    <ul className="list-disc list-inside">
                        <li id="req-maiuscula" className="text-error">Pelo menos uma letra maiúscula</li>
                        <li id="req-numero" className="text-error">Pelo menos um número</li>
                        <li id="req-especial" className="text-error">Pelo menos um caractere especial</li>
                        <li id="req-tamanho" className="text-error">Mínimo de 6 caracteres</li>
                    </ul>
                </div>
            </div>

            {/*TELEFONE*/}
            <div className="flex flex-col gap-2">
                <label htmlFor="telefone" className="font-medium">Telefone<span
                    className="text-error"> *</span></label>
                <input id="telefone" type="text" className="rounded-md p-3 text-sm border border-secondary"
                       placeholder="Digite seu telefone"/>
                <p id="telefone-erro" className="text-error text-sm mt-1 hidden">O Telefone é
                    obrigatório.</p>
                <span id="telefone-invalido" className="text-error text-sm hidden">Insira um telefone válido (10 a 11 dígitos).</span>
            </div>

            {/*CPF*/}
            <div className="flex flex-col gap-2">
                <label htmlFor="cpf" className="font-medium">CPF<span
                    className="text-error"> *</span></label>
                <input id="cpf" type="text" className="rounded-md p-3 text-sm border border-secondary"
                       placeholder="Digite seu CPF"/>
                <p id="cpf-erro" className="text-error text-sm mt-1 hidden">O CPF é obrigatório.</p>
                <span id="cpf-invalido" className="text-error text-sm hidden">CPF inválido! Digite um CPF válido.</span>
            </div>

            {/*DATA DE NASCIMENTO*/}
            <div className="flex flex-col gap-2">
                <label htmlFor="dataNascimento" className="font-medium">Data de Nascimento<span
                    className="text-error"> *</span></label>
                <input id="dataNascimento" type="date"
                       className="rounded-md p-3 text-sm border border-secondary"/>
                <p id="data-nascimento-erro" className="text-error text-sm mt-1 hidden">A Data de Nascimento
                    é obrigatória.</p>
                <p id="data-nascimento-invalida" className="text-error text-sm mt-1 hidden">Insira uma data
                    de nascimento válida.</p>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="tipoUsuario" className="font-medium">Tipo de Usuário</label>
                <select id="tipoUsuario" className="rounded-md p-3 text-sm border border-secondary">
                    <option value="">Selecione</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Treinador">Treinador</option>
                    <option value="Tratador">Tratador</option>
                    <option value="Veterinario">Veterinário</option>
                </select>
                <span id="erro-tipoUsuario" className="text-xs text-red-500 hidden">Selecione um tipo de usuário</span>
            </div>
            <div id="container-haras" className="hidden flex flex-col gap-2">
                <label htmlFor="select-haras" className="font-medium">Selecione o Haras</label>
                <select id="select-haras" className="rounded-md p-3 text-sm border border-secondary">
                    <option value="">Selecione o Haras</option>
                </select>
                <span id="erro-haras" className="text-xs text-red-500 hidden">Selecione um Haras</span>
            </div>
            <div id="campo-crmv" className="hidden flex flex-col gap-2">
                <label htmlFor="crmv" className="font-medium">CRMV</label>
                <input id="crmv" type="text" className="rounded-md p-3 text-sm border border-secondary"
                       placeholder="Digite o CRMV"/>
                <span id="erro-crmv" className="text-xs text-red-500 hidden">CRMV inválido</span>
            </div>
        </ModalCadastro>
    );
}