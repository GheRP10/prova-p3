import { useEffect, useState } from 'react';
import Head from 'next/head'; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DisciplinaData {
  curso: string;
  quantidadeDisciplinas: number;
}

export default function HomePage() {
  const [dadosGrafico, setDadosGrafico] = useState<DisciplinaData[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarDados() {
      try {
        const apiUrl = "https://api-prova-p3-ghesantos-gbf2cjcaf0ahdafa.brazilsouth-01.azurewebsites.net/api/Relatorios/DisciplinasPorCurso";
    
        const resposta = await fetch(apiUrl);
        const dados: DisciplinaData[] = await resposta.json();
        const dadosAjustados = dados.map((item: any) => ({
          curso: item.nome_Curso,
          quantidadeDisciplinas: item.total_Disciplinas,
        }));
        setDadosGrafico(dadosAjustados);
      } catch (error) {
        console.error("Falha ao buscar dados da API:", error);
      } finally {
        setCarregando(false);
      }
    }
    buscarDados();
  }, []);

  return (
    <>
      <Head>
        <title>Gheizla Santos - Atividade Grafico P3</title>
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Quantidade de Disciplinas por Curso
        </h1>
        {carregando ? (
          <p>Carregando dados...</p>
        ) : (
          <div style={{ width: '100%', maxWidth: '800px', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={dadosGrafico}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" />
                <YAxis
                  dataKey="curso"
                  type="category"
                  width={150}
                  tick={{ fill: '#fff' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                  contentStyle={{ backgroundColor: '#222', border: 'none' }}
                />
                <Legend />
                
                <Bar dataKey="quantidadeDisciplinas" fill="darkviolet" name="Nº de Disciplinas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </main>
    </>
  );
}