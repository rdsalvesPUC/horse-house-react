import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Select from "./Select.jsx";

export default function Topbar({harasList, choseHaras, userData, disableSelect, disableSearch, search, onSearch, haras}) {
    const [dropdown, setDropdown] = useState(false)
    const navigate = useNavigate();

    return (
        <header>
            <div className={`h-16 border-b border-gray-200 bg-white flex items-center ${disableSelect && disableSearch ? "justify-end" : "justify-between"} px-6`}>
                {/* Lado esquerdo: Logo + Select de Haras */}
                {(userData.cargo === "Proprietário" && !disableSelect) &&
                    <div className="flex items-center space-x-6">
                        {/* Dropdown estático de Haras */}
                        <div id="container-haras" className="relative">
                            <Select nome="Haras"
                                    onchange={valor => choseHaras(valor)}
                                    variant="topbar"
                                    options={harasList.map(h => ({value: h.ID, label: h.Nome}))}
                                    valor={haras}
                                    placeHolder="Selecione um Haras"
                                    />
                            {/* setinha à direita */}
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        {/* Aqui você coloca um ícone de chevron-down */}
                                ▼
                    </span>
                        </div>
                    </div>}
                {(disableSelect && !disableSearch) &&(
                    <div className="w-[200px] py-2 pl-3 pr-8"></div>)}


                {/* Central: Campo de busca */}
                {!disableSearch &&
                    <div className="flex-1 max-w-md px-6">
                        <div className="relative">
                            {/* ícone de search */}
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"> 🔍 </span>
                            <input value={search} onChange={(event) => onSearch(event.target.value)} type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 border border-secondary/50 rounded-md focus:outline-none"/>
                        </div>
                    </div>}

                {/* Lado direito: Notificações + Avatar + Dropdown */}
                <div className="flex items-center space-x-4">
                    {/* Sino de notificações */}
                    <button className="relative p-2 rounded-full hover:bg-gray-100">
                        🔔
                        {/* bolinha vermelha de não-lido */}
                        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    </button>
                    <div className="relative">
                        {/* já existe o botão que abre o menu, mantenha-o */}
                        <button onClick={() => setDropdown((prev) => !prev)} id="userMenuBtn" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100">
                            {/* Avatar, nome e seta tal como antes */}
                            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                                <img src={userData.foto || "/assets/images/user.png"} id="foto" alt="Avatar" className="h-full w-full rounded-full object-cover"/>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span id="nome" className="text-sm font-medium text-gray-800">{userData.nome} {userData.sobrenome}</span>
                                <span id="cargo" className="text-xs text-gray-500">{userData.cargo}</span>
                            </div>
                            <span className="text-gray-400">⌄</span>
                        </button>
                        {dropdown &&
                            <div id="userMenu" className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                                {/* Label */}
                                <div className="px-4 py-2 text-sm font-semibold text-gray-700">Minha Conta</div>
                                <div className="border-t border-gray-100"></div>

                                {/* Item: Perfil */}
                                <Link to="/user-profile" data-view="user-profile" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                                    {/* substitua por SVG do ícone User */}
                                    <span className="mr-2">👤</span>
                                    Perfil
                                </Link>

                                {/* Item: Configurações */}
                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                                    {/* substitua por SVG do ícone Settings */}
                                    <span className="mr-2">⚙️</span>
                                    Configurações
                                </a>

                                <div className="border-t border-gray-100"></div>

                                {/* Item: Sair */}
                                <a onClick={() => {
                                    localStorage.removeItem("token")
                                    navigate("/")
                                }} id="logout" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-b-md">
                                    {/* substitua por SVG do ícone LogOut */}
                                    <span className="mr-2">🚪</span>
                                    Sair
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}
