import Botao from "./Botao.jsx";

export default function ModalCadastro({children, titulo, subtitulo, handleSubmit, link}) {
    return (
        <div className="container max-w-4xl mx-auto py-6 px-6 space-y-6">
            <div className="flex flex-row flex-1 justify-between">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">{titulo}</h1>
                    <p className="text-muted-foreground mt-2">{subtitulo}</p>
                </div>
                <div>
                    <Botao to={link} variant="previous">Voltar</Botao>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit} id="form-cadastro">
                    <div className="flex flex-col gap-8">
                        {children}
                        <button type="submit"
                                className="bg-secondary text-tertiary p-3 rounded-md hover:bg-primary transition-all">Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}