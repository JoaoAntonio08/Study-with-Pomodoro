
<div align="center">
   📋 Menu de Navegação
🇧🇷 Versão em Português | 🇺🇸 English Version
</div>

<div align="center"> <br> <img src="https://img.shields.io/badge/Flask-Python-blue?logo=flask" /> <img src="https://img.shields.io/badge/Frontend-HTML5%2FCSS3%2FJS-brightgreen" /> <img src="https://img.shields.io/badge/Database-SQLite-yellow" /> <img src="https://img.shields.io/badge/Design-Responsivo-orange" /> </div>

📚 Guia de Estudos com Pomodoro
Sistema web completo para organização de estudos, tarefas e tempo, baseado na técnica Pomodoro. Ideal para estudantes que buscam produtividade e foco.

🚀 Principais Funcionalidades
Funcionalidade	Descrição
📊	Dashboard Interativo	Estatísticas, progresso por matéria, taxa de conclusão, gráficos e acompanhamento visual.
📝	Tarefas Inteligentes	Crie, edite, exclua e organize tarefas por categoria e prioridade.
⏰	Timer Pomodoro	Sessões de estudo personalizáveis, notificações, ciclos e controle de pausas.
🗂️	Categorias & Prioridades	Organização flexível por matérias e níveis de prioridade.
🖥️ Interface e Design
Responsiva: Desktop, tablet e smartphone.
Moderna: Gradientes, animações suaves, sidebar intuitiva.
Cores suaves: Menos cansaço visual.
Feedback visual: Para todas as ações do usuário.

⚙️ Configuração Rápida
bash
# Pré-requisitos: Python 3.11+, SQLite3

git clone https://github.com/JoaoAntonio08/Study-with-Pomodoro.git

cd guia_estudos

pip install -r requirements.txt

python src/main.py

Acesse: http://localhost:5000

# 🎯 Dicas de Produtividade
Planeje tarefas diárias específicas por matéria.
Use prioridades para focar no essencial.
Ajuste o Pomodoro conforme sua rotina.
Respeite os intervalos e acompanhe o progresso.

📂 Estrutura do Projeto
Code
guia_estudos/
├── src/
│   ├── models/          # Modelos do banco de dados
│   ├── routes/          # Rotas da API
│   ├── static/          # Frontend (HTML, CSS, JS, imagens)
│   ├── database/        # SQLite
│   └── main.py          # Principal Flask
├── requirements.txt
└── README.md

🗃️ Banco de Dados
Tabela	                  Função
tarefas	                  Armazena tarefas de estudo
categorias	               Matérias do ENEM
prioridades	               Níveis: Baixa, Média, Alta
configuracoes_pomodoro	   Personalização do timer Pomodoro

🛠️ Solução de Problemas
Servidor não inicia: Ative o ambiente virtual, instale dependências, verifique a porta.
Banco de dados: app.db deve estar em src/database/ e com permissão de escrita.
Interface não carrega: Confira a URL e o console do navegador.

🌟 Melhorias Futuras
Sistema de metas e objetivos
Relatórios detalhados
Integração com calendário
Modo escuro/claro
Backup e sincronização
Versão mobile

📞 Suporte
Para dúvidas ou sugestões, consulte o README ou analise o código fonte. Projeto focado em estudantes do ENEM.

<div align="center">
Bons estudos e sucesso! 🎯📚

</div>

🇺🇸 <a name="en-us"></a> Study Guide with Pomodoro

<div align="center"> <br> <img src="https://img.shields.io/badge/Flask-Python-blue?logo=flask" /> <img src="https://img.shields.io/badge/Frontend-HTML5%2FCSS3%2FJS-brightgreen" /> <img src="https://img.shields.io/badge/Database-SQLite-yellow" /> <img src="https://img.shields.io/badge/Design-Responsive-orange" /> </div>

📚 Study Guide with Pomodoro
A complete web system for organizing studies, tasks, and time management, based on the Pomodoro technique. Perfect for students seeking productivity and focus.

🚀 Key Features
Feature	Description
📊	Interactive Dashboard	Study statistics, subject progress, completion rate, graphs, and visual tracking.
📝	Smart Tasks	Create, edit, delete, and organize tasks by category and priority.
⏰	Pomodoro Timer	Customizable study sessions, notifications, cycles, and break control.
🗂️	Categories & Priorities	Flexible organization by subjects and priority levels.
🖥️ Interface & Design
Responsive: Desktop, tablet, and smartphone support.
Modern: Gradients, smooth animations, intuitive sidebar.
Soft colors: Less eye strain.
Visual feedback: For all user actions.
⚙️ Quick Setup
bash
# Prerequisites: Python 3.11+, SQLite3
git clone https://github.com/JoaoAntonio08/Study-with-Pomodoro.git
cd guia_estudos
pip install -r requirements.txt
python src/main.py
Access: http://localhost:5000
# 🎯 Productivity Tips
Plan daily tasks for each subject.
Use priorities to focus on what matters most.
Adjust Pomodoro settings to fit your routine.
Respect breaks and track your progress.
📂 Project Structure
Code
guia_estudos/
├── src/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── static/          # Frontend (HTML, CSS, JS, images)
│   ├── database/        # SQLite
│   └── main.py          # Flask main file
├── requirements.txt
└── README.md
🗃️ Database
Table	Function
tarefas	Stores study tasks
categorias	ENEM subjects
prioridades	Levels: Low, Medium, High
configuracoes_pomodoro	Pomodoro timer customization
🛠️ Troubleshooting
Server won't start: Activate virtual env, install dependencies, check port usage.
Database issues: app.db must be in src/database/ with write permissions.
Interface not loading: Check the URL and browser console.
🌟 Future Improvements
Goal and objective system
Detailed reports
Calendar integration
Dark/light mode
Backup and sync
Mobile app
📞 Support
For questions or suggestions, check this README or the source code. Project focused on ENEM students.

<div align="center">
Good studies and success! 🎯📚

</div>
