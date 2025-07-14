from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Categoria(db.Model):
    __tablename__ = 'categorias'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    
    # Relacionamento com tarefas
    tarefas = db.relationship('Tarefa', backref='categoria', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome
        }

class Prioridade(db.Model):
    __tablename__ = 'prioridades'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False, unique=True)
    
    # Relacionamento com tarefas
    tarefas = db.relationship('Tarefa', backref='prioridade', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome
        }

class Tarefa(db.Model):
    __tablename__ = 'tarefas'
    
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_conclusao = db.Column(db.DateTime)
    concluida = db.Column(db.Boolean, default=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'))
    prioridade_id = db.Column(db.Integer, db.ForeignKey('prioridades.id'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'data_criacao': self.data_criacao.isoformat() if self.data_criacao else None,
            'data_conclusao': self.data_conclusao.isoformat() if self.data_conclusao else None,
            'concluida': self.concluida,
            'categoria_id': self.categoria_id,
            'categoria_nome': self.categoria.nome if self.categoria else None,
            'prioridade_id': self.prioridade_id,
            'prioridade_nome': self.prioridade.nome if self.prioridade else None
        }

class ConfiguracaoPomodoro(db.Model):
    __tablename__ = 'configuracoes_pomodoro'
    
    id = db.Column(db.Integer, primary_key=True)
    tempo_estudo = db.Column(db.Integer, nullable=False)  # em minutos
    tempo_descanso = db.Column(db.Integer, nullable=False)  # em minutos
    num_ciclos = db.Column(db.Integer, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'tempo_estudo': self.tempo_estudo,
            'tempo_descanso': self.tempo_descanso,
            'num_ciclos': self.num_ciclos
        }

