import {Link} from "react-router-dom";

export default function Sidebar({userType, selected = "dashboard"}) {
    return (
        <aside id="sidebar">
            {/* components/sidebar.html */}
            <div className="bg-primary h-screen w-full flex flex-col relative">
                {/* Logo/Título */}
                <div className="h-16 p-2 flex items-center justify-center">
                    <Link to="/">
                        <img src="/assets/images/logo-h-whitebg.svg" alt="Horse House Logo" className="object-contain md:w-[150px] lg:w-[180px]"/>
                    </Link>
                </div>

                {/* Navegação */}
                <div className="py-4 px-2 flex-1 overflow-auto">
                    <nav className="flex flex-col space-y-1">
                        <Link to="/dashboard" data-view="visao-geral" className={`flex items-center py-3 px-3 rounded-md ${selected === "dashboard" ? "bg-secondary/10 text-secondary" : "text-tertiary"} hover:bg-secondary/10 hover:text-secondary transition-colors duration-200`}>
                            <svg className="h-5 w-5 mr-3 fill-current text-secondary" viewBox="0 0 24 24">{/* … */}</svg>
                            <span className="text-tertiary">Dashboard</span>
                            <svg className="ml-auto h-4 w-4 fill-current text-secondary" viewBox="0 0 24 24">{/* ChevronRight */}</svg>
                        </Link>

                        {userType === "Proprietário" && (
                            <Link to="/haras" data-view="haras"
                                  className={`flex items-center py-3 px-3 rounded-md ${selected === "haras" ? "bg-secondary/10 text-secondary" : "text-tertiary"} hover:bg-secondary/10 hover:text-secondary transition-colors duration-200`}>
                                <svg className="h-5 w-5 mr-3 fill-current text-secondary" viewBox="0 0 24 24">{/* … */}</svg>
                                <span className="text-tertiary">Haras</span>
                                <svg className="ml-auto h-4 w-4 fill-current text-secondary" viewBox="0 0 24 24">{/* ChevronRight */}</svg>
                            </Link>)}

                        <Link to="/usuarios" data-view="usuarios"
                              className={`flex items-center py-3 px-3 rounded-md ${selected === "usuarios" ? "bg-secondary/10 text-secondary" : "text-tertiary"} hover:bg-secondary/10 hover:text-secondary transition-colors duration-200`}>
                            <svg className="h-5 w-5 mr-3 fill-current text-tertiary" viewBox="0 0 24 24">{/* Users */}</svg>
                            <span>Usuários</span>
                        </Link>

                        <Link to="/dashboard/cavalos" data-view="cavalos"
                              className="flex items-center py-3 px-3 rounded-md text-tertiary hover:bg-secondary/10 hover:text-secondary transition-colors duration-200">
                            <svg className="h-5 w-5 mr-3 fill-current text-tertiary" viewBox="0 0 24 24">{/* Cavalos */}</svg>
                            <span>Cavalos</span>
                        </Link>

                        <Link to="/dashboard/plano-treino" data-view="plano-treino"
                              className="flex items-center py-3 px-3 rounded-md text-tertiary hover:bg-secondary/10 hover:text-secondary transition-colors duration-200">
                            <svg className="h-5 w-5 mr-3 fill-current text-tertiary" viewBox="0 0 24 24">{/* Treino */}</svg>
                            <span>Plano de Treino</span>
                        </Link>

                        <Link to="/dashboard/plano-alimentacao" data-view="plano-alimentacao"
                              className="flex items-center py-3 px-3 rounded-md text-tertiary hover:bg-secondary/10 hover:text-secondary transition-colors duration-200">
                            <svg className="h-5 w-5 mr-3 fill-current text-tertiary" viewBox="0 0 24 24">{/* Alimentação */}</svg>
                            <span>Plano de Alimentação</span>
                        </Link>

                        <Link to="/dashboard/plano-veterinario" data-view="plano-veterinario"
                              className="flex items-center py-3 px-3 rounded-md text-tertiary hover:bg-secondary/10 hover:text-secondary transition-colors duration-200">
                            <svg className="h-5 w-5 mr-3 fill-current text-tertiary" viewBox="0 0 24 24">{/* Veterinário */}</svg>
                            <span>Plano Veterinário</span>
                        </Link>
                    </nav>
                </div>

                {/* Botão de colapso/expansão */}
                <button id="toggleSidebar" className="absolute -right-3 top-20 bg-tertiary rounded-full p-1 border border-secondary shadow-md hover:bg-secondary/10 transition-colors"
                        aria-label="Colapsar/Expandir sidebar">
                    <svg className="h-4 w-4 fill-current text-primary" viewBox="0 0 24 24">{/* ChevronLeft/Right */}</svg>
                </button>
            </div>
        </aside>
    )
}
