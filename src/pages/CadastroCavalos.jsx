import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../contexts/UserData.jsx";
import CadastrarCavalos from "../components/CadastrarCavalos.jsx";
import {chooseHaras} from "../contexts/ChooseHaras.jsx";

export default function CadastroCavalos() {
    const navigate = useNavigate();
    const [harasList, setHarasList] = useState([])
    const [haras, setHaras] = chooseHaras();
    const [userData, updateUser, logout] = useUser();
    useEffect(() => {
        updateHaras();
    }, []);
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
            console.error("Erro:", error);
        })
    }

    return (
        <div className="flex h-screen">
            <Sidebar selected="cavalos" userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar disableSearch={true} harasList={harasList} userData={userData}
                        choseHaras={(harasID) => setHaras(harasID)} haras = {haras} updateUser={updateUser}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <CadastrarCavalos haras={haras} userType={userData.cargo}/>
                </main>
            </div>
        </div>
    )
}
