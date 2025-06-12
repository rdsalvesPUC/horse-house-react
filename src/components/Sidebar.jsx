import {Link} from "react-router-dom";
import {ToggleSidebar} from "../contexts/ToggleSidebar.jsx";

export default function Sidebar({userType, selected}) {
    const [isOpen, toggleSidebar] = ToggleSidebar()
    return (
        <aside className={`${isOpen ? "w-[250px]" : "w-[80px]"} transition-all duration-300`} id="sidebar">
            <div className="bg-primary h-screen flex flex-col relative">
                {/* Logo/Título */}
                <div className="h-16 py-4 px-6 flex items-center">
                    <Link to="">
                        {isOpen ? <img src="/assets/images/logo-h-whitebg.svg" alt="Horse House Logo"
                                       className="object-contain md:w-[150px] lg:w-[180px]"/>
                            : <img src="/assets/images/brasao-secondary.svg" alt="Horse House Brasão"
                                   className="object-contain h-[39.8px]"/>}
                    </Link>
                </div>

                {/* Navegação */}
                <div className="py-4 px-4 flex-1 overflow-auto">
                    <nav className="flex flex-col space-y-1">
                        <Link to="/dashboard" data-view="visao-geral"
                              className={`flex items-center py-3 px-3 rounded-md ${selected === "dashboard" ? "bg-[#2D3A3B] text-secondary " : "text-tertiary"} hover:bg-[#2D3A3B] hover:text-secondary transition-colors duration-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className={`lucide lucide-house h-5 w-5 ${isOpen && "mr-3"}`}>
                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                <path
                                    d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            </svg>
                            {isOpen && <span className="font-heebo text-base font-medium">Dashboard</span>}
                            {(selected === "dashboard" && isOpen) &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="lucide lucide-chevron-right ml-auto h-4 w-4 text-secondary">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>}
                            <div id="tooltip-visao-geral"
                                 className="absolute left-15 w-max bg-white border border-gray-200 rounded-md shadow-lg px-3 py-1 text-sm font-semibold text-gray-700 transition-all duration-200 hidden">Dashboard
                            </div>
                        </Link>

                        {userType === "Proprietário" && (
                            <Link to="/haras" data-view="haras"
                                  className={`flex items-center py-3 px-3 rounded-md ${selected === "haras" ? "bg-[#2D3A3B] text-secondary" : "text-tertiary"} hover:bg-[#2D3A3B] hover:text-secondary transition-colors duration-200`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className={`lucide lucide-building2 h-5 w-5 ${isOpen && "mr-3"}`}>
                                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                                    <path d="M10 6h4"></path>
                                    <path d="M10 10h4"></path>
                                    <path d="M10 14h4"></path>
                                    <path d="M10 18h4"></path>
                                </svg>
                                {isOpen && <span className="font-heebo text-base font-medium">Haras</span>}
                                {(selected === "haras" && isOpen) &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-chevron-right ml-auto h-4 w-4 text-secondary">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>}
                                <div id="tooltip-haras"
                                     className="absolute left-15 w-max bg-white border border-gray-200 rounded-md shadow-lg px-3 py-1 text-sm font-semibold text-gray-700 transition-all duration-200 hidden">Haras
                                </div>
                            </Link>)}

                        {(userType === "Proprietário" || userType === "Gerente") &&(<Link to="/usuarios" data-view="usuarios"
                               className={`flex items-center py-3 px-3 rounded-md ${selected === "usuarios" ? "bg-[#2D3A3B] text-secondary" : "text-tertiary"} hover:bg-[#2D3A3B] hover:text-secondary transition-colors duration-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className={`lucide lucide-users h-5 w-5 ${isOpen && "mr-3"}`}>
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            {isOpen && <span className="font-heebo text-base font-medium">Usuários</span>}
                            {(selected === "usuarios" && isOpen) &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="lucide lucide-chevron-right ml-auto h-4 w-4 text-secondary">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>}
                            <div id="tooltip-usuarios"
                                 className="absolute left-15 w-max bg-white border border-gray-200 rounded-md shadow-lg px-3 py-1 text-sm font-semibold text-gray-700 transition-all duration-200 hidden">Usuários
                            </div>
                        </Link>)}
                        <Link to="/cavalos" data-view="cavalos"
                              className={`flex items-center py-3 px-3 rounded-md ${selected === "cavalos" ? "bg-[#2D3A3B] text-secondary" : "text-tertiary"} hover:bg-[#2D3A3B] hover:text-secondary transition-colors duration-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"
                                 fill="currentColor" className={`h-5 w-5 ${isOpen && "mr-3"}`}>
                                <path
                                    d="M226.6 48L117.3 48l17.1 12.8c6 4.5 9.6 11.6 9.6 19.2s-3.6 14.7-9.6 19.2l-6.5 4.9c-10 7.5-16 19.3-16 31.9l-.3 91c0 10.2 4.9 19.9 13.2 25.8l1.9 1.3c9.9 7.1 23.3 7 33.2-.1l49.9-36.3c10.7-7.8 25.7-5.4 33.5 5.3s5.4 25.7-5.3 33.5l-49.9 36.3-53.8 39.1c-7.3 5.3-13 12.2-16.9 20.1l-50.7 0c5.3-22.1 17.8-41.9 35.9-56.3c-1.3-.8-2.6-1.7-3.8-2.6L97 291.8c-21-15-33.4-39.2-33.3-65l.3-91c.1-19.8 6.7-38.7 18.6-53.9l-.4-.3C70.7 73 64 59.6 64 45.3C64 20.3 84.3 0 109.3 0L226.6 0C331.2 0 416 84.8 416 189.4c0 11.1-1 22.2-2.9 33.2L390.1 352l-48.8 0 24.5-137.8c1.5-8.2 2.2-16.5 2.2-24.8C368 111.3 304.7 48 226.6 48zM85.2 432L68.7 464l310.7 0-16.6-32L85.2 432zm315.7-30.7l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8L56.8 512C34.2 512 16 493.8 16 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C52.5 390.7 63.5 384 75.5 384l297 0c12 0 22.9 6.7 28.4 17.3zM172 128a20 20 0 1 1 0 40 20 20 0 1 1 0-40z"/>
                            </svg>
                            {isOpen && <span className="font-heebo text-base font-medium">Cavalos</span>}
                            {(selected === "cavalos" && isOpen) &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="lucide lucide-chevron-right ml-auto h-4 w-4 text-secondary">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>}
                            <div id="tooltip-cavalos"
                                 className="absolute left-15 w-max bg-white border border-gray-200 rounded-md shadow-lg px-3 py-1 text-sm font-semibold text-gray-700 transition-all duration-200 hidden">Cavalos
                            </div>
                        </Link>
                    </nav>
                </div>

                {/* Botão de colapso/expansão */}
                <button onClick={toggleSidebar} id="toggleSidebar"
                        className="absolute -right-3 top-13 bg-tertiary rounded-full p-1 border border-secondary shadow-md hover:bg-secondary transition-colors"
                        aria-label="Colapsar/Expandir sidebar">
                    {isOpen ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-chevron-left">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>}
                </button>
            </div>
        </aside>
    )
}
