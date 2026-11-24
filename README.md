# NEON//FOCUS — Hora de Focar

Projeto de portfólio desenvolvido por Samuel Almeida. A aplicação utiliza a técnica Pomodoro para organizar períodos de concentração, intervalos e missões pessoais, com uma interface responsiva de estética cyberpunk. Utiliza React, TypeScript, Vite, CSS Modules e persistência local.

## Demonstração

**[Acessar a aplicação na Vercel](https://hora-de-focar.vercel.app/)**

1. Na página inicial, escolha um dos três modos: **Modo ataque** (foco), **Recarga** (pausa curta) ou **Reboot** (pausa longa).
2. Ajuste a duração do modo selecionado em horas, minutos e segundos. Inicie a contagem, pause ou retome quando desejar.
3. Ative a trilha sonora opcional durante a concentração. Ao terminar a sessão, o timer reproduz um alarme.
4. Na área de missões, crie uma tarefa, edite sua descrição, marque-a como concluída ou exclua-a. O menu de ações permite limpar missões concluídas ou todas as missões.
5. Atualize a página para conferir a persistência das tarefas e dos tempos personalizados.

A aplicação funciona sem back-end nesta versão. As missões e configurações permanecem no `localStorage` do navegador, sem sincronização entre dispositivos.

## Como executar

Utilize Node.js 24 (recomendado) e npm. O código da aplicação está na pasta `react-fokus` do repositório.

```bash
git clone https://github.com/SamuelWSGIT/HoraDeFocar.git
cd HoraDeFocar/react-fokus
npm install
npm run dev
```

Abra a URL indicada pelo Vite, normalmente `http://localhost:5173`.

| Comando | Uso |
| --- | --- |
| `npm run typecheck` | Verificar a tipagem TypeScript |
| `npm run lint` | Analisar o código com ESLint |
| `npm run build` | Validar TypeScript e gerar a versão de produção em `dist/` |
| `npm run preview` | Visualizar localmente o build |

## Estrutura

Caminhos relativos à pasta `react-fokus/`:

| Diretório ou arquivo | Conteúdo |
| --- | --- |
| `src/App.tsx` | Composição da aplicação |
| `src/components/` | Componentes de interface, timer e gerenciamento de missões |
| `src/hooks/` | Lógica de temporização, tarefas, música e estado |
| `src/constants/` | Configuração dos modos de concentração |
| `src/layouts/` | Estrutura visual da página |
| `src/services/` | Armazenamento de tarefas, áudio e preparação para integração futura |
| `src/utils/` | Funções auxiliares, incluindo formatação de tempo |
| `src/index.css` | Estilos globais |
| `public/` | Imagens, ícones e recursos sonoros |

## Modos principais

A aplicação concentra os recursos em uma única página.

| Modo | Finalidade |
| --- | --- |
| Modo ataque | Sessão de concentração |
| Recarga | Intervalo curto |
| Reboot | Intervalo longo |
| Missões | Organização de tarefas pessoais |

## Tecnologias

React 19, TypeScript, JavaScript (migração gradual), Vite, React Compiler, CSS Modules, Web Storage API, HTML Audio API, ESLint e `useActionState`.

## Evolução do projeto

A camada de serviços permite uma futura integração com API. A implementação atual utiliza somente armazenamento local. Antes de distribuir o projeto em produção, verifique as permissões dos recursos visuais e sonoros.

---

Projeto educacional para demonstração de competências em desenvolvimento front-end.
