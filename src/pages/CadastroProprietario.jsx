import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import InputSenha from "../components/InputSenha.jsx";
import Aviso from "../components/Aviso.jsx";
import Input from "../components/Input.jsx";
import {
    formatarCPF,
    formatarTelefone,
    formatarCEP,
    validarEmail,
    validarSenha,
    validarCPF,
    validarTelefone,
    validarNome
} from '../utils';

export default function CadastroProprietario() {
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        telefone: "",
        cpf: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        dataNascimento: ""
    });
    const [cepValido, setCepValido] = useState(false)
    const navigate = useNavigate();


    const [currentStep, setCurrentStep] = useState(1);
    const titleData = [
        {title: "Informações Pessoais", description: "Preencha suas informações pessoais"},
        {title: "Informações de Contato", description: "Como podemos entrar em contato com você?"},
        {title: "Endereço", description: "Informe seu endereço completo"},
        {title: "Segurança da Conta", description: "Crie uma senha forte para proteger sua conta"}
    ]

    const handleNext = () => setCurrentStep((prev) => {
        if (currentStep === 1 && (!validarCPF(formData.cpf) || !validarNome(formData.nome) || !validarNome(formData.sobrenome))) {
            return prev;
        }
        if (currentStep === 2 && (!validarEmail(formData.email) || !validarTelefone(formData.telefone) || !formData.dataNascimento)) {
            return prev;
        }
        if (currentStep === 3 && (!cepValido || !formData.endereco || !formData.numero || !formData.bairro || !formData.cidade || !formData.estado)) {
            return prev;
        }
        return Math.min(prev + 1, 4)
    });

    function handlePrevious() {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validarSenha(formData.senha, formData.confirmarSenha) || !validarEmail(formData.email) || !validarCPF(formData.cpf) || !validarTelefone(formData.telefone) || !cepValido || !formData.endereco || !formData.numero || !formData.bairro || !formData.cidade || !formData.estado) {
            return false;
        }
        try {
            const response = await fetch("http://localhost:3000/api/criarProprietario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    sobrenome: formData.sobrenome,
                    email: formData.email,
                    senha: formData.senha,
                    telefone: formData.telefone,
                    cpf: formData.cpf,
                    cep: formData.cep,
                    rua: formData.endereco,
                    numero: formData.numero,
                    complemento: formData.complemento,
                    bairro: formData.bairro,
                    cidade: formData.cidade,
                    estado: formData.estado,
                    dataNascimento: formData.dataNascimento
                })
            });
            const data = await response.json();
            if (response.ok) {
                setAviso({
                    ativo: true,
                    mensagem: "Cadastro realizado com sucesso!",
                    titulo: "Sucesso",
                    onConfirm: () => {
                        navigate("/");
                    }
                });
                setCurrentStep(1);
            } else {
                if (response.status === 409) {
                    setAviso({
                        ativo: true,
                        mensagem: "Email ou Cpf já cadastrado.",
                        titulo: "Erro"
                    });
                } else {
                    setAviso({
                        ativo: true,
                        mensagem: data.mensagem || "Erro ao cadastrar. Tente novamente.",
                        titulo: "Erro"
                    });
                }

            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            setAviso({
                ativo: true,
                mensagem: "Erro ao cadastrar. Tente novamente.",
            })
        }
    }

    useEffect(() => {
        if (formData.cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    if (!data.erro) {
                        setCepValido(true);
                        setFormData((prevState) => ({
                            ...prevState,
                            endereco: data.logradouro,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            estado: data.estado
                        }));
                    } else {
                        setCepValido(false);
                        console.error("CEP inválido");
                    }
                })
                .catch((error) => {
                    setCepValido(false);
                    console.error("Erro ao buscar o CEP:", error);
                })
        } else {
            setCepValido(false);
        }
    }, [formData.cep]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3000/api/loginExpirado", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Erro ao verificar token");
                    }
                })
                .then((data) => {
                    navigate("/dashboard");
                })
                .catch((error) => {
                    localStorage.removeItem("token");
                });
        }
    }, []);


    return (
        <div className="flex flex-col h-screen min-h-[768px]">
            <header
                className="relative justify-between items-center bg-primary flex w-full gap-[40px_100px] flex-wrap p-8 max-md:max-w-full max-md:px-5">
                <Link to="/">
                    <img src="/assets/images/logo-h-whitebg.svg" alt="Logo"
                         className="aspect-[4.59] object-contain w-[202px] self-stretch shrink-0 my-auto"/>
                </Link>
                <div className="self-stretch flex items-center gap-4 my-auto">
                    <div
                        className="hidden xl:block text-tertiary text-[19px] font-semibold self-stretch my-auto font-lexend text-base">Não
                        tem uma conta?
                    </div>
                    <Link to="/registro"
                          className="self-stretch bg-secondary hover:bg-tertiary gap-2.5 text-tertiary hover:text-secondary font-heebo text-base font-bold my-auto px-5 py-2.5">SIGN
                        UP</Link>
                </div>
            </header>
            {aviso.ativo && <Aviso
                mensagem={aviso.mensagem}
                titulo={aviso.titulo}
                onClose={() => {
                    setAviso({...aviso, ativo: false})
                    aviso.onConfirm()
                }}/>}
            <main className="relative flex flex-col items-center flex-1">
                <img src="/assets/images/hero.jpg" alt="Background"
                     className="absolute h-full w-full object-cover inset-0"/>
                <div className="absolute inset-0 bg-[rgba(34,44,45,0.8)]"></div>
                <div
                    className="relative z-10 bg-tertiary rounded-xl shadow-lg overflow-hidden mt-[88px] mb-[88px] px-8 py-12 w-full min-w-[320px] max-w-[768px]">
                    <div className="relative w-full">
                        <div className="absolute h-[2px] bg-gray-200 top-[20px] left-[12.5%] right-[12.5%]"></div>

                        <div className="relative z-10 flex justify-between items-start mb-10">

                            <div className="flex-1 flex flex-col items-center" data-step-indicator="1">
                                <div
                                    className={`w-10 h-10 rounded-full ${currentStep >= 1 ? "bg-secondary border-primary" : "bg-tertiary border-secondary"} text-primary border flex items-center justify-center`}>{currentStep >= 2 ? "✓" : 1}</div>
                                <span
                                    className="text-xs mt-2 text-secondary whitespace-nowrap">Informações Pessoais</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center" data-step-indicator="2">
                                <div
                                    className={`w-10 h-10 rounded-full ${currentStep >= 2 ? "bg-secondary border-primary" : "bg-tertiary border-secondary"} text-primary border flex items-center justify-center`}>{currentStep >= 3 ? "✓" : 2}</div>
                                <span className="text-xs mt-2 text-gray-400 whitespace-nowrap">Contato</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center" data-step-indicator="3">
                                <div
                                    className={`w-10 h-10 rounded-full ${currentStep >= 3 ? "bg-secondary border-primary" : "bg-tertiary border-secondary"} text-primary border flex items-center justify-center`}>{currentStep >= 4 ? "✓" : 3}</div>
                                <span className="text-xs mt-2 text-gray-400 whitespace-nowrap">Endereço</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center" data-step-indicator="4">
                                <div
                                    className={`w-10 h-10 rounded-full ${currentStep >= 4 ? "bg-secondary border-primary" : "bg-tertiary border-secondary"} text-primary border flex items-center justify-center`}>{currentStep >= 5 ? "✓" : 4}</div>
                                <span className="text-xs mt-2 text-gray-400 whitespace-nowrap">Segurança</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <h1 className="font-lexend text-2xl text-primary font-semibold">{titleData[currentStep - 1].title}</h1>
                        <p className="text-gray-600 mt-1">{titleData[currentStep - 1].description}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        {currentStep === 1 && (
                            <section className="space-y-6">
                                {/* Campos da Etapa 1 */}
                                <Input nome={"CPF"}
                                       tipo={"text"}
                                       erro={!validarCPF(formData.cpf)}
                                       textoErro={"Insira um CPF válido."}
                                       placeHolder={"Digite seu CPF"}
                                       onchange={(value) => setFormData({
                                           ...formData,
                                           cpf: value.replace(/\D/g, "").slice(0, 11)
                                       })}
                                       valor={formatarCPF(formData.cpf)}
                                       variant="form"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input nome={"Nome"}
                                           tipo={"text"}
                                           erro={validarNome(formData.nome)}
                                           textoErro={"O Nome é obrigatório."}
                                           placeHolder={"Digite seu nome"}
                                           onchange={(value) => setFormData({...formData, nome: value})}
                                           valor={formData.nome}
                                           variant="form"
                                    />
                                    <Input nome={"Sobrenome"}
                                           tipo={"text"}
                                           erro={validarNome(formData.sobrenome)}
                                           textoErro={"O Sobrenome é obrigatório."}
                                           placeHolder={"Digite seu sobrenome"}
                                           onchange={(value) => setFormData({...formData, sobrenome: value})}
                                           valor={formData.sobrenome}
                                           variant="form"
                                    />
                                </div>
                                <button type="button" className="btn-form-next" onClick={handleNext}>Próximo</button>
                            </section>
                        )}
                        {currentStep === 2 && (
                            <section className="space-y-6">
                                {/* Campos da Etapa 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        nome={"Telefone"}
                                        tipo={"text"}
                                        erro={!validarTelefone(formData.telefone)}
                                        textoErro={"O Telefone é obrigatório."}
                                        placeHolder={"(00) 00000-0000"}
                                        onchange={(value) => setFormData({
                                            ...formData,
                                            telefone: value.replace(/\D/g, "").slice(0, 11)
                                        })}
                                        valor={formatarTelefone(formData.telefone)}
                                        variant="form"
                                    />
                                    <Input
                                        nome={"Data de Nascimento"}
                                        tipo={"date"}
                                        erro={!formData.dataNascimento}
                                        textoErro={"A Data de Nascimento é obrigatória."}
                                        placeHolder={"DD/MM/AAAA"}
                                        onchange={(value) => setFormData({...formData, dataNascimento: value})}
                                        valor={formData.dataNascimento}
                                        variant="form"
                                    />
                                </div>
                                <Input
                                    nome={"Email"}
                                    tipo={"email"}
                                    erro={!validarEmail(formData.email)}
                                    textoErro={"Insira um email válido."}
                                    placeHolder={"Digite seu email"}
                                    onchange={(value) => setFormData({...formData, email: value})}
                                    valor={formData.email}
                                    variant="form"
                                />
                                <div className="flex gap-8">
                                    <button type="button" className="btn-form-previous"
                                            onClick={handlePrevious}>Voltar
                                    </button>
                                    <button type="button" className="btn-form-next" onClick={handleNext}>Próximo
                                    </button>
                                </div>
                            </section>
                        )}
                        {currentStep === 3 && (
                            <section className="space-y-6">
                                {/* Campos da Etapa 3 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        nome={"CEP"}
                                        tipo={"text"}
                                        erro={!cepValido}
                                        textoErro={"Insira um CEP válido."}
                                        placeHolder={"Digite seu CEP"}
                                        onchange={(value) => setFormData({
                                            ...formData,
                                            cep: value.replace(/\D/g, "").slice(0, 8)
                                        })}
                                        valor={formatarCEP(formData.cep)}
                                        variant="form"
                                    />
                                    <Input
                                        nome={"Estado"}
                                        tipo={"text"}
                                        disabled={cepValido && formData.estado}
                                        erro={!formData.estado}
                                        textoErro={"O Estado é obrigatório."}
                                        placeHolder={"Digite seu estado"}
                                        onchange={(value) => setFormData({...formData, estado: value})}
                                        valor={formData.estado}
                                        variant="form"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        nome={"Cidade"}
                                        tipo={"text"}
                                        disabled={cepValido && formData.cidade}
                                        erro={!formData.cidade}
                                        textoErro={"A Cidade é obrigatória."}
                                        placeHolder={"Digite sua cidade"}
                                        onchange={(value) => setFormData({...formData, cidade: value})}
                                        valor={formData.cidade}
                                        variant="form"
                                    />
                                    <Input
                                        nome={"Bairro"}
                                        tipo={"text"}
                                        disabled={cepValido && formData.bairro}
                                        erro={!formData.bairro}
                                        textoErro={"O Bairro é obrigatório."}
                                        placeHolder={"Digite seu bairro"}
                                        onchange={(value) => setFormData({...formData, bairro: value})}
                                        valor={formData.bairro}
                                        variant="form"
                                    />
                                </div>
                                <Input
                                    nome={"Endereço"}
                                    tipo={"text"}
                                    disabled={cepValido && formData.endereco}
                                    erro={!formData.endereco}
                                    textoErro={"O Endereço é obrigatório."}
                                    placeHolder={"Digite seu endereço"}
                                    onchange={(value) => setFormData({...formData, endereco: value})}
                                    valor={formData.endereco}
                                    variant="form"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        nome={"Número"}
                                        tipo={"text"}
                                        erro={!formData.numero}
                                        textoErro={"O Número é obrigatório."}
                                        placeHolder={"Digite o número"}
                                        onchange={(value) => setFormData({...formData, numero: value})}
                                        valor={formData.numero}
                                        variant="form"
                                    />
                                    <Input
                                        nome={"Complemento"}
                                        tipo={"text"}
                                        placeHolder={"Digite o complemento"}
                                        onchange={(value) => setFormData({...formData, complemento: value})}
                                        valor={formData.complemento}
                                        variant="form"
                                    />
                                </div>

                                <div className="flex gap-8">
                                    <button type="button" className="btn-form-previous"
                                            onClick={handlePrevious}>Voltar
                                    </button>
                                    <button type="button" className="btn-form-next" onClick={handleNext}>Próximo
                                    </button>
                                </div>
                            </section>
                        )}
                        {currentStep === 4 && (
                            <section className="space-y-6">
                                {/* Campos da Etapa 4 */}

                                <div>
                                    <InputSenha nome={"Senha"}
                                                placeHolder={"Digite sua senha"}
                                                onchange={(value) => setFormData({...formData, senha: value})}
                                                valor={formData.senha}/>
                                    <div className="text-sm text-gray-600 mt-2">
                                        <div className="font-medium">Requisitos:</div>
                                        <ul className="list-disc list-inside">
                                            <li className={formData.senha.match(/[A-Z]/) ? "text-success" : "text-error"}>Uma
                                                letra maiúscula
                                            </li>
                                            <li className={formData.senha.match(/\d/) ? "text-success" : "text-error"}>Um
                                                número
                                            </li>
                                            <li className={formData.senha.match(/[@$!%*?&#]/) ? "text-success" : "text-error"}>Um
                                                caractere especial
                                            </li>
                                            <li className={formData.senha.length >= 8 ? "text-success" : "text-error"}>Mínimo
                                                de 8 caracteres
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <InputSenha nome={"Confirmar Senha"}
                                                placeHolder={"Confirme sua senha"}
                                                onchange={(value) => setFormData({...formData, confirmarSenha: value})}
                                                valor={formData.confirmarSenha}/>
                                    {formData.senha !== formData.confirmarSenha && (
                                        <span className="text-error text-sm">As senhas não coincidem.</span>
                                    )}
                                </div>
                                <div className="flex gap-8">
                                    <button type="button" className="btn-form-previous"
                                            onClick={handlePrevious}>Voltar
                                    </button>
                                    <button type="submit" className="btn-form-next">Concluir Cadastro</button>
                                </div>
                            </section>
                        )}
                    </form>
                </div>
            </main>
            <footer className="bg-primary text-tertiary py-4 text-center text-sm">
                <div className="container mx-auto">&copy; 2025 HorseHouse. Todos os direitos reservados.</div>
            </footer>
        </div>
    );
}
