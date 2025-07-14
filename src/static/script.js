// Configuração da API
const API_BASE = '/api';

// Estado global da aplicação
let currentSection = 'dashboard';
let editingTarefa = null;
let timerInterval = null;
let timerState = {
    isRunning: false,
    isPaused: false,
    currentTime: 0,
    isStudyTime: true,
    currentCycle: 1,
    totalCycles: 4,
    studyTime: 25,
    breakTime: 5
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadInitialData();
});

function initializeApp() {
    // Configurar navegação
    setupNavigation();
    
    // Configurar modais
    setupModals();
    
    // Carregar configuração do Pomodoro
    loadPomodoroConfig();
}

function setupEventListeners() {
    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Botões principais
    document.getElementById('nova-tarefa-btn').addEventListener('click', () => openTarefaModal());
    document.getElementById('nova-categoria-btn').addEventListener('click', () => openModal('modal-categoria'));
    document.getElementById('nova-prioridade-btn').addEventListener('click', () => openModal('modal-prioridade'));

    // Formulários
    document.getElementById('form-tarefa').addEventListener('submit', handleTarefaSubmit);
    document.getElementById('form-categoria').addEventListener('submit', handleCategoriaSubmit);
    document.getElementById('form-prioridade').addEventListener('submit', handlePrioridadeSubmit);

    // Pomodoro
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('pause-timer').addEventListener('click', pauseTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);
    document.getElementById('salvar-config').addEventListener('click', savePomodoroConfig);

    // Filtros
    document.getElementById('filtro-categoria').addEventListener('change', filterTarefas);
    document.getElementById('filtro-prioridade').addEventListener('change', filterTarefas);
    document.getElementById('filtro-status').addEventListener('change', filterTarefas);

    // Fechar modais
    document.querySelectorAll('.close, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Fechar modal clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModals();
        });
    });
}

function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            showSection(section);
        });
    });
}

function handleNavigation(e) {
    e.preventDefault();
    const section = e.target.closest('.nav-link').dataset.section;
    showSection(section);
}

function showSection(sectionName) {
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Mostrar seção
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    currentSection = sectionName;

    // Carregar dados específicos da seção
    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'tarefas':
            loadTarefas();
            loadFilters();
            break;
        case 'categorias':
            loadCategorias();
            break;
        case 'prioridades':
            loadPrioridades();
            break;
    }
}

async function loadInitialData() {
    await loadDashboard();
}

// Funções de API
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showNotification('Erro na comunicação com o servidor', 'error');
        throw error;
    }
}

// Dashboard
async function loadDashboard() {
    try {
        const stats = await apiRequest('/estatisticas');
        updateDashboardStats(stats);
        updateCategoriesProgress(stats.categorias);
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

function updateDashboardStats(stats) {
    document.getElementById('total-tarefas').textContent = stats.total_tarefas;
    document.getElementById('tarefas-concluidas').textContent = stats.tarefas_concluidas;
    document.getElementById('tarefas-pendentes').textContent = stats.tarefas_pendentes;
    document.getElementById('percentual-conclusao').textContent = `${stats.percentual_conclusao}%`;
}

function updateCategoriesProgress(categorias) {
    const container = document.getElementById('categorias-progress');
    container.innerHTML = '';

    categorias.forEach(categoria => {
        const percentage = categoria.total > 0 ? (categoria.concluidas / categoria.total * 100) : 0;
        
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        progressItem.innerHTML = `
            <div class="progress-info">
                <h4>${categoria.categoria}</h4>
                <div class="progress-stats">${categoria.concluidas}/${categoria.total} tarefas concluídas</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        container.appendChild(progressItem);
    });
}

// Tarefas
async function loadTarefas() {
    try {
        const tarefas = await apiRequest('/tarefas');
        displayTarefas(tarefas);
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
    }
}

function displayTarefas(tarefas) {
    const container = document.getElementById('lista-tarefas');
    container.innerHTML = '';

    if (tarefas.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>';
        return;
    }

    tarefas.forEach(tarefa => {
        const tarefaElement = createTarefaElement(tarefa);
        container.appendChild(tarefaElement);
    });
}

function createTarefaElement(tarefa) {
    const div = document.createElement('div');
    div.className = `tarefa-item ${tarefa.concluida ? 'concluida' : ''}`;
    
    const prioridadeClass = tarefa.prioridade_nome ? tarefa.prioridade_nome.toLowerCase() : '';
    
    div.innerHTML = `
        <div class="tarefa-header">
            <div>
                <h3 class="tarefa-title ${tarefa.concluida ? 'concluida' : ''}">${tarefa.titulo}</h3>
                <div class="tarefa-meta">
                    ${tarefa.categoria_nome ? `<span class="badge badge-categoria">${tarefa.categoria_nome}</span>` : ''}
                    ${tarefa.prioridade_nome ? `<span class="badge badge-prioridade ${prioridadeClass}">${tarefa.prioridade_nome}</span>` : ''}
                </div>
            </div>
            <div class="tarefa-actions">
                <button class="btn btn-small btn-${tarefa.concluida ? 'warning' : 'success'}" onclick="toggleTarefa(${tarefa.id}, ${!tarefa.concluida})">
                    <i class="fas fa-${tarefa.concluida ? 'undo' : 'check'}"></i>
                    ${tarefa.concluida ? 'Reabrir' : 'Concluir'}
                </button>
                <button class="btn btn-small btn-secondary" onclick="editTarefa(${tarefa.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteTarefa(${tarefa.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
        ${tarefa.descricao ? `<div class="tarefa-descricao">${tarefa.descricao}</div>` : ''}
    `;
    
    return div;
}

async function toggleTarefa(id, concluida) {
    try {
        await apiRequest(`/tarefas/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ concluida })
        });
        
        loadTarefas();
        if (currentSection === 'dashboard') {
            loadDashboard();
        }
        
        showNotification(concluida ? 'Tarefa concluída!' : 'Tarefa reaberta!', 'success');
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }
}

