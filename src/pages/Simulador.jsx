import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ListCavalos from "../components/ListCavalos.jsx";
import {useUser} from "../contexts/UserData.jsx";
import {chooseHaras} from "../contexts/ChooseHaras.jsx";
import {Pie, Bar} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Simulador() {
    const navigate = useNavigate();
    const [userData, updateUser, logout] = useUser();

    // State único para todos os campos do formulário
    const [form, setForm] = useState({
        numeroCavalos: 0,
        custoAlimentacao: 0,
        visitasVet: 0,
        custoVisitas: 0,
        numeroFuncionarios: 0,
        salarioMedio: 0,
        outrosCustos: 0
    });
    // State para os resultados
    const [resultados, setResultados] = useState(null);

    function formatCurrency(value) {
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value);
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: Number(value)}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const {
            numeroCavalos,
            custoAlimentacao,
            visitasVet,
            custoVisitas,
            numeroFuncionarios,
            salarioMedio,
            outrosCustos
        } = form;
        // Cálculos mensais
        const custoAlimentacaoTotal = numeroCavalos * custoAlimentacao;
        const custoVeterinarioTotal = visitasVet * custoVisitas;
        const custoFuncionariosTotal = numeroFuncionarios * salarioMedio;
        const custoMensalTotal = custoAlimentacaoTotal + custoVeterinarioTotal + custoFuncionariosTotal + outrosCustos;
        // Cálculos anuais
        const custoAlimentacaoAnual = custoAlimentacaoTotal * 12;
        const custoVeterinarioAnual = custoVeterinarioTotal * 12;
        const custoFuncionariosAnual = custoFuncionariosTotal * 12;
        const outrosCustosAnual = outrosCustos * 12;
        const custoAnualTotal = custoMensalTotal * 12;
        setResultados({
            custoAlimentacaoTotal,
            custoVeterinarioTotal,
            custoFuncionariosTotal,
            outrosCustos,
            custoMensalTotal,
            custoAlimentacaoAnual,
            custoVeterinarioAnual,
            custoFuncionariosAnual,
            outrosCustosAnual,
            custoAnualTotal
        });
    }

    return (
        <div className="flex h-screen">
            <Sidebar selected="simulador" userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar logout={logout} disableSearch={true} disableSelect={true} userData={userData}
                        updateUser={updateUser}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <div className="w-full max-w-4xl xl:max-w-[90%] px-6 py-6 space-y-6">
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold tracking-tight">Simulador de Custos</h1>
                                <p className="text-muted-foreground mt-2">Calcule os custos mensais e anuais do seu
                                    haras</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-8">
                            <div className="w-2/5 bg-white rounded-lg shadow p-6 self-start">
                                <form id="form-simulador-custos" onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-8">
                                        <div className="flex 2xl:flex-row flex-col gap-4 w-full items-end">
                                            <div className="flex flex-col gap-2 w-full">
                                                <label htmlFor="numero-cavalos" className="font-medium">Número de
                                                    Cavalos</label>
                                                <input id="numero-cavalos" name="numeroCavalos" type="number"
                                                       value={form.numeroCavalos} onChange={handleChange}
                                                       className="rounded-md p-3 text-sm border border-secondary"
                                                       placeholder="0"/>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full">
                                                <label htmlFor="custo-alimentacao" className="font-medium">Custo de
                                                    Alimentação por Cavalo (R$)</label>
                                                <input id="custo-alimentacao" name="custoAlimentacao" type="number"
                                                       step="0.1" value={form.custoAlimentacao} onChange={handleChange}
                                                       className="rounded-md p-3 text-sm border border-secondary"
                                                       placeholder="R$ 000,00"/>
                                            </div>
                                        </div>

                                        <div className="flex 2xl:flex-row flex-col gap-4 w-full items-end">
                                            <div className="flex flex-col gap-2 w-full">
                                                <label htmlFor="visitas-vet-mes" className="font-medium">Visitas
                                                    Veterinárias por Mês</label>
                                                <input id="visitas-vet-mes" name="visitasVet" type="number"
                                                       value={form.visitasVet} onChange={handleChange}
                                                       className="rounded-md p-3 text-sm border border-secondary"
                                                       placeholder="0"/>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full">
                                                <label htmlFor="custo-visitas" className="font-medium">Custo por Visita
                                                    Veterinária (R$)</label>
                                                <input id="custo-visitas" name="custoVisitas" type="number" step="0.1"
                                                       value={form.custoVisitas} onChange={handleChange}
                                                       className="rounded-md p-3 text-sm border border-secondary"
                                                       placeholder="R$ 000,00"/>
                                            </div>
                                        </div>

                                        <div className="flex 2xl:flex-row flex-col gap-4 w-full items-end">
                                            <div className="flex flex-col gap-2 w-full">
                                                <label htmlFor="numero-funcionarios" className="font-medium">Número de
                                                    Funcionários</label>
                                                <input id="numero-funcionarios" name="numeroFuncionarios" type="number"
                                                       value={form.numeroFuncionarios} onChange={handleChange}
                                                       className="rounded-md p-3 text-sm border border-secondary"
                                                       placeholder="0"/>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full">
                                                <label htmlFor="salario-medio-funcionario" className="font-medium">Salário
                                                    Médio por Funcionário (R$)</label>
                                                <input id="salario-medio-funcionario" name="salarioMedio" type="number"
                                                       step="0.1" value={form.salarioMedio} onChange={handleChange}
                                                       className="rounded-md p-3 text-sm border border-secondary"
                                                       placeholder="R$ 000,00"/>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 w-full">
                                            <label htmlFor="outros-custos" className="font-medium">Outros Custos Mensais
                                                (R$)</label>
                                            <input id="outros-custos" name="outrosCustos" type="number" step="0.1"
                                                   value={form.outrosCustos} onChange={handleChange}
                                                   className="rounded-md p-3 text-sm border border-secondary"
                                                   placeholder="R$ 000,00"/>
                                        </div>

                                        <button type="submit"
                                                className="bg-secondary text-tertiary p-3 rounded-md hover:bg-primary transition-all">Calcular
                                            Custos
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {resultados && (<div id="resultados-geral" className="w-3/5 flex flex-col gap-8">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-medium tracking-tight pb-6 self-start">Resultado do
                                        Cálculo</h2>
                                    <div id="costs-table" className="pb-4">
                                        {resultados ? (
                                            <table className="w-full">
                                                <thead className="bg-tertiary">
                                                <tr className="border-b border-gray-200">
                                                    <th className="h-12 px-4 text-left align-middle font-medium">Categoria</th>
                                                    <th className="h-12 px-4 text-right align-middle font-medium">Custo
                                                        Mensal
                                                    </th>
                                                    <th className="h-12 px-4 text-right align-middle font-medium">Custo
                                                        Anual
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="border-b border-gray-200">
                                                    <td className="p-4 align-middle font-medium">Alimentação</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoAlimentacaoTotal)}</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoAlimentacaoAnual)}</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                    <td className="p-4 align-middle font-medium">Veterinário</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoVeterinarioTotal)}</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoVeterinarioAnual)}</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                    <td className="p-4 align-middle font-medium">Funcionários</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoFuncionariosTotal)}</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoFuncionariosAnual)}</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                    <td className="p-4 align-middle font-medium">Outros</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.outrosCustos)}</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.outrosCustosAnual)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 align-middle font-medium">Total</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoMensalTotal)}</td>
                                                    <td className="p-4 align-middle text-right">{formatCurrency(resultados.custoAnualTotal)}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center text-gray-400 py-8">Preencha os campos e clique
                                                em Calcular Custos</div>
                                        )}
                                    </div>
                                    <div className="flex fle-row gap-4">
                                        <div id="big-total-mensal"
                                             className="w-1/2 bg-tertiary rounded-lg p-3 flex flex-col items-center justify-center text-center">
                                            <h3>Total Mensal</h3>
                                            <span className="font-heebo font-bold text-xl">
                                                {resultados ? formatCurrency(resultados.custoMensalTotal) : "-"}
                                            </span>
                                        </div>
                                        <div id="big-total-anual"
                                             className="w-1/2 bg-tertiary rounded-lg p-3 flex flex-col items-center justify-center text-center">
                                            <h3>Total Anual</h3>
                                            <span className="font-heebo font-bold text-xl">
                                                {resultados ? formatCurrency(resultados.custoAnualTotal) : "-"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div id="resultado-grafico-pizza" className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-medium tracking-tight pb-6">Distribuição de Custos -
                                        Gráfico Pizza</h2>
                                    <div
                                        className="flex justify-center items-center w-full h-[40vw] min-h-[240px] max-h-[600px]">
                                        {resultados && (
                                            <Pie
                                                data={{
                                                    labels: ['Alimentação', 'Veterinário', 'Funcionários', 'Outros'],
                                                    datasets: [
                                                        {
                                                            data: [
                                                                resultados.custoAlimentacaoTotal,
                                                                resultados.custoVeterinarioTotal,
                                                                resultados.custoFuncionariosTotal,
                                                                resultados.outrosCustos
                                                            ],
                                                            backgroundColor: [
                                                                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
                                                            ],
                                                            hoverBackgroundColor: [
                                                                '#E57373', '#64B5F6', '#FFB74D', '#4DB6AC'
                                                            ],
                                                            borderColor: '#fff',
                                                            borderWidth: 4
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {legend: {position: 'top'}},
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div id="resultado-grafico-barras" className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-medium tracking-tight pb-6">Distribuição de Custos -
                                        Gráfico Barras</h2>
                                    <div
                                        className="flex justify-center items-center w-full h-[20vw] min-h-[240px] max-h-[600px]">
                                        {resultados && (
                                            <Bar
                                                data={{
                                                    labels: ['Alimentação', 'Veterinário', 'Funcionários', 'Outros'],
                                                    datasets: [
                                                        {
                                                            label: 'Custo Mensal',
                                                            data: [
                                                                resultados.custoAlimentacaoTotal,
                                                                resultados.custoVeterinarioTotal,
                                                                resultados.custoFuncionariosTotal,
                                                                resultados.outrosCustos
                                                            ],
                                                            backgroundColor: [
                                                                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
                                                            ],
                                                        },
                                                        {
                                                            label: 'Custo Anual',
                                                            data: [
                                                                resultados.custoAlimentacaoAnual,
                                                                resultados.custoVeterinarioAnual,
                                                                resultados.custoFuncionariosAnual,
                                                                resultados.outrosCustosAnual
                                                            ],
                                                            backgroundColor: [
                                                                '#E57373', '#64B5F6', '#FFB74D', '#4DB6AC'
                                                            ],
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {legend: {position: 'bottom'}},
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                            ticks: {
                                                                callback: function (value) {
                                                                    return formatCurrency(value);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>

                </main>
            </div>
        </div>
)
}

