
CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS prioridades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME,
    concluida BOOLEAN DEFAULT 0,
    categoria_id INTEGER,
    prioridade_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (prioridade_id) REFERENCES prioridades(id)
);

CREATE TABLE IF NOT EXISTS configuracoes_pomodoro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tempo_estudo INTEGER NOT NULL,
    tempo_descanso INTEGER NOT NULL,
    num_ciclos INTEGER NOT NULL
);

INSERT OR IGNORE INTO prioridades (nome) VALUES ('Baixa');
INSERT OR IGNORE INTO prioridades (nome) VALUES ('Média');
INSERT OR IGNORE INTO prioridades (nome) VALUES ('Alta');

INSERT OR IGNORE INTO categorias (nome) VALUES ('Matemática');
INSERT OR IGNORE INTO categorias (nome) VALUES ('Português');
INSERT OR IGNORE INTO categorias (nome) VALUES ('História');
INSERT OR IGNORE INTO categorias (nome) VALUES ('Geografia');
INSERT OR IGNORE INTO categorias (nome) VALUES ('Física');
INSERT OR IGNORE INTO categorias (nome) VALUES ('Química');
INSERT OR IGNORE INTO categorias (nome) VALUES ('Biologia');
INSERT OR IGNORE INTO categorias (nome) VALUES ('Redação');