async function deleteTarefa(id) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    
    try {
        await apiRequest(`/tarefas/${id}`, { method: 'DELETE' });
        loadTarefas();
        if (currentSection === 'dashboard') {
            loadDashboard();
        }
        showNotification('Tarefa excluída!', 'success');
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
    }
}

async function editTarefa(id) {
    try {
        const tarefas = await apiRequest('/tarefas');
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            editingTarefa = tarefa;
            openTarefaModal(tarefa);
        }
    } catch (error) {
        console.error('Erro ao carregar tarefa para edição:', error);
    }
}

// Filtros
async function loadFilters() {
    try {
        const [categorias, prioridades] = await Promise.all([
            apiRequest('/categorias'),
            apiRequest('/prioridades')
        ]);
        
        populateSelect('filtro-categoria', categorias, 'nome');
        populateSelect('filtro-prioridade', prioridades, 'nome');
    } catch (error) {
        console.error('Erro ao carregar filtros:', error);
    }
}

function filterTarefas() {
    const categoriaFilter = document.getElementById('filtro-categoria').value;
    const prioridadeFilter = document.getElementById('filtro-prioridade').value;
    const statusFilter = document.getElementById('filtro-status').value;
    
    const tarefaItems = document.querySelectorAll('.tarefa-item');
    
    tarefaItems.forEach(item => {
        let show = true;
        
        if (categoriaFilter) {
            const categoriaBadge = item.querySelector('.badge-categoria');
            if (!categoriaBadge || categoriaBadge.textContent !== categoriaFilter) {
                show = false;
            }
        }
        
        if (prioridadeFilter) {
            const prioridadeBadge = item.querySelector('.badge-prioridade');
            if (!prioridadeBadge || prioridadeBadge.textContent !== prioridadeFilter) {
                show = false;
            }
        }
        
        if (statusFilter) {
            const isConcluida = item.classList.contains('concluida');
            if ((statusFilter === 'concluida' && !isConcluida) || 
                (statusFilter === 'pendente' && isConcluida)) {
                show = false;
            }
        }
        
        item.style.display = show ? 'block' : 'none';
    });
}

