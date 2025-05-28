import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EditProfile from "../components/EditProfile.jsx";
import ListHaras from "../components/ListHaras.jsx";

export default function Haras() {
    const navigate = useNavigate();
    const [harasList, setHarasList] = useState([])
    const [haras, setHaras] = useState([])
    const [userData, setUserData] = useState(
        {
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
            complemento: ""
        }
    )

    useEffect(() => {
        const TOKEN = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/requerProprietario`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.login) {
                localStorage.removeItem('token');
                navigate("/login")
            }
            else if (data.error) {
                navigate("/dashboard")
                throw new Error("Erro ao verificar token");
            }
                updateUser();
            }
        ).catch((error) => {
            console.error("Erro:", error);
        })
    }, []);
    function updateUser() {
        const TOKEN = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/getUsuarioLogado`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao verificar token");
            }
        }).then(async (data) => {
                let cargo;
                if (data.userType === "proprietario") {
                    cargo = "Proprietário"
                    await updateHaras();
                }
                if (data.userType === "gerente") {
                    cargo = "Gerente"
                }
                if (data.userType === "treinador") {
                    cargo = "Treinador"
                }
                if (data.userType === "veterinario") {
                    cargo = "Veterinário"
                }
                if (data.userType === "tratador") {
                    cargo = "Tratador"
                }
                setUserData({
                    foto: data.Foto,
                    nome: data.Nome,
                    sobrenome: data.Sobrenome,
                    email: data.Email,
                    telefone: data.Telefone,
                    cpf: data.CPF,
                    dataNascimento: data.Data_Nascimento,
                    cep: data.CEP,
                    estado: data.Estado,
                    cidade: data.Cidade,
                    bairro: data.Bairro,
                    logradouro: data.Rua,
                    numero: data.Numero,
                    complemento: data.Complemento,
                    cargo: cargo
                })
            }
        ).catch((error) => {
            navigate("/login")
            console.error("Erro:", error);
        })
    }

    async function updateHaras() {
        const TOKEN = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/getAllHaras`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao verificar token");
            }
        }).then(async (data) => {
                setHarasList(await data)
            }
        ).catch((error) => {
            navigate("/login")
            console.error("Erro:", error);
        })
    }
    return (
        <div className="flex h-screen">
            <Sidebar userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar harasList={harasList} userData={userData} choseHaras={(harasID) => setHaras(harasID)}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <ListHaras harasList = {harasList} />
                </main>
            </div>
        </div>
    )
}
