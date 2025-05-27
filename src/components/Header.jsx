import {Link} from "react-router-dom";

export default function Header() {
    return(
        <>
            <header className="bg-primary text-tertiary">
                <div className="max-w-[1440px] mx-auto flex justify-between gap-10 items-center text-base whitespace-nowrap px-1 py-8 lg:px-16 xl:px-8">
                    <Link to="/">
                        <img src="/assets/images/logo-h-whitebg.svg" alt="Horse House Logo" className="aspect-[4.59] object-contain w-[250px] md:w-[350px] lg:w-[390px] self-stretch my-auto"/>
                    </Link>
                    <button id="burgerBtn" aria-label="Abrir menu" aria-expanded="false" aria-controls="drawer"
                            className="xl:hidden h-10 w-10 flex items-center justify-center bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </button>
                    <nav className="hidden xl:flex justify-between text-tertiary flex-wrap my-auto max-md:max-w-full gap-8 font-heebo text-base font-bold">
                        <Link to="/" className="link-nav">HOME</Link>
                        <Link to="/sobre" className="link-nav">SOBRE</Link>
                        <Link to="/servicos" className="link-nav">SERVIÇOS</Link>
                        <Link to="/precos" className="link-nav">PREÇOS</Link>
                        <Link to="/blog" className="link-nav">BLOG</Link>
                        <Link to="/contato" className="link-nav">CONTATO</Link>
                    </nav>
                    <div className="hidden xl:flex items-center gap-4">
                        <Link to="/login" className="flex items-center gap-2.5 text-secondary justify-center px-5 py-2.5 hover:text-tertiary transition-colors font-heebo text-base font-bold">
                            <span>LOGAR</span>
                            <svg width="20" height="21" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                 className="w-5 stroke-[2px] stroke-current transition-colors">
                                <rect x="19" y="1.5" width="18" height="18" rx="9" transform="rotate(90 19 1.5)"/>
                                <path d="M13.4765 11.3333H3.33317V9.66667H13.4765L9.0065 5.19667L10.1848 4.01833L16.6665 10.5L10.1848 16.9817L9.0065 15.8033L13.4765 11.3333Z" stroke="none"
                                      fill="currentColor"/>
                            </svg>
                        </Link>
                        <Link to="/registro" className="btn-primary">CADASTRAR</Link>
                    </div>
                </div>
            </header>
            <div id="drawer" className="fixed inset-0 z-50 hidden">
                <div id="backdrop" className="absolute inset-0 bg-black/60 opacity-0 transition-opacity"></div>

                <aside id="panel" className="absolute top-0 left-0 h-full w-64 -translate-x-full bg-primary p-6 flex flex-col gap-8 transition-transform">
                    <div className="flex items-center justify-between">
                        <span className="font-heebo text-lg font-semibold text-tertiary">Menu</span>
                        <button id="closeBtn" className="h-8 w-8 bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary transition-colors font-bold">×</button>
                    </div>

                    <nav className="flex flex-col gap-4 text-base font-bold">
                        <Link to="/" className="link-drawer">HOME</Link>
                        <Link to="/sobre" className="link-drawer">SOBRE</Link>
                        <Link to="/precos" className="link-drawer">PREÇOS</Link>
                        <Link to="/servicos" className="link-drawer">SERVIÇOS</Link>
                        <Link to="/blog" className="link-drawer">BLOG</Link>
                        <Link to="/contato" className="link-drawer">CONTATO</Link>
                    </nav>

                    <div className="mt-auto flex flex-col gap-4">
                        <Link to="/login" className="flex items-center gap-2.5 text-secondary justify-center px-5 py-2.5 hover:text-tertiary transition-colors font-heebo text-base font-bold">
                            <span>LOGAR</span>
                            <svg width="20" height="21" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                 className="w-5 stroke-[2px] stroke-current transition-colors">
                                <rect x="19" y="1.5" width="18" height="18" rx="9" transform="rotate(90 19 1.5)"/>
                                <path d="M13.4765 11.3333H3.33317V9.66667H13.4765L9.0065 5.19667L10.1848 4.01833L16.6665 10.5L10.1848 16.9817L9.0065 15.8033L13.4765 11.3333Z" stroke="none"
                                      fill="currentColor"/>
                            </svg>
                        </Link>
                        <Link to="/register" className="btn-primary w-full text-center">CADASTRAR</Link>
                    </div>
                </aside>
            </div>
        </>
    )
}