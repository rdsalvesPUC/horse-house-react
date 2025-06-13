import Input from "./Input.jsx";
import {useState, useEffect} from "react";
import Aviso from "./Aviso.jsx";
import {formatarTelefone, formatarCEP, formatarCPF, validarEmail} from '../utils';
import useCep from "../hooks/useCep.jsx";

export default function EditProfile({userData, reloadUser}) {
    const [cepValido, buscarCep] = useCep();
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        cargo: "",
        foto: "",
        cpf: "",
        telefone: "",
        dataNascimento: "",
        email: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: "",
        numero: "",
        complemento: "",
        crmv: ""
    })
    useEffect(() => {
        if (userData) {
            setFormData((prev) => ({...prev, ...userData}));
        }
    }, [userData]);

    useEffect(() => {
        if (formData.cep && formData.cep.length === 8) {
            buscarCep(formData.cep)
        }
    }, [formData.cep, buscarCep]);
    useEffect(() => {
        if (cepValido.cep) {
            setFormData((prev) => ({
                ...prev,
                estado: cepValido.estado,
                cidade: cepValido.cidade,
                bairro: cepValido.bairro,
                logradouro: cepValido.logradouro
            }));
        }
    }, [cepValido, setFormData]);

    function formatarData(data) {
        if (!data) return "";
        const d = new Date(data);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function changeFoto(event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("foto", file);

            let url = "";
            if (userData.cargo === "Proprietário") {
                url = `http://localhost:3000/api/proprietario/editar`;
            } else if (userData.cargo === "Gerente") {
                url = `http://localhost:3000/api/gerente`;
            } else if (userData.cargo === "Tratador") {
                url = `http://localhost:3000/api/tratador`;
            } else if (userData.cargo === "Veterinário") {
                url = `http://localhost:3000/api/veterinario`;
            } else {
                console.error("Cargo não reconhecido:", userData.cargo);
                return;
            }


            const TOKEN = localStorage.getItem('token');

            fetch(url, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: formData
            }).then((response) => {
                if (response.ok) {
                    reloadUser();
                    return response.json();
                }
                throw new Error("Erro ao atualizar foto");
            }).then(() => {
                setAviso({ativo: true, titulo: "Sucesso!", mensagem: "Foto atualizada com sucesso!"});
            }).catch((error) => {
                console.error("Erro:", error);
                setAviso({ativo: true, titulo: "Erro!", mensagem: "Erro ao atualizar a foto!"});
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        let data = {
            nome: formData.nome,
            sobrenome: formData.sobrenome,
            telefone: formData.telefone,
            dataNascimento: formatarData(formData.dataNascimento),
            email: formData.email,
        }
        let url = "";
        if (userData.cargo === "Proprietário") {
            url = `http://localhost:3000/api/proprietario/editar`;

            data = {
                ...data,
                cep: formData.cep,
                estado: formData.estado,
                cidade: formData.cidade,
                bairro: formData.bairro,
                rua: formData.logradouro,
                numero: formData.numero,
                complemento: formData.complemento
            }
            if (!cepValido.cep) {
                return;
            }
            if (formData.logradouro.length < 3) {
                return;
            }
            if (formData.bairro.length < 3) {
                return;
            }
            if (formData.estado.length < 2) {
                return;
            }
            if (formData.cidade.length < 3) {
                return;
            }
            if (formData.numero.length < 1) {
                return;
            }
        }
        if (formData.nome.length < 3) {
            return;
        }
        if (formData.sobrenome.length < 3) {
            return;
        }
        if (formData.telefone.length < 10) {
            return;
        }
        if (formData.dataNascimento.length < 10) {
            return;
        }
        if (!validarEmail(formData.email)) {
            return;
        }
        if (userData.cargo === "Gerente") {
            url = `http://localhost:3000/api/gerente`;
        }
        if (userData.cargo === "Tratador") {
            url = `http://localhost:3000/api/tratador`;
        }
        if (userData.cargo === "Veterinário") {
            url = `http://localhost:3000/api/veterinario`;
            data = {
                ...data,
                crmv: formData.crmv
            }
        }

        const TOKEN = localStorage.getItem('token');
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                reloadUser();
                return response.json();
            } else {
                throw new Error("Erro ao atualizar usuário");
            }
        }).then(() => {
            setAviso({ativo: true, titulo: "Sucesso!", mensagem: "Dados atualizados com sucesso!"});

        }).catch(() => {
            setAviso({ativo: true, titulo: "Erro!", mensagem: "Erro ao atualizar os dados!"});
        })
    }

    return (
        <>
            {aviso.ativo &&
                <Aviso titulo={aviso.titulo} mensagem={aviso.mensagem} onClose={() => setAviso({ativo: false})}/>}
            <div className="container max-w-4xl mx-auto py-6 px-6 space-y-6">
                {/* Título da página */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight">Perfil do Usuário</h1>
                    <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais e preferências de
                        conta</p>
                </div>

                {/* Card: Foto do Perfil */}
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Cabeçalho do card */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Foto do Perfil</h2>
                        <p className="text-muted-foreground mt-1 text-sm">Atualize sua foto de perfil. Recomendamos uma
                            imagem de pelo menos 400×400 px.</p>
                    </div>
                    {/* Conteúdo do card */}
                    <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                            {/* Avatar / fallback */}
                            <div
                                className="w-32 h-32 rounded-full bg-secondary border-4 border-muted flex items-center justify-center text-4xl text-primary">
                                <img src={userData.foto || "/assets/images/user.png"} id="avatar" alt="Avatar"
                                     className="h-full w-full rounded-full object-cover"/>
                            </div>
                            {/* Botão de upload */}
                            <label htmlFor="avatar-upload"
                                   className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white rounded-full p-2 cursor-pointer">
                                {/* ícone de upload */}
                                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                                    {/* seu ícone aqui */}
                                </svg>
                                <span className="sr-only">Alterar foto</span>
                            </label>
                            <input onChange={changeFoto} id="avatar-upload" type="file" accept="image/*"
                                   className="hidden"/>
                        </div>
                    </div>
                </div>

                {/* Card: Informações Pessoais */}
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Cabeçalho do card */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                        <p className="text-muted-foreground mt-1 text-sm">Atualize suas informações pessoais e de
                            contato</p>
                    </div>
                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* CPF (read-only) */}
                        <div>
                            <label htmlFor="cpf" className="block text-sm font-medium text-muted-foreground">CPF</label>
                            <input id="cpf" type="text" value={formatarCPF(formData.cpf)} readOnly
                                   className="mt-1 block w-full bg-muted border border-secondary/20 rounded-md px-3 py-2 text-gray-400"/>
                            <p className="mt-1 text-xs text-muted-foreground">Seu CPF não pode ser alterado.</p>
                        </div>

                        {/* Nome e Sobrenome */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input nome="Nome"
                                   onchange={(value) => setFormData(
                                       (prev) => ({...prev, nome: value})
                                   )}
                                   erro={formData.nome.length < 3}
                                   textoErro="O Nome completo é obrigatório."
                                   valor={formData.nome}
                                   tipo="text"
                                   variant="profile"
                            />
                            <Input nome="Sobrenome"
                                   onchange={(value) => setFormData(
                                       (prev) => ({...prev, sobrenome: value})
                                   )}
                                   erro={formData.sobrenome.length < 3}
                                   textoErro="O Sobrenome completo é obrigatório."
                                   valor={formData.sobrenome}
                                   tipo="text"
                                   variant="profile"
                            />
                        </div>

                        {/* Telefone e Data de Nascimento */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input nome="Telefone"
                                   onchange={(value) => setFormData(
                                       (prev) => ({...prev, telefone: value.replace(/\D/g, "").slice(0, 11) || ""})
                                   )}
                                   erro={formData.telefone.length < 10}
                                   textoErro="O Telefone é obrigatório."
                                   valor={formatarTelefone(formData.telefone) || ""}
                                   tipo="text"
                                   variant="profile"
                            />
                            <Input nome="Data de Nascimento"
                                   onchange={(value) => setFormData(
                                       (prev) => ({...prev, dataNascimento: value})
                                   )}
                                   erro={formData.dataNascimento.length < 10}
                                   textoErro="Insira uma data de nascimento válida."
                                   valor={formatarData(formData.dataNascimento)}
                                   tipo="date"
                                   variant="profile"
                            />
                        </div>

                        {/* E-mail */}
                        <Input nome="E-mail"
                               onchange={(value) => setFormData(
                                   (prev) => ({...prev, email: value})
                               )}
                               erro={!validarEmail(formData.email)}
                               textoErro="O E-mail é obrigatório."
                               valor={formData.email}
                               tipo="text"
                               variant="profile"
                        />
                        {userData.cargo === "Veterinário" && (
                            <Input nome="CRMV"
                                   onchange={(value) => setFormData(
                                       (prev) => ({...prev, crmv: value.replace(/\D/g, "").slice(0, 10) || ""})
                                   )}
                                   erro={formData.crmv && formData.crmv.length < 5}
                                   textoErro="O CRMV é obrigatório para veterinários."
                                   valor={formData.crmv}
                                   tipo="text"
                                   variant="profile"
                            />)}

                        {userData.cargo === "Proprietário" && (
                            <>
                                <Input nome="CEP"
                                       onchange={(value) => setFormData(
                                           (prev) => ({...prev, cep: value.replace(/\D/g, "").slice(0, 8) || ""})
                                       )}
                                       erro={!cepValido.cep}
                                       textoErro="O CEP é obrigatório."
                                       valor={formatarCEP(formData.cep) || ""}
                                       tipo="text"
                                       variant="profile"
                                />

                                {/* Estado e Cidade */}
                                <div id="container-estado" className="grid md:grid-cols-2 gap-4">
                                    <Input nome="Estado"
                                           disabled={cepValido.cep && cepValido.estado}
                                           onchange={(value) => setFormData(
                                               (prev) => ({...prev, estado: value})
                                           )}
                                           erro={formData.estado.length < 2}
                                           textoErro="O Estado é obrigatório."
                                           valor={formData.estado}
                                           tipo="text"
                                           variant="profile"
                                    />
                                    {/* Cidade */}
                                    <Input nome="Cidade"
                                           disabled={cepValido.cep && cepValido.cidade}
                                           onchange={(value) => setFormData(
                                               (prev) => ({...prev, cidade: value})
                                           )}
                                           erro={formData.cidade.length < 3}
                                           textoErro="A Cidade é obrigatória."
                                           valor={formData.cidade}
                                           tipo="text"
                                           variant="profile"
                                    />
                                </div>

                                {/* Bairro */}
                                <Input nome="Bairro"
                                       disabled={cepValido.cep && cepValido.bairro}
                                       onchange={(value) => setFormData(
                                           (prev) => ({...prev, bairro: value})
                                       )}
                                       erro={formData.bairro.length < 3}
                                       textoErro="O Bairro é obrigatório."
                                       valor={formData.bairro}
                                       tipo="text"
                                       variant="profile"
                                />

                                {/* Rua e Número */}
                                <div id="container-rua" className="grid md:grid-cols-4 gap-4">
                                    <Input nome="Rua"
                                           disabled={cepValido.cep && cepValido.logradouro}
                                           onchange={(value) => setFormData(
                                               (prev) => ({...prev, logradouro: value})
                                           )}
                                           erro={formData.logradouro.length < 3}
                                           textoErro="A Rua é obrigatória."
                                           valor={formData.logradouro}
                                           tipo="text"
                                           variant="profile"
                                    />

                                    <Input nome="Número"
                                           onchange={(value) => setFormData(
                                               (prev) => ({...prev, numero: value})
                                           )}
                                           erro={formData.numero.length < 1}
                                           textoErro="O Número é obrigatório."
                                           valor={formData.numero}
                                           tipo="text"
                                           variant="profile"
                                    />

                                    <Input nome="Complemento"
                                           onchange={(value) => setFormData(
                                               (prev) => ({...prev, complemento: value})
                                           )}
                                           valor={formData.complemento}
                                           tipo="text"
                                           variant="profile"
                                    />
                                </div>
                            </>
                        )}

                        {/* Botões de ação */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button type="button"
                                        className="border border-secondary text-secondary px-4 py-2 hover:bg-secondary/10 transition-colors">Alterar
                                    Senha
                                </button>
                            </div>
                            <button type="submit"
                                    className="ml-auto bg-primary text-white px-4 py-2 hover:bg-primary/90 transition-colors">Salvar
                                Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
