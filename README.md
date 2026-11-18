# NEON//FOCUS

Aplicação web de foco baseada na técnica Pomodoro, com uma interface cyberpunk/neon para organizar sessões de concentração, pausas e missões pessoais.

O projeto foi desenvolvido para demonstrar uma aplicação React moderna, com componentes reutilizáveis, persistência local, controle de áudio, formulários com `useActionState` e preparação para publicação na Vercel.

> Projeto em evolução para portfólio. A aplicação atualmente utiliza o `localStorage` do navegador para persistir dados localmente.

## Demonstração

Após publicar na Vercel, substitua o endereço abaixo pelo domínio definitivo:

**Demo:** `[https://seu-projeto.vercel.app](https://hora-de-focar.vercel.app/)`

## Funcionalidades

- Timer Pomodoro com três modos:
  - Foco / Modo ataque
  - Descanso curto / Recarga
  - Descanso longo / Reboot
- Edição dos tempos em horas, minutos e segundos.
- Salvamento dos tempos personalizados no `localStorage`.
- Contador regressivo com pausa, retomada e alarme ao finalizar.
- Trilha sonora opcional para concentração.
- Cadastro de missões.
- Edição, conclusão e exclusão de missões.
- Limpeza de missões concluídas ou de todas as missões.
- Persistência das missões no `localStorage`.
- Menu de ações fechado automaticamente após a limpeza das missões.
- Interface responsiva para desktop, tablet e celular.
- Componentes com CSS Modules.
- Elementos semânticos e atributos de acessibilidade.
- Ações assíncronas com `useActionState` nas áreas com múltiplos botões.
- Estrutura preparada para substituir o armazenamento local por uma API futuramente.

## Tecnologias e ferramentas

### Linguagens e padrões

- TypeScript e TSX
- JavaScript e JSX durante a migração gradual
- CSS
- HTML semântico
- JSON
- SVG
- PNG
- MP3

### Stack principal

- React `19.3.1`
- React DOM `19.3.1`
- Vite `8.3.6`
- TypeScript `6.0.3`
- React Compiler
- `@vitejs/plugin-react`
- `@rolldown/plugin-babel`
- ESLint
- `typescript-eslint`
- CSS Modules
- Web Storage API (`localStorage`)
- HTML Audio API

### Configuração de desenvolvimento

- `tsconfig.json` com suporte à migração gradual de JavaScript para TypeScript.
- `strict: true` para arquivos TypeScript.
- `moduleResolution: bundler` para compatibilidade com Vite.
- `allowJs: true` para manter arquivos JavaScript durante a migração.
- `checkJs: false` para evitar bloquear o projeto antes da conversão completa.
- `eslint.config.js` com regras base do ESLint, React Hooks e React Refresh.

### Workflow e publicação

- Visual Studio Code
- Git
- GitHub
- Vercel

## Organização do projeto

```text
src/
├── components/
│   ├── Banner/          # Banner visual dos modos
│   ├── Button/          # Botão reutilizável
│   ├── HeaderFokus/     # Cabeçalho
│   ├── Icon/            # Ícones do projeto
│   ├── Logo/            # Identidade visual
│   ├── MainContent/     # Conteúdo principal
│   ├── SiteFooter/      # Rodapé
│   ├── TaskBoard/       # Área de missões
│   ├── TaskForm/        # Criação e edição de missões
│   ├── TaskList/        # Lista de missões
│   ├── TaskMenu/        # Ações de limpeza
│   └── TimerCard/       # Timer e configurações de duração
├── constants/           # Configurações dos modos Pomodoro
├── hooks/               # Hooks de timer, tarefas, música e estado da aplicação
├── layouts/             # Layout principal da página
├── services/            # Persistência, áudio e integração futura
├── utils/               # Funções utilitárias, como formatação de tempo
├── App.tsx              # Composição principal da aplicação
└── index.css            # Estilos globais
```

## Persistência de dados

A aplicação não depende de um backend para funcionar no estado atual.

### Missões

As missões são armazenadas em:

```text
react-fokus:tasks
```

A implementação está em [`src/services/taskService.ts`](./src/services/taskService.ts), que mantém as operações:

- `getTasks`
- `createTask`
- `updateTask`
- `deleteTask`

### Configurações do timer

As durações personalizadas são armazenadas em:

```text
react-fokus:pomodoro-durations-seconds
```

Os valores são salvos em segundos e convertidos para horas, minutos e segundos na interface. A chave antiga em minutos também possui migração automática:

```text
react-fokus:pomodoro-durations
```

### Importante para a Vercel

O `localStorage` é específico do navegador e do domínio. Portanto:

- Os dados permanecem após atualizar a página.
- Os dados não são compartilhados entre dispositivos.
- Os dados não são compartilhados entre usuários.
- Limpar os dados do navegador remove as missões e configurações locais.
- Para persistência online, será necessário reativar a API ou conectar um banco de dados.

