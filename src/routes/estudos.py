from flask import Blueprint, request, jsonify
from src.models.estudos import db, Categoria, Prioridade, Tarefa, ConfiguracaoPomodoro
from datetime import datetime

estudos_bp = Blueprint('estudos', __name__)

# Rotas para Categorias
@estudos_bp.route('/categorias', methods=['GET'])
def get_categorias():
    categorias = Categoria.query.all()
    return jsonify([categoria.to_dict() for categoria in categorias])

@estudos_bp.route('/categorias', methods=['POST'])
def create_categoria():
    data = request.get_json()
    if not data or 'nome' not in data:
        return jsonify({'error': 'Nome da categoria é obrigatório'}), 400
    
    categoria = Categoria(nome=data['nome'])
    try:
        db.session.add(categoria)
        db.session.commit()
        return jsonify(categoria.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Categoria já existe'}), 400

@estudos_bp.route('/categorias/<int:categoria_id>', methods=['DELETE'])
def delete_categoria(categoria_id):
    categoria = Categoria.query.get_or_404(categoria_id)
    try:
        db.session.delete(categoria)
        db.session.commit()
        return jsonify({'message': 'Categoria deletada com sucesso'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao deletar categoria'}), 400

# Rotas para Prioridades
@estudos_bp.route('/prioridades', methods=['GET'])
def get_prioridades():
    prioridades = Prioridade.query.all()
    return jsonify([prioridade.to_dict() for prioridade in prioridades])

@estudos_bp.route('/prioridades', methods=['POST'])
def create_prioridade():
    data = request.get_json()
    if not data or 'nome' not in data:
        return jsonify({'error': 'Nome da prioridade é obrigatório'}), 400
    
    prioridade = Prioridade(nome=data['nome'])
    try:
        db.session.add(prioridade)
        db.session.commit()
        return jsonify(prioridade.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Prioridade já existe'}), 400

@estudos_bp.route('/prioridades/<int:prioridade_id>', methods=['DELETE'])
def delete_prioridade(prioridade_id):
    prioridade = Prioridade.query.get_or_404(prioridade_id)
    try:
        db.session.delete(prioridade)
        db.session.commit()
        return jsonify({'message': 'Prioridade deletada com sucesso'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao deletar prioridade'}), 400

# Rotas para Tarefas
@estudos_bp.route('/tarefas', methods=['GET'])
def get_tarefas():
    tarefas = Tarefa.query.all()
    return jsonify([tarefa.to_dict() for tarefa in tarefas])

@estudos_bp.route('/tarefas', methods=['POST'])
def create_tarefa():
    data = request.get_json()
    if not data or 'titulo' not in data:
        return jsonify({'error': 'Título da tarefa é obrigatório'}), 400
    
    tarefa = Tarefa(
        titulo=data['titulo'],
        descricao=data.get('descricao', ''),
        categoria_id=data.get('categoria_id'),
        prioridade_id=data.get('prioridade_id')
    )
    
    try:
        db.session.add(tarefa)
        db.session.commit()
        return jsonify(tarefa.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao criar tarefa'}), 400

@estudos_bp.route('/tarefas/<int:tarefa_id>', methods=['PUT'])
def update_tarefa(tarefa_id):
    tarefa = Tarefa.query.get_or_404(tarefa_id)
    data = request.get_json()
    
    if 'titulo' in data:
        tarefa.titulo = data['titulo']
    if 'descricao' in data:
        tarefa.descricao = data['descricao']
    if 'categoria_id' in data:
        tarefa.categoria_id = data['categoria_id']
    if 'prioridade_id' in data:
        tarefa.prioridade_id = data['prioridade_id']
    if 'concluida' in data:
        tarefa.concluida = data['concluida']
        if data['concluida']:
            tarefa.data_conclusao = datetime.utcnow()
        else:
            tarefa.data_conclusao = None
    
    try:
        db.session.commit()
        return jsonify(tarefa.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao atualizar tarefa'}), 400

@estudos_bp.route('/tarefas/<int:tarefa_id>', methods=['DELETE'])
def delete_tarefa(tarefa_id):
    tarefa = Tarefa.query.get_or_404(tarefa_id)
    try:
        db.session.delete(tarefa)
        db.session.commit()
        return jsonify({'message': 'Tarefa deletada com sucesso'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao deletar tarefa'}), 400

# Rotas para Configuração Pomodoro
@estudos_bp.route('/pomodoro/config', methods=['GET'])
def get_config_pomodoro():
    config = ConfiguracaoPomodoro.query.first()
    if config:
        return jsonify(config.to_dict())
    else:
        # Configuração padrão
        return jsonify({
            'tempo_estudo': 25,
            'tempo_descanso': 5,
            'num_ciclos': 4
        })

@estudos_bp.route('/pomodoro/config', methods=['POST'])
def save_config_pomodoro():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Dados de configuração são obrigatórios'}), 400
    
    # Verificar se já existe uma configuração
    config = ConfiguracaoPomodoro.query.first()
    
    if config:
        # Atualizar configuração existente
        config.tempo_estudo = data.get('tempo_estudo', config.tempo_estudo)
        config.tempo_descanso = data.get('tempo_descanso', config.tempo_descanso)
        config.num_ciclos = data.get('num_ciclos', config.num_ciclos)
    else:
        # Criar nova configuração
        config = ConfiguracaoPomodoro(
            tempo_estudo=data.get('tempo_estudo', 25),
            tempo_descanso=data.get('tempo_descanso', 5),
            num_ciclos=data.get('num_ciclos', 4)
        )
        db.session.add(config)
    
    try:
        db.session.commit()
        return jsonify(config.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao salvar configuração'}), 400

# Rota para estatísticas
@estudos_bp.route('/estatisticas', methods=['GET'])
def get_estatisticas():
    total_tarefas = Tarefa.query.count()
    tarefas_concluidas = Tarefa.query.filter_by(concluida=True).count()
    tarefas_pendentes = total_tarefas - tarefas_concluidas
    
    # Tarefas por categoria
    categorias_stats = []
    categorias = Categoria.query.all()
    for categoria in categorias:
        total_cat = Tarefa.query.filter_by(categoria_id=categoria.id).count()
        concluidas_cat = Tarefa.query.filter_by(categoria_id=categoria.id, concluida=True).count()
        categorias_stats.append({
            'categoria': categoria.nome,
            'total': total_cat,
            'concluidas': concluidas_cat,
            'pendentes': total_cat - concluidas_cat
        })
    
    return jsonify({
        'total_tarefas': total_tarefas,
        'tarefas_concluidas': tarefas_concluidas,
        'tarefas_pendentes': tarefas_pendentes,
        'percentual_conclusao': round((tarefas_concluidas / total_tarefas * 100) if total_tarefas > 0 else 0, 2),
        'categorias': categorias_stats
    })