// Categorias
async function loadCategorias() {
    try {
        const categorias = await apiRequest('/categorias');
        displayCategorias(categorias);
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

function displayCategorias(categorias) {
    const container = document.getElementById('lista-categorias');
    container.innerHTML = '';

    categorias.forEach(categoria => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <span class="item-name">${categoria.nome}</span>
            <div class="item-actions">
                <button class="btn btn-small btn-danger" onclick="deleteCategoria(${categoria.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

async function deleteCategoria(id) {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;
    
    try {
        await apiRequest(`/categorias/${id}`, { method: 'DELETE' });
        loadCategorias();
        showNotification('Categoria excluída!', 'success');
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
    }
}

// Prioridades
async function loadPrioridades() {
    try {
        const prioridades = await apiRequest('/prioridades');
        displayPrioridades(prioridades);
    } catch (error) {
        console.error('Erro ao carregar prioridades:', error);
    }
}

function displayPrioridades(prioridades) {
    const container = document.getElementById('lista-prioridades');
    container.innerHTML = '';

    prioridades.forEach(prioridade => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <span class="item-name">${prioridade.nome}</span>
            <div class="item-actions">
                <button class="btn btn-small btn-danger" onclick="deletePrioridade(${prioridade.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

async function deletePrioridade(id) {
    if (!confirm('Tem certeza que deseja excluir esta prioridade?')) return;
    
    try {
        await apiRequest(`/prioridades/${id}`, { method: 'DELETE' });
        loadPrioridades();
        showNotification('Prioridade excluída!', 'success');
    } catch (error) {
        console.error('Erro ao excluir prioridade:', error);
    }
}

// Modais
function setupModals() {
    // Carregar dados para selects dos modais
    loadModalData();
}

async function loadModalData() {
    try {
        const [categorias, prioridades] = await Promise.all([
            apiRequest('/categorias'),
            apiRequest('/prioridades')
        ]);
        
        populateSelect('tarefa-categoria', categorias, 'nome');
        populateSelect('tarefa-prioridade', prioridades, 'nome');
    } catch (error) {
        console.error('Erro ao carregar dados dos modais:', error);
    }
}

function populateSelect(selectId, items, textField) {
    const select = document.getElementById(selectId);
    const currentOptions = select.querySelectorAll('option:not([value=""])');
    currentOptions.forEach(option => option.remove());
    
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item[textField];
        select.appendChild(option);
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Limpar formulários
    document.querySelectorAll('form').forEach(form => form.reset());
    editingTarefa = null;
}

function openTarefaModal(tarefa = null) {
    const modal = document.getElementById('modal-tarefa');
    const title = document.getElementById('modal-tarefa-title');
    
    if (tarefa) {
        title.textContent = 'Editar Tarefa';
        document.getElementById('tarefa-titulo').value = tarefa.titulo;
        document.getElementById('tarefa-descricao').value = tarefa.descricao || '';
        document.getElementById('tarefa-categoria').value = tarefa.categoria_id || '';
        document.getElementById('tarefa-prioridade').value = tarefa.prioridade_id || '';
    } else {
        title.textContent = 'Nova Tarefa';
    }
    
    openModal('modal-tarefa');
}

// Handlers de formulários
async function handleTarefaSubmit(e) {
    e.preventDefault();
    
    const formData = {
        titulo: document.getElementById('tarefa-titulo').value,
        descricao: document.getElementById('tarefa-descricao').value,
        categoria_id: document.getElementById('tarefa-categoria').value || null,
        prioridade_id: document.getElementById('tarefa-prioridade').value || null
    };
    
    try {
        if (editingTarefa) {
            await apiRequest(`/tarefas/${editingTarefa.id}`, {
                method: 'PUT',
                body: JSON.stringify(formData)
            });
            showNotification('Tarefa atualizada!', 'success');
        } else {
            await apiRequest('/tarefas', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showNotification('Tarefa criada!', 'success');
        }
        
        closeModals();
        loadTarefas();
        if (currentSection === 'dashboard') {
            loadDashboard();
        }
    } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
    }
}

async function handleCategoriaSubmit(e) {
    e.preventDefault();
    
    const nome = document.getElementById('categoria-nome').value;
    
    try {
        await apiRequest('/categorias', {
            method: 'POST',
            body: JSON.stringify({ nome })
        });
        
        closeModals();
        loadCategorias();
        loadModalData();
        showNotification('Categoria criada!', 'success');
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
    }
}

async function handlePrioridadeSubmit(e) {
    e.preventDefault();
    
    const nome = document.getElementById('prioridade-nome').value;
    
    try {
        await apiRequest('/prioridades', {
            method: 'POST',
            body: JSON.stringify({ nome })
        });
        
        closeModals();
        loadPrioridades();
        loadModalData();
        showNotification('Prioridade criada!', 'success');
    } catch (error) {
        console.error('Erro ao criar prioridade:', error);
    }
}

// Sistema Pomodoro
async function loadPomodoroConfig() {
    try {
        const config = await apiRequest('/pomodoro/config');
        
        timerState.studyTime = config.tempo_estudo;
        timerState.breakTime = config.tempo_descanso;
        timerState.totalCycles = config.num_ciclos;
        
        document.getElementById('tempo-estudo').value = config.tempo_estudo;
        document.getElementById('tempo-descanso').value = config.tempo_descanso;
        document.getElementById('num-ciclos').value = config.num_ciclos;
        document.getElementById('total-cycles').textContent = config.num_ciclos;
        
        resetTimer();
    } catch (error) {
        console.error('Erro ao carregar configuração do Pomodoro:', error);
    }
}

async function savePomodoroConfig() {
    const config = {
        tempo_estudo: parseInt(document.getElementById('tempo-estudo').value),
        tempo_descanso: parseInt(document.getElementById('tempo-descanso').value),
        num_ciclos: parseInt(document.getElementById('num-ciclos').value)
    };
    
    try {
        await apiRequest('/pomodoro/config', {
            method: 'POST',
            body: JSON.stringify(config)
        });
        
        timerState.studyTime = config.tempo_estudo;
        timerState.breakTime = config.tempo_descanso;
        timerState.totalCycles = config.num_ciclos;
        
        document.getElementById('total-cycles').textContent = config.num_ciclos;
        
        resetTimer();
        showNotification('Configuração salva!', 'success');
    } catch (error) {
        console.error('Erro ao salvar configuração:', error);
    }
}

function startTimer() {
    if (timerState.isPaused) {
        timerState.isPaused = false;
    } else {
        timerState.currentTime = timerState.isStudyTime ? 
            timerState.studyTime * 60 : timerState.breakTime * 60;
    }
    
    timerState.isRunning = true;
    
    document.getElementById('start-timer').style.display = 'none';
    document.getElementById('pause-timer').style.display = 'inline-flex';
    
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    timerState.isRunning = false;
    timerState.isPaused = true;
    
    clearInterval(timerInterval);
    
    document.getElementById('start-timer').style.display = 'inline-flex';
    document.getElementById('pause-timer').style.display = 'none';
}

function resetTimer() {
    timerState.isRunning = false;
    timerState.isPaused = false;
    timerState.isStudyTime = true;
    timerState.currentCycle = 1;
    timerState.currentTime = timerState.studyTime * 60;
    
    clearInterval(timerInterval);
    
    document.getElementById('start-timer').style.display = 'inline-flex';
    document.getElementById('pause-timer').style.display = 'none';
    document.getElementById('current-cycle').textContent = timerState.currentCycle;
    
    updateTimerDisplay();
}

function updateTimer() {
    if (timerState.currentTime <= 0) {
        // Timer acabou
        playNotificationSound();
        
        if (timerState.isStudyTime) {
            // Acabou o tempo de estudo, começar descanso
            timerState.isStudyTime = false;
            timerState.currentTime = timerState.breakTime * 60;
            showNotification('Tempo de descanso!', 'info');
        } else {
            // Acabou o descanso
            timerState.currentCycle++;
            
            if (timerState.currentCycle > timerState.totalCycles) {
                // Todos os ciclos completados
                resetTimer();
                showNotification('Parabéns! Você completou todos os ciclos!', 'success');
                return;
            }
            
            // Próximo ciclo
            timerState.isStudyTime = true;
            timerState.currentTime = timerState.studyTime * 60;
            document.getElementById('current-cycle').textContent = timerState.currentCycle;
            showNotification('Próximo ciclo de estudo!', 'info');
        }
    } else {
        timerState.currentTime--;
    }
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerState.currentTime / 60);
    const seconds = timerState.currentTime % 60;
    
    document.getElementById('timer-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('timer-seconds').textContent = seconds.toString().padStart(2, '0');
    
    const label = timerState.isStudyTime ? 'Tempo de Estudo' : 'Tempo de Descanso';
    document.getElementById('timer-label').textContent = label;
    
    // Adicionar efeito visual quando o tempo está acabando
    const timerCircle = document.querySelector('.timer-circle');
    if (timerState.currentTime <= 10 && timerState.isRunning) {
        timerCircle.classList.add('pulse');
    } else {
        timerCircle.classList.remove('pulse');
    }
}

function playNotificationSound() {
    // Criar um beep simples usando Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Não foi possível reproduzir o som de notificação');
    }
}

// Notificações
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adicionar estilos de animação para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

