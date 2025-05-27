import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="w-full bg-primary">
            <div className="max-w-[1440px] mx-auto flex flex-col pt-16 pb-[38px] px-5 lg:px-16 xl:px-20">
                <div className="flex max-w-full gap-[40px_91px] justify-between flex-wrap">
                    <div className="flex min-w-60 flex-col text-base font-normal w-[398px]">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1fc26d4b0a0f609f7e836694e33f1c00f90b7fa7?placeholderIfAbsent=true"
                            className="aspect-[4.61] object-contain w-[300px] max-w-full"
                            alt="Horse House Logo"
                        />
                        <p className="text-tertiary leading-[25px] self-stretch mt-14 max-md:mt-10">
                            O Horse House é um sistema completo de gestão para haras,
                            desenvolvido para facilitar sua administração e otimizar processos.
                            Com recursos avançados de organização, controle financeiro e
                            monitoramento de cavalos, oferecemos uma solução confiável e
                            eficiente para impulsionar o seu negócio. Simplifique sua operação e
                            leve seu haras para o próximo nível!
                        </p>
                        <div className="w-[271px] max-w-full text-tertiary leading-loose mt-14 max-md:mt-10">
                            <div className="flex gap-2.5">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/88a913abca902fc4f988078e42ed6c27f9e63662?placeholderIfAbsent=true"
                                    className="aspect-[1] object-contain w-5 shrink-0"
                                    alt="Location icon"
                                />
                                <address className="w-[241px] not-italic">
                                    99 Roving St., Big City, PKU 23456
                                </address>
                            </div>
                            <div className="flex gap-2.5 whitespace-nowrap mt-[11px]">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/14b00ef726f6feb93fa217cf616cf7949341f503?placeholderIfAbsent=true"
                                    className="aspect-[1] object-contain w-5 shrink-0"
                                    alt="Phone icon"
                                />
                                <a href="tel:+123456789" className="w-[241px]">
                                    +123-456-789
                                </a>
                            </div>
                            <div className="flex gap-2.5 whitespace-nowrap mt-[11px]">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fcecbaf5cd2e0161a3aa92311ccafbfb12e6acb?placeholderIfAbsent=true"
                                    className="aspect-[1] object-contain w-5 shrink-0"
                                    alt="Email icon"
                                />
                                <a href="mailto:hello@awesomesite.com" className="w-[241px]">
                                    hello@awesomesite.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <nav className="text-tertiary whitespace-nowrap w-[138px]">
                        <h3 className="text-2xl font-semibold">Navegação</h3>
                        <ul className="flex w-[97px] flex-col text-base font-normal leading-loose ml-[11px] mt-[30px] max-md:ml-2.5">
                            <li className="flex min-h-[25px] items-center gap-[11px]">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec6385d85116ba8b323032828ed6e87b91e61779?placeholderIfAbsent=true"
                                    className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                                    alt="Arrow icon"
                                />
                                <Link
                                    to="/"
                                    className="self-stretch my-auto hover:text-secondary transition-colors"
                                >
                                Home
                            </Link>
                        </li>
                        <li className="flex min-h-[25px] items-center gap-[11px] mt-[29px]">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec6385d85116ba8b323032828ed6e87b91e61779?placeholderIfAbsent=true"
                                className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                                alt="Arrow icon"
                            />
                            <Link
                                to="/sobre"
                                className="self-stretch my-auto hover:text-secondary transition-colors"
                            >
                            Sobre
                        </Link>
                    </li>
                    <li className="flex min-h-[25px] items-center gap-[11px] mt-[29px]">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec6385d85116ba8b323032828ed6e87b91e61779?placeholderIfAbsent=true"
                            className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                            alt="Arrow icon"
                        />
                        <Link
                            to="/precos"
                            className="self-stretch my-auto hover:text-secondary transition-colors"
                        >
                        Preços
                    </Link>
                </li>
                <li className="self-stretch flex min-h-[25px] w-full items-center gap-[11px] mt-[29px]">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec6385d85116ba8b323032828ed6e87b91e61779?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                        alt="Arrow icon"
                    />
                    <Link
                        to="/servicos"
                        className="self-stretch my-auto hover:text-secondary transition-colors"
                    >
                    Serviços
                </Link>
            </li>
            <li className="flex min-h-[25px] items-center gap-[11px] mt-[29px]">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec6385d85116ba8b323032828ed6e87b91e61779?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                    alt="Arrow icon"
                />
                <Link
                    to="/blog"
                    className="self-stretch my-auto hover:text-secondary transition-colors"
                >
                Blog
            </Link>
        </li>
    <li className="flex min-h-[25px] items-center gap-[11px] mt-[29px]">
        <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec6385d85116ba8b323032828ed6e87b91e61779?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
            alt="Arrow icon"
        />
        <Link
            to="/contato"
            className="self-stretch my-auto hover:text-secondary transition-colors"
        >
        Contato
    </Link>
</li>
</ul>
</nav>

    <div className="flex flex-col text-tertiary w-[201px]">
        <h3 className="text-2xl font-semibold">Links Úteis</h3>
        <ul className="w-full text-base font-normal leading-loose ml-[11px] mt-[30px] max-md:ml-2.5">
            <li className="flex w-full items-center gap-[11px]">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/54cd9785359d0a8799132590cd7e92a7246c1087?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                    alt="Link icon"
                />
                <Link
                    to="/privacidade"
                    className="self-stretch my-auto hover:text-secondary transition-colors"
                >
                Política de Privacidade
            </Link>
        </li>
        <li className="flex w-full items-center gap-[11px] mt-[29px]">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/54cd9785359d0a8799132590cd7e92a7246c1087?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                alt="Link icon"
            />
            <Link
                to="/termos"
                className="self-stretch my-auto hover:text-secondary transition-colors"
            >
            Termos e Condições
        </Link>
    </li>
</ul>
</div>

    <div className="flex min-w-60 flex-col items-stretch w-[393px]">
        <div className="text-2xl text-tertiary font-semibold">
            <h3>Nossas Redes Sociais</h3>
            <div className="flex gap-4 mt-[17px]">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb821268856f12774ad3503dbc71f7eda1020a03?placeholderIfAbsent=true"
                        className="aspect-[6.99] object-contain w-[210px] max-w-full"
                        alt="Social media icons"
                    />
                </a>
            </div>
        </div>
    </div>
</div>

    <div className="max-w-full w-[1411px] text-base text-tertiary font-normal text-center leading-loose mt-16 max-md:mt-10">
        <hr className="border bg-white min-h-0 w-full border-white border-solid max-md:max-w-full"/>
        <p className="mt-8 max-md:max-w-full">
            Copyright 2025 © All Right Reserved Design by Studio Bewder
        </p>
    </div>
</div>
</footer>

)
}