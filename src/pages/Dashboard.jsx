import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    let userType = localStorage.getItem('userType');
    if (userType === "proprietario") {
        userType = "Proprietário";
    }
    const nome = localStorage.getItem('nome');
    const sobrenome = localStorage.getItem('sobrenome');
    const foto = localStorage.getItem('foto');
    const navigate = useNavigate();
    const [harasList, setHarasList] = useState("")
    const [haras, setHaras] = useState()
    const [userData, setUserData] = useState(
        {
            nome: nome,
            sobrenome: sobrenome,
            cargo: userType,
            foto: foto
        }
    )
    useEffect(() => {
        const TOKEN = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/loginExpirado`, {
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
        }).then((data) => {
                updateUser();
            }
        ).catch((error) => {
            navigate("/login")
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
            const foto = data.Foto ? "http://localhost:3000" + data.Foto : null;
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
                setHarasList(data)
            }
        ).catch((error) => {
            //navigate("/login")
            console.error("Erro:", error);
        })
    }

    return (
        <div className="flex h-screen">
            <Sidebar userType = {userData.cargo} />
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar harasList={harasList} userData={userData} choseHaras={(harasID) => setHaras(harasID)} />
                <main id="views" className="flex-1 overflow-auto bg-tertiary">

                </main>
            </div>
        </div>
    )
}
