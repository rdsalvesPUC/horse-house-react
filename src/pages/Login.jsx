import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Aviso from "../components/Aviso.jsx";
import {useUser} from "../contexts/UserData.jsx";

export default function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [user, updateUser, logout] = useUser();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigate = useNavigate();
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
                    logout();
                });
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        if (!verificarSenha(login.password) || !verificarEmail(login.email)) {
            setAviso(
                {
                    ativo: true,
                    mensagem: "Preencha todos os campos corretamente.",
                    titulo: "Atenção"
                }
            )
            return false;
        } else {
            const usuario = {
                email: login.email,
                senha: login.password
            }
            fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Erro ao fazer login");
                    }
                })
                .then((data) => {
                    const foto = data.foto ? "http://localhost:3000" + data.foto : null;
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userType", data.userType);
                    localStorage.setItem("nome", data.nome);
                    localStorage.setItem("sobrenome", data.sobrenome);
                    localStorage.setItem("foto", foto || "");
                    updateUser()
                    setAviso(
                        {
                            ativo: true,
                            mensagem: "Login realizado com sucesso!",
                            titulo: "Sucesso",
                            onConfirm: () => {
                                navigate ("/dashboard")
                            }
                        }
                    )
                })
                .catch((error) => {
                    console.error("Erro:", error);
                    setAviso(
                        {
                            ativo: true,
                            mensagem: "Erro ao fazer login. Verifique suas credenciais.",
                            titulo: "Erro"
                        }
                    )
                });
        }
    }

    function verificarSenha(senha) {
        const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return re.test(senha);
    }

    function verificarEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    return (
        <div className="flex flex-col h-screen min-h-[768px]">
            <header className="relative justify-between items-center bg-primary flex w-full gap-[40px_100px] flex-wrap p-8 max-md:max-w-full max-md:px-5">
                <Link to="/">
                    <img src="/assets/images/logo-h-whitebg.svg" alt="Logo" className="aspect-[4.59] object-contain w-[202px] self-stretch shrink-0 my-auto"/>
                </Link>
                <div className="self-stretch flex items-center gap-4 my-auto">
                    <div className="hidden xl:block text-tertiary text-[19px] font-semibold self-stretch my-auto font-lexend text-base">Não tem uma conta?</div>
                    <Link to="/registro" className="self-stretch bg-secondary hover:bg-tertiary gap-2.5 text-tertiary hover:text-secondary font-heebo text-base font-bold my-auto px-5 py-2.5">SIGN
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
            <main className="relative flex flex-col items-center flex-1 overflow-hidden">
                <img src="/assets/images/hero.jpg" alt="Background" className="absolute h-full w-full object-cover inset-0"/>
                <div className="absolute inset-0 bg-[rgba(34,44,45,0.8)]"></div>
                <div className="absolute inset-0 "></div>
                <div className="relative z-10 self-center w-[408px] max-w-full mt-[88px] px-12 py-8 bg-tertiary rounded-xl shadow-[0px_6px_16px_rgba(0,0,0,0.08),…] max-md:mt-10 max-md:px-5">
                    <div className="w-full">
                        <h2 className="w-full text-2xl text-primary font-semibold text-center">Bem-vindo de volta!</h2>
                        <div className="w-full mt-4">
                            <img src="/assets/icons/divider-horizontal.svg" alt="Divider" className="aspect-[333.33] object-contain w-full stroke-[1px] stroke-[rgba(0,0,0,0.06)]"/>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex w-full flex-col items-stretch mt-6 font-normal">
                            <div className="flex items-center min-h-8 gap-1 text-sm leading-loose h-8">
                                <label htmlFor="email" className="text-primary self-stretch my-auto text-right">E-mail de acesso</label>
                                <span className="text-primary self-stretch my-auto">:</span>
                            </div>
                            <div className="flex items-center w-full gap-2.5 bg-white overflow-hidden text-base text-black whitespace-nowrap rounded-lg border border-gray-200">
                                <div className="flex items-center flex-1 gap-2.5 px-3 py-2">
                                    <img src="/assets/icons/email.svg" alt="Email icon" className="w-4 aspect-[1] object-contain shrink-0"/>
                                    <input onChange={(event) => setLogin((prev) => ({...prev, email: event.target.value}))}
                                           value={login.email} type="email" id="email" name="email"
                                           placeholder="Digite seu email de acesso"
                                           className="flex-1 bg-transparent outline-none text-ellipsis"/>
                                </div>
                            </div>
                            {!verificarEmail(login.email) && <span id="emailError" className="text-red-500 text-sm mt-1">Insira um email válido</span>}
                        </div>
                        <div className="flex w-full flex-col items-stretch mt-6 whitespace-nowrap font-normal">
                            <div className="flex items-center min-h-8 gap-1 text-sm leading-loose h-8">
                                <label htmlFor="password"
                                       className="text-prionChange={(event) => setLogin((prev) => ({ ...prev, email: event.target.value }))}mary self-stretch my-auto text-right"> Senha </label>
                                <span className="text-primary self-stretch my-auto">:</span>
                            </div>
                            <div className="flex items-center w-full gap-2.5 bg-white overflow-hidden text-base text-black rounded-lg border border-gray-200">
                                <div className="flex items-center flex-1 gap-2.5 px-3 py-2">
                                    <img src="/assets/icons/password.svg" alt="Password icon" className="w-4 aspect-[1] object-contain shrink-0"/>
                                    <input onChange={(event) => setLogin((prev) => ({...prev, password: event.target.value}))}
                                           type={mostrarSenha ? "text" : "password"}
                                           id="password"
                                           name="password"
                                           placeholder="Insira sua senha"
                                           className="flex-1 bg-transparent outline-none text-ellipsis"/>
                                    <button onClick={() => setMostrarSenha((prev) => !prev)}
                                            type="button"
                                            id="togglePassword"
                                            className="focus:outline-none">
                                        <img src="/assets/icons/show-password.svg" alt="Alternar visibilidade da senha" className="w-4 aspect-[1] object-contain shrink-0"/>
                                    </button>
                                </div>
                            </div>
                            {!verificarSenha(login.password) && <span id="passwordError" className="text-red-500 text-sm mt-1">Insira sua Senha</span>}
                        </div>
                        <div className="w-full mt-6">
                            <button type="submit" id="botao-cadastrar"
                                    className="flex w-full h-10 items-center justify-center bg-secondary shadow-[0px_2px_0px_0px_rgba(5,145,255,0.10)] text-base text-white font-normal whitespace-nowrap rounded-lg">Entrar
                            </button>

                            <div className="w-full mt-4">
                                <img src="/assets/icons/divider-horizontal.svg" alt="Divider" className="aspect-[333.33] object-contain w-full stroke-[1px] stroke-[rgba(0,0,0,0.06)]"/>
                            </div>

                            <div className="flex w-full items-center gap-1 justify-center mt-4 text-base font-normal">
                                <div className="flex items-center self-stretch min-h-10 text-primary">Ainda não tem conta?</div>
                                <Link to="/register" className="px-2 whitespace-nowrap text-secondary font-bold"> Cadastre-se </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <footer className="bg-primary text-tertiary py-4 text-center text-sm">
                <div className="container mx-auto">&copy; 2025 HorseHouse. Todos os direitos reservados.</div>
            </footer>
        </div>);
}
