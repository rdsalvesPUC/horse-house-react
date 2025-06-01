import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EditProfile from "../components/EditProfile.jsx";
import ListHaras from "../components/ListHaras.jsx";
import * as sea from "node:sea";
import ListUsuarios from "../components/ListUsuarios.jsx";

export default function Usuarios() {
    let userType = localStorage.getItem('userType');
    if (userType === "proprietario") {
        userType = "Proprietário";
    }
    const nome = localStorage.getItem('nome');
    const sobrenome = localStorage.getItem('sobrenome');
    const foto = localStorage.getItem('foto');
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [harasList, setHarasList] = useState([])
    const [haras, setHaras] = useState("")
    const [userData, setUserData] = useState(
        {
            nome: nome,
            sobrenome: sobrenome,
            cargo: userType,
            foto: foto,
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
                const foto = data.Foto ? "http://localhost:3000" + data.Foto : null;
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
                    foto: foto,
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
            <Sidebar selected="usuarios" userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar search={search} onSearch={(value) => setSearch(value)} harasList={harasList} userData={userData} choseHaras={(harasID) => setHaras(harasID)}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <ListUsuarios search = {search} updateHaras = {updateHaras} haras = {haras} harasList = {harasList} />
                </main>
            </div>
        </div>
    )
}