## API preparada para o futuro

A implementação anterior baseada em `fetch` está preservada como comentário em [`src/services/taskService.ts`](./src/services/taskService.ts).

Para reativá-la futuramente, será necessário:

1. Remover ou substituir a implementação de `localStorage`.
2. Reativar as funções da API comentadas.
3. Configurar a variável `VITE_TASKS_API_URL`.
4. Garantir que o backend esteja disponível para desenvolvimento e produção.

## Imagens e identidade visual

Os principais arquivos visuais estão em `public/`:

- `logo.png` — logotipo NEON//FOCUS.
- `mode-1.png` — imagem do modo ataque.
- `mode-2.png` — imagem do modo recarga.
- `mode-3.png` — imagem do modo reboot.
- `pattern.png` — textura visual de apoio.
- `src/assets/hero.png` — asset legado mantido no projeto, sem uso na interface atual.
- `favicon.svg` — ícone da página.
- `icons/` — ícones de ações da interface.
- `icons.svg` — conjunto de ícones.

Os banners utilizam imagens responsivas e o título é sobreposto à imagem para manter o mesmo comportamento em todos os modos.

## Sons

Os arquivos de áudio estão em `public/sounds/`:

- `lofi.mp3` — trilha principal de concentração.
- `luna-rise-part-one.mp3` — trilha disponível para expansão futura.
- `ta-da.mp3` — efeito disponível para expansão futura.
- `ta-da-2.mp3` — alarme utilizado ao finalizar o timer.

O controle de áudio está separado em [`src/services/audioService.js`](./src/services/audioService.js) e o estado da trilha é controlado pelo hook `useMusic`.

## Regras e padrões de código

- Componentes separados por responsabilidade.
- Cada componente visual possui seu próprio arquivo `index.tsx` ou `index.jsx` e CSS Module.
- Funções de persistência ficam dentro de `services/`.
- Regras de negócio reutilizáveis ficam dentro de `hooks/` ou `utils/`.
- Tipos e configurações compartilhadas devem ser centralizados.
- Componentes não devem acessar diretamente o `localStorage` quando a operação puder ficar em um service.
- Formulários com múltiplas ações utilizam `useActionState`.
- Operações assíncronas desabilitam os botões durante o processamento para evitar duplicidade.
- Hooks do React devem respeitar as regras do `eslint-plugin-react-hooks`.
- Arquivos TypeScript devem manter `strict` habilitado.
- O código deve ser validado antes de commit ou deploy.

## Extensões recomendadas para o VS Code

O projeto não possui uma pasta `.vscode` com extensões obrigatórias versionadas. As extensões abaixo são recomendadas para desenvolver o projeto:

- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier - Code formatter** — `esbenp.prettier-vscode`
- **Error Lens** — `usernamehw.errorlens`
- **GitLens** — `eamodio.gitlens`
- **Material Icon Theme** — `PKief.material-icon-theme`

O suporte básico a TypeScript e JavaScript já é nativo do VS Code. As extensões recomendadas não são dependências necessárias para executar ou publicar a aplicação.

## Como executar localmente

### Pré-requisitos

- Node.js 22 ou superior recomendado.
- npm.

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá a URL local no terminal, normalmente:

```text
http://localhost:5173
```

### Verificação TypeScript

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

### Build de produção

```bash
npm run build
```

O build executa o TypeScript antes do bundle do Vite e gera a pasta `dist/`.

### Preview do build

```bash
npm run preview
```

## Publicação na Vercel

### Configuração pelo painel da Vercel

1. Faça push do projeto para o GitHub.
2. Importe o repositório na Vercel.
3. Selecione o framework **Vite**.
4. Utilize os comandos padrão:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Execute o deploy.

Não há variáveis de ambiente obrigatórias para o funcionamento atual, pois as missões e configurações utilizam `localStorage`.

Se a API for reativada, configure:

```text
VITE_TASKS_API_URL=https://seu-backend.com/tasks
```

## Melhorias futuras

- Migrar os hooks e services restantes de JavaScript para TypeScript.
- Adicionar testes unitários e testes de componentes.
- Adicionar persistência em banco de dados.
- Criar autenticação de usuários.
- Sincronizar missões entre dispositivos.
- Permitir escolha de trilhas sonoras dentro da interface.
- Adicionar notificações configuráveis.
- Criar métricas de foco e histórico de sessões.
- Adicionar pipeline de CI para lint, typecheck e build.

## Licença e créditos

Este projeto foi desenvolvido como demonstrativo de portfólio. Antes de publicar em produção, confirme as licenças e permissões dos arquivos de imagem, ícones e áudio utilizados.

---

Desenvolvido com React, TypeScript, Vite e muita concentração.
