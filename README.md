# 📚 Guia de Estudos - ENEM

Um sistema completo de gerenciamento de estudos, desenvolvido em Python com Flask e interface web moderna. O sistema inclui técnica Pomodoro, gerenciamento de tarefas, categorias e prioridades para tornar seus estudos mais organizados e produtivos.

## ✨ Funcionalidades

### 📊 Dashboard
- Visualização de estatísticas gerais dos estudos
- Progresso por categoria de matérias
- Taxa de conclusão de tarefas
- Acompanhamento visual do desempenho

### 📝 Gerenciamento de Tarefas
- Criar, editar e excluir tarefas de estudo
- Organizar por categorias (Matemática, Português, História, etc.)
- Definir prioridades (Alta, Média, Baixa)
- Marcar tarefas como concluídas
- Filtros por categoria, prioridade e status

### ⏰ Sistema Pomodoro
- Timer configurável para sessões de estudo
- Controle de tempo de estudo e descanso
- Múltiplos ciclos personalizáveis
- Notificações sonoras e visuais
- Técnica comprovada para aumentar a produtividade

### 🗂️ Categorias e Prioridades
- Gerenciar categorias de matérias
- Definir níveis de prioridade
- Organização personalizada dos estudos

## 🚀 Como Usar

### Pré-requisitos
- Python 3.11 ou superior
- SQLite3

### Instalação

1. **Clone ou baixe o projeto**
   ```bash
   # Se você recebeu o projeto compactado, extraia-o
   # Caso contrário, navegue até a pasta do projeto
   cd guia_estudos
   ```

2. **Instale as dependências** (se necessário)
   ```bash
   pip install -r requirements.txt
   ```

3. **Execute o sistema**
   ```bash
   python src/main.py
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5000
   ```

### Primeiro Uso

1. **Acesse o Dashboard** para ver as estatísticas iniciais
2. **Crie suas primeiras tarefas** na seção "Tarefas"
3. **Configure o Pomodoro** com seus tempos preferidos
4. **Organize por categorias** as matérias que você estuda
5. **Defina prioridades** para focar no que é mais importante

## 📱 Interface Responsiva

O sistema foi desenvolvido com design responsivo, funcionando perfeitamente em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones

## 🎨 Características do Design

- **Interface moderna** com gradientes e efeitos visuais
- **Navegação intuitiva** com sidebar organizada
- **Cores harmoniosas** que não cansam a vista
- **Animações suaves** para melhor experiência
- **Feedback visual** para todas as ações

## ⚙️ Configurações do Pomodoro

### Configuração Padrão
- **Tempo de Estudo:** 25 minutos
- **Tempo de Descanso:** 5 minutos
- **Número de Ciclos:** 4

### Personalização
Você pode ajustar todos os tempos conforme sua preferência:
- Tempo de estudo: 1-60 minutos
- Tempo de descanso: 1-30 minutos
- Número de ciclos: 1-10

## 📊 Banco de Dados

O sistema utiliza SQLite com as seguintes tabelas:
- **tarefas** - Armazena todas as tarefas de estudo
- **categorias** - Categorias de matérias (pré-populada com matérias do ENEM)
- **prioridades** - Níveis de prioridade (Baixa, Média, Alta)
- **configuracoes_pomodoro** - Configurações personalizadas do timer

## 🔧 Estrutura do Projeto

```
guia_estudos/
├── src/
│   ├── models/          # Modelos do banco de dados
│   │   ├── estudos.py   # Modelos principais
│   │   └── user.py      # Modelo de usuário (template)
│   ├── routes/          # Rotas da API
│   │   ├── estudos.py   # APIs do sistema de estudos
│   │   └── user.py      # APIs de usuário (template)
│   ├── static/          # Arquivos estáticos
│   │   ├── index.html   # Interface principal
│   │   ├── styles.css   # Estilos CSS
│   │   ├── script.js    # JavaScript da aplicação
│   │   └── *.jpg/png    # Imagens do sistema
│   ├── database/        # Banco de dados
│   │   └── app.db       # Arquivo SQLite
│   └── main.py          # Arquivo principal do Flask
├── requirements.txt     # Dependências do projeto
└── README.md           # Este arquivo
```

## 🎯 Dicas de Uso

### Para Maximizar a Produtividade

1. **Planeje seu dia** criando tarefas específicas para cada matéria
2. **Use prioridades** para focar no que é mais importante
3. **Configure o Pomodoro** com tempos que funcionem para você
4. **Faça pausas** respeitando os intervalos do timer
5. **Acompanhe o progresso** através do dashboard

### Organização Recomendada

- **Matemática:** Álgebra, Geometria, Estatística
- **Português:** Gramática, Literatura, Redação
- **Ciências:** Física, Química, Biologia
- **Humanas:** História, Geografia, Filosofia, Sociologia

## 🚨 Solução de Problemas

### O servidor não inicia
- Verifique se o ambiente virtual está ativado
- Confirme se todas as dependências estão instaladas
- Verifique se a porta 5000 não está sendo usada

### Banco de dados não funciona
- O arquivo `app.db` deve estar na pasta `src/database/`
- Verifique as permissões de escrita na pasta

### Interface não carrega
- Confirme que está acessando `http://localhost:5000`
- Verifique se não há erros no console do navegador
- Teste em um navegador diferente

## 🔄 Atualizações Futuras

Possíveis melhorias para versões futuras:
- Sistema de metas e objetivos
- Relatórios detalhados de progresso
- Integração com calendário
- Modo escuro/claro
- Backup e sincronização
- Aplicativo mobile

## 📞 Suporte

Este sistema foi desenvolvido especificamente para auxiliar nos estudos do ENEM. Para dúvidas ou sugestões sobre o uso do sistema, consulte este README ou analise o código fonte.

## 🎓 Sobre o Projeto

Desenvolvido com foco na produtividade e organização dos estudos, utilizando:
- **Backend:** Python Flask
- **Frontend:** HTML5, CSS3, JavaScript
- **Banco de Dados:** SQLite
- **Design:** Interface responsiva e moderna
- **Técnicas:** Pomodoro para gestão de tempo

---

**Bons estudos e sucesso no ENEM! 🎯📚**

