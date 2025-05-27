export default function Hero() {
    return (
        <section className="hero">
            <div className="w-full relative min-h-[919px] bg-[#222C2D] text-tertiary">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e53b7b59e1e4ea477621659e50c0a39adcf7c80?placeholderIfAbsent=true" className="absolute h-full w-full object-cover inset-0"
                     alt="Hero background"/>
                <div className="max-w-[1440px] mx-auto px-5 lg:px-16 xl:px-20 pt-[164px] pb-[353px] relative z-10 max-md:py-[100px]">
                    <div className="flex w-full items-stretch gap-5 flex-wrap justify-between max-md:max-w-full">
                        <div className="flex flex-col items-stretch max-md:max-w-full">
                            <h2 className="font-lexend text-secondary text-[19px] font-semibold leading-relaxed max-md:max-w-full">Bem-vindo ao Horse House</h2>
                            <h1 className="font-lexend text-7xl font-bold mt-8 leading-tight w-4/5 xl:w-1/2 max-md:max-w-full max-md:text-[40px]">O único sistema que seu haras vai precisar.</h1>
                            <button className="bg-secondary gap-2.5 font-heebo text-base font-bold mt-8 px-5 py-2.5 hover:bg-tertiary hover:text-secondary transition-colors w-fit">Get Start</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}