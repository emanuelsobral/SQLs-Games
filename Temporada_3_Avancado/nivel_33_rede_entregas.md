---
## 🐾 Nível 33: A Rede de Entregas
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
O Detetive precisa reconstruir a cadeia completa: quem rouba, quem entrega e quem recebe. Três tabelas (ladrões, entregadores, receptores) precisam ser cruzadas simultaneamente para ver o fluxo completo de sachês.

**🎬 Introdução:**
*"O sachê sai do petshop, passa pelo ladrão, vai ao entregador e chega ao receptor. Três etapas, três tabelas. Preciso cruzar TUDO numa única consulta."*

---

**🔍 Conceito SQL deste nível: Múltiplos JOINs (3+ tabelas)**

Você pode encadear vários JOINs para cruzar 3 ou mais tabelas:

```sql
SELECT a.col, b.col, c.col
FROM tabela_a a
INNER JOIN tabela_b b ON a.chave = b.chave_a
INNER JOIN tabela_c c ON b.chave = c.chave_b;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS operacoes_roubo;
DROP TABLE IF EXISTS operacoes_entrega;
DROP TABLE IF EXISTS pontos_recebimento;

CREATE TABLE operacoes_roubo (
    id_operacao TEXT PRIMARY KEY,
    ladrao TEXT,
    origem TEXT,
    sabor TEXT,
    quantidade INTEGER,
    data TEXT
);

INSERT INTO operacoes_roubo VALUES ('OP-001', 'Mingau', 'Petshop', 'Salmão', 3, '2024-04-20');
INSERT INTO operacoes_roubo VALUES ('OP-002', 'Nestor', 'Armário Dona Clotilde', 'Salmão', 2, '2024-04-20');
INSERT INTO operacoes_roubo VALUES ('OP-003', 'Mingau', 'Despensa Detetive', 'Atum', 1, '2024-04-21');
INSERT INTO operacoes_roubo VALUES ('OP-004', 'Mingau', 'Petshop', 'Salmão', 4, '2024-04-22');

CREATE TABLE operacoes_entrega (
    id INTEGER PRIMARY KEY,
    id_operacao TEXT,
    entregador TEXT,
    ponto_intermediario TEXT,
    destino_codigo TEXT,
    horario TEXT
);

INSERT INTO operacoes_entrega VALUES (1, 'OP-001', 'Foguete', 'Telhado Dona Clotilde', 'DEST-A', '00:30');
INSERT INTO operacoes_entrega VALUES (2, 'OP-002', 'Foguete', 'Telhado Dona Clotilde', 'DEST-A', '01:00');
INSERT INTO operacoes_entrega VALUES (3, 'OP-003', 'Foguete', 'Telhado Dona Clotilde', 'DEST-B', '00:45');
INSERT INTO operacoes_entrega VALUES (4, 'OP-004', 'Foguete', 'Petshop direto', 'DEST-A', '23:30');

CREATE TABLE pontos_recebimento (
    codigo TEXT PRIMARY KEY,
    nome_local TEXT,
    responsavel TEXT,
    tipo TEXT
);

INSERT INTO pontos_recebimento VALUES ('DEST-A', 'Galpão abandonado norte', 'Desconhecido', 'Depósito principal');
INSERT INTO pontos_recebimento VALUES ('DEST-B', 'Casinha do parque', 'Desconhecido', 'Depósito secundário');
INSERT INTO pontos_recebimento VALUES ('DEST-C', 'Porão casa abandonada', NULL, 'Inativo');
```

---

**🎯 Missão:**
Cruze as 3 tabelas para reconstruir o fluxo completo: **Ladrão → Entregador → Destino final** com todos os detalhes.

---

**✅ Script de Solução:**
```sql
SELECT 
    r.id_operacao,
    r.ladrao,
    r.origem AS roubado_de,
    r.sabor,
    r.quantidade,
    e.entregador,
    e.ponto_intermediario,
    p.nome_local AS destino_final,
    p.tipo
FROM operacoes_roubo r
INNER JOIN operacoes_entrega e ON r.id_operacao = e.id_operacao
INNER JOIN pontos_recebimento p ON e.destino_codigo = p.codigo
ORDER BY r.data;
```

**📋 Resultado:**

| id_operacao | ladrao | roubado_de | sabor | quantidade | entregador | ponto_intermediario | destino_final | tipo |
|-------------|--------|-----------|-------|-----------|------------|---------------------|---------------|------|
| OP-001 | Mingau | Petshop | Salmão | 3 | Foguete | Telhado Dona Clotilde | Galpão abandonado norte | Depósito principal |
| OP-002 | Nestor | Armário Dona Clotilde | Salmão | 2 | Foguete | Telhado Dona Clotilde | Galpão abandonado norte | Depósito principal |
| OP-003 | Mingau | Despensa Detetive | Atum | 1 | Foguete | Telhado Dona Clotilde | Casinha do parque | Depósito secundário |
| OP-004 | Mingau | Petshop | Salmão | 4 | Foguete | Petshop direto | Galpão abandonado norte | Depósito principal |

---

**🔎 Conclusão:**
> O fluxo completo revelado em uma única query! Mingau rouba → Foguete entrega → Galpão ou Casinha recebem. A OP-004 é a mais ousada: Foguete levou direto do petshop, sem passar pelo telhado.
>
> 🐾 **O pipeline está mapeado, Detetive...**
