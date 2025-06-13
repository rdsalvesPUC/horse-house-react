import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EditProfile from "../components/EditProfile.jsx";
import ListHaras from "../components/ListHaras.jsx";
import * as sea from "node:sea";
import {useUser} from "../contexts/UserData.jsx";
import {chooseHaras} from "../contexts/ChooseHaras.jsx";

export default function Haras() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [harasList, setHarasList] = useState([])
    const [haras, setHaras] = chooseHaras();
    const [userData, updateUser, logout] = useUser();

    useEffect(() => {
        updateHaras();
    }, [])

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
            <Sidebar selected="haras" userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar logout={logout} disableSelect={true} search={search} onSearch={(value) => setSearch(value)}
                        harasList={harasList} userData={userData} choseHaras={(harasID) => setHaras(harasID)}
                        updateUser={updateUser}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <ListHaras search={search} updateHaras={updateHaras} harasList={harasList}/>
                </main>
            </div>
        </div>
    )
}
