---
## 🐾 Nível 45: 🏆🏆🏆 O Grande Esquema Revelado
**Nível de Dificuldade:** Avançado — **BOSS FINAL DO JOGO!**

**📜 Briefing:**
Este é o momento. Após 44 níveis de investigação, o Detetive Bigode tem todos os dados para desmantelar a rede e apresentar o caso completo à prefeitura. Neste nível final, ele deve criar o **Relatório Definitivo** — uma megaquery que cruza TODAS as evidências acumuladas para provar: (1) quem é o líder, (2) como a operação funciona, (3) quanto foi roubado e (4) quem são todos os envolvidos. Vai precisar de TUDO que aprendeu: CTEs, múltiplos JOINs, CASE WHEN, subqueries, UNION, COALESCE, GROUP BY, HAVING e mais.

**🎬 Introdução:**
*O Detetive Bigode está de pé diante do Salão da Associação de Moradores. A plateia está lotada: Dona Clotilde (nervosa), Seu Agenor (triunfante), Dona Jurema (impaciente), Dona Margarete (preocupada), Pedrinho (segurando Thor na guia), Seu Bartolomeu (curioso). Até o delegado de verdade veio — embora não acredite muito em "crimes de gatos".*

*O Detetive conecta o projetor ao notebook. "Senhoras e senhores, após semanas de investigação usando análise de dados, tenho provas irrefutáveis de que existe uma REDE ORGANIZADA DE DESVIO DE SACHÊS operando neste bairro." A plateia murmura.*

*"O líder é um gato de rua conhecido como Capitão Frajola. A operação envolve 10 membros em 4 níveis hierárquicos. O depósito fica no Galpão Abandonado da Estrada do Morro. E o total desviado ultrapassa..." ele faz uma pausa dramática. "...R$ 500,00 em sachês premium."*

*Dona Clotilde desmaia.*

*"Vou provar TUDO isso agora. Com SQL."*

---

**🔍 Conceito SQL deste nível: TODOS OS CONCEITOS — BOSS FINAL! 🏆🏆🏆**

| Temporada | Conceitos Utilizados |
|-----------|---------------------|
| T1 | SELECT, WHERE, ORDER BY, LIKE, AND/OR, BETWEEN/IN, COUNT/SUM/AVG/MIN/MAX |
| T2 | INNER JOIN, LEFT JOIN, GROUP BY, HAVING, DISTINCT, AS, Subqueries |
| T3 | Subqueries correlacionadas, Múltiplos JOINs, CASE WHEN, UNION, EXISTS/NOT EXISTS, COALESCE, CTEs |

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 45: 🏆🏆🏆 O GRANDE ESQUEMA REVELADO
-- BOSS FINAL — FIM DO JOGO
-- Rode TUDO abaixo antes de começar!
-- =============================================

-- === TABELA 1: Cadastro completo de membros ===
DROP TABLE IF EXISTS rede_completa;

CREATE TABLE rede_completa (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    apelido TEXT,
    especie TEXT,
    dono TEXT,
    funcao TEXT,
    nivel_hierarquia INTEGER,
    recrutado_por TEXT,
    data_entrada TEXT,
    status TEXT
);

INSERT INTO rede_completa VALUES (1,  'Capitão Frajola', 'O Chefão', 'Gato', NULL, 'Líder supremo', 1, NULL, '2024-01-01', 'Ativo');
INSERT INTO rede_completa VALUES (2,  'Mingau', 'Sombra Silenciosa', 'Gato', NULL, 'Chefe de operações', 2, 'Capitão Frajola', '2024-01-15', 'Ativo');
INSERT INTO rede_completa VALUES (3,  'Foguete', 'Flash', 'Gato', NULL, 'Chefe de logística', 2, 'Capitão Frajola', '2024-02-01', 'Ativo');
INSERT INTO rede_completa VALUES (4,  'General Bigodão', 'O General', 'Gato', NULL, 'Chefe de segurança', 2, 'Capitão Frajola', '2024-01-20', 'Ativo');
INSERT INTO rede_completa VALUES (5,  'Nestor', NULL, 'Gato', 'Dona Clotilde', 'Agente infiltrado', 3, 'Mingau', '2024-02-15', 'Ativo');
INSERT INTO rede_completa VALUES (6,  'Princesa', 'A Rainha', 'Gato', 'Dona Clotilde', 'Supervisora de campo', 3, 'Capitão Frajola', '2024-02-10', 'Ativo');
INSERT INTO rede_completa VALUES (7,  'Duquesa', NULL, 'Gato', 'Dona Margarete', 'Facilitadora petshop', 3, 'Mingau', '2024-03-01', 'Ativo');
INSERT INTO rede_completa VALUES (8,  'Bolinha', 'Barrigudo', 'Gato', 'Detetive Bigode', 'Colaborador relutante', 4, 'Mingau', '2024-03-15', 'Relutante');
INSERT INTO rede_completa VALUES (9,  'Sombra', NULL, 'Gato', NULL, 'Olheiro', 4, 'General Bigodão', '2024-04-01', 'Ativo');
INSERT INTO rede_completa VALUES (10, 'Trovão', NULL, 'Gato', NULL, 'Olheiro', 4, 'General Bigodão', '2024-04-03', 'Ativo');
INSERT INTO rede_completa VALUES (11, 'Fantasminha', NULL, 'Gato', NULL, 'Olheiro', 4, 'General Bigodão', '2024-04-05', 'Ativo');

-- === TABELA 2: Todos os roubos registrados ===
DROP TABLE IF EXISTS todos_roubos;

CREATE TABLE todos_roubos (
    id INTEGER PRIMARY KEY,
    data TEXT,
    ladrao TEXT,
    local_roubo TEXT,
    sabor TEXT,
    quantidade INTEGER,
    valor_unitario REAL
);

INSERT INTO todos_roubos VALUES (1,  '2024-03-18', 'Mingau', 'Despensa Detetive', 'Salmão', 2, 8.50);
INSERT INTO todos_roubos VALUES (2,  '2024-03-20', 'Mingau', 'Despensa Detetive', 'Salmão', 1, 8.50);
INSERT INTO todos_roubos VALUES (3,  '2024-03-22', 'Capitão Frajola', 'Despensa Detetive', 'Atum', 2, 7.90);
INSERT INTO todos_roubos VALUES (4,  '2024-03-22', 'Mingau', 'Petshop', 'Salmão', 3, 8.50);
INSERT INTO todos_roubos VALUES (5,  '2024-03-25', 'Nestor', 'Armário Dona Clotilde', 'Salmão', 2, 8.50);
INSERT INTO todos_roubos VALUES (6,  '2024-04-01', 'Mingau', 'Petshop', 'Salmão', 4, 8.50);
INSERT INTO todos_roubos VALUES (7,  '2024-04-05', 'Mingau', 'Cozinha Pedrinho', 'Salmão', 1, 8.50);
INSERT INTO todos_roubos VALUES (8,  '2024-04-10', 'Mingau', 'Petshop', 'Salmão', 3, 8.50);
INSERT INTO todos_roubos VALUES (9,  '2024-04-10', 'Nestor', 'Armário Dona Clotilde', 'Atum', 1, 7.90);
INSERT INTO todos_roubos VALUES (10, '2024-04-15', 'Capitão Frajola', 'Petshop', 'Salmão', 2, 8.50);
INSERT INTO todos_roubos VALUES (11, '2024-04-20', 'Mingau', 'Petshop', 'Salmão', 4, 8.50);
INSERT INTO todos_roubos VALUES (12, '2024-04-20', 'Nestor', 'Armário Dona Clotilde', 'Salmão', 2, 8.50);
INSERT INTO todos_roubos VALUES (13, '2024-04-25', 'Mingau', 'Petshop', 'Salmão', 3, 8.50);
INSERT INTO todos_roubos VALUES (14, '2024-04-25', 'Nestor', 'Casa Dona Clotilde', 'Atum', 2, 7.90);

-- === TABELA 3: Todas as entregas ===
DROP TABLE IF EXISTS todas_entregas;

CREATE TABLE todas_entregas (
    id INTEGER PRIMARY KEY,
    data TEXT,
    entregador TEXT,
    origem TEXT,
    destino TEXT,
    quantidade INTEGER
);

INSERT INTO todas_entregas VALUES (1,  '2024-03-22', 'Foguete', 'Telhado Dona Clotilde', 'Galpão abandonado', 5);
INSERT INTO todas_entregas VALUES (2,  '2024-04-01', 'Foguete', 'Telhado Dona Clotilde', 'Galpão abandonado', 4);
INSERT INTO todas_entregas VALUES (3,  '2024-04-10', 'Foguete', 'Telhado Dona Clotilde', 'Galpão abandonado', 4);
INSERT INTO todas_entregas VALUES (4,  '2024-04-15', 'Foguete', 'Petshop', 'Galpão abandonado', 2);
INSERT INTO todas_entregas VALUES (5,  '2024-04-20', 'Foguete', 'Telhado Dona Clotilde', 'Galpão abandonado', 6);
INSERT INTO todas_entregas VALUES (6,  '2024-04-25', 'Foguete', 'Telhado Dona Clotilde', 'Galpão abandonado', 5);
INSERT INTO todas_entregas VALUES (7,  '2024-04-25', 'Foguete', 'Telhado Dona Clotilde', 'Casinha do parque', 2);

-- === TABELA 4: Locais de operação ===
DROP TABLE IF EXISTS locais_operacao;

CREATE TABLE locais_operacao (
    id INTEGER PRIMARY KEY,
    nome_local TEXT,
    tipo TEXT,
    controlado_por TEXT
);

INSERT INTO locais_operacao VALUES (1, 'Telhado Dona Clotilde', 'Quartel-general', 'Capitão Frajola');
INSERT INTO locais_operacao VALUES (2, 'Petshop Patinhas de Ouro', 'Fonte primária', 'Duquesa');
INSERT INTO locais_operacao VALUES (3, 'Galpão abandonado', 'Depósito principal', 'Foguete');
INSERT INTO locais_operacao VALUES (4, 'Casinha do parque', 'Depósito secundário', 'Sombra');
INSERT INTO locais_operacao VALUES (5, 'Muro norte', 'Rota de fuga', 'Foguete');

-- === TABELA 5: Vítimas e prejuízos ===
DROP TABLE IF EXISTS vitimas;

CREATE TABLE vitimas (
    id INTEGER PRIMARY KEY,
    nome_vitima TEXT,
    tipo_prejuizo TEXT,
    valor_total REAL,
    numero_incidentes INTEGER
);

INSERT INTO vitimas VALUES (1, 'Dona Margarete (Petshop)', 'Sachês roubados', 161.50, 6);
INSERT INTO vitimas VALUES (2, 'Detetive Bigode', 'Sachês roubados', 42.50, 3);
INSERT INTO vitimas VALUES (3, 'Dona Clotilde', 'Sachês + Vaso', 182.50, 5);
INSERT INTO vitimas VALUES (4, 'Pedrinho', 'Sachê + Almofada', 88.50, 2);
INSERT INTO vitimas VALUES (5, 'Dona Jurema', 'Jardim + Gnomo', 219.00, 2);
INSERT INTO vitimas VALUES (6, 'Seu Agenor', 'Jardim + Objetos', 125.00, 3);
INSERT INTO vitimas VALUES (7, 'Seu Bartolomeu', 'Camisa havaiana', 55.00, 1);
```

---

**🎯 Missão — BOSS FINAL! 🏆🏆🏆**

Crie o **Relatório Definitivo** com 6 desafios que usam TUDO que você aprendeu:

---

### Desafio 1 — CTE + Subquery correlacionada: O Organograma
*Crie o organograma completo da rede, mostrando cada membro, sua função, quem o recrutou e quantos subordinados diretos ele tem.*

### Desafio 2 — Múltiplos JOINs + GROUP BY + HAVING: Os Maiores Ladrões
*Cruze a tabela de roubos com a rede para ver a função de cada ladrão. Agrupe por ladrão e mostre apenas os que roubaram mais de 5 sachês no total.*

### Desafio 3 — CASE WHEN + COALESCE + Aliases: O Dossiê Classificado
*Para cada membro, classifique o nível de risco (Crítico/Alto/Médio/Baixo) baseado na hierarquia e função. Substitua NULLs.*

### Desafio 4 — UNION + ORDER BY: Linha do Tempo Unificada
*Una roubos e entregas em uma única linha do tempo cronológica, indicando o tipo de evento.*

### Desafio 5 — SUM + JOIN: O Prejuízo Total
*Calcule o valor total roubado por sabor e o prejuízo total por vítima.*

### Desafio 6 — CTE + EXISTS + JOIN: A Prova Final
*Identifique TODOS os membros que participaram de pelo menos um roubo OU uma entrega — a prova definitiva de envolvimento.*

---

**✅ Scripts de Solução:**
```sql
-- ════════════════════════════════════════════
-- DESAFIO 1: O ORGANOGRAMA (CTE + Subquery correlacionada)
-- ════════════════════════════════════════════
WITH organograma AS (
    SELECT 
        r.nome,
        COALESCE(r.apelido, '-') AS apelido,
        r.funcao,
        r.nivel_hierarquia,
        COALESCE(r.recrutado_por, '(FUNDADOR)') AS recrutador,
        COALESCE(r.dono, 'Sem dono') AS dono,
        (SELECT COUNT(*) FROM rede_completa r2 WHERE r2.recrutado_por = r.nome) AS subordinados_diretos
    FROM rede_completa r
)
SELECT * FROM organograma ORDER BY nivel_hierarquia, subordinados_diretos DESC;

-- ════════════════════════════════════════════
-- DESAFIO 2: OS MAIORES LADRÕES (JOIN + GROUP BY + HAVING)
-- ════════════════════════════════════════════
SELECT 
    t.ladrao,
    r.funcao,
    COUNT(*) AS total_operacoes,
    SUM(t.quantidade) AS total_saches_roubados,
    SUM(t.quantidade * t.valor_unitario) AS valor_total_roubado
FROM todos_roubos t
INNER JOIN rede_completa r ON t.ladrao = r.nome
GROUP BY t.ladrao, r.funcao
HAVING SUM(t.quantidade) > 5
ORDER BY total_saches_roubados DESC;

-- ════════════════════════════════════════════
-- DESAFIO 3: O DOSSIÊ CLASSIFICADO (CASE WHEN + COALESCE)
-- ════════════════════════════════════════════
SELECT 
    nome,
    COALESCE(apelido, 'Sem codinome') AS codinome,
    funcao,
    COALESCE(dono, 'Gato de rua') AS responsavel,
    CASE 
        WHEN nivel_hierarquia = 1 THEN '🔴 CRÍTICO — Líder da organização'
        WHEN nivel_hierarquia = 2 THEN '🟠 ALTO — Comando operacional'
        WHEN nivel_hierarquia = 3 AND funcao LIKE '%petshop%' THEN '🟠 ALTO — Acesso privilegiado'
        WHEN nivel_hierarquia = 3 THEN '🟡 MÉDIO — Agente de campo'
        WHEN status = 'Relutante' THEN '🟢 BAIXO — Colaborador involuntário'
        ELSE '🟡 MÉDIO — Recruta'
    END AS classificacao_risco
FROM rede_completa
ORDER BY nivel_hierarquia;

-- ════════════════════════════════════════════
-- DESAFIO 4: LINHA DO TEMPO UNIFICADA (UNION + ORDER BY)
-- ════════════════════════════════════════════
SELECT data, '🔓 ROUBO' AS tipo_evento, ladrao AS agente, local_roubo AS local, quantidade, sabor AS detalhe
FROM todos_roubos
UNION ALL
SELECT data, '📦 ENTREGA' AS tipo_evento, entregador AS agente, destino AS local, quantidade, origem AS detalhe
FROM todas_entregas
ORDER BY data, tipo_evento;

-- ════════════════════════════════════════════
-- DESAFIO 5: O PREJUÍZO TOTAL (SUM + JOIN)
-- ════════════════════════════════════════════

-- 5a. Total por sabor
SELECT 
    sabor,
    SUM(quantidade) AS total_unidades,
    SUM(quantidade * valor_unitario) AS valor_total
FROM todos_roubos
GROUP BY sabor
ORDER BY valor_total DESC;

-- 5b. Total por vítima
SELECT 
    nome_vitima,
    SUM(valor_total) AS prejuizo,
    SUM(numero_incidentes) AS incidentes
FROM vitimas
GROUP BY nome_vitima
ORDER BY prejuizo DESC;

-- 5c. GRANDE TOTAL
SELECT 
    SUM(valor_total) AS prejuizo_total_bairro,
    SUM(numero_incidentes) AS total_incidentes
FROM vitimas;

-- ════════════════════════════════════════════
-- DESAFIO 6: A PROVA FINAL (CTE + EXISTS)
-- ════════════════════════════════════════════
WITH envolvidos_comprovados AS (
    SELECT DISTINCT nome FROM rede_completa r
    WHERE EXISTS (SELECT 1 FROM todos_roubos tr WHERE tr.ladrao = r.nome)
       OR EXISTS (SELECT 1 FROM todas_entregas te WHERE te.entregador = r.nome)
)
SELECT 
    r.nome,
    r.funcao,
    r.nivel_hierarquia,
    COALESCE(r.dono, 'Sem dono') AS responsavel,
    CASE 
        WHEN EXISTS (SELECT 1 FROM todos_roubos tr WHERE tr.ladrao = r.nome) THEN '✅'
        ELSE '❌'
    END AS participou_roubo,
    CASE 
        WHEN EXISTS (SELECT 1 FROM todas_entregas te WHERE te.entregador = r.nome) THEN '✅'
        ELSE '❌'
    END AS participou_entrega
FROM rede_completa r
INNER JOIN envolvidos_comprovados ec ON r.nome = ec.nome
ORDER BY r.nivel_hierarquia;
```

---

**📋 Resultados Chave:**

**Desafio 1 — Organograma:**

| nome | apelido | funcao | nivel_hierarquia | recrutador | subordinados_diretos |
|------|---------|--------|-----------------|------------|---------------------|
| Capitão Frajola | O Chefão | Líder supremo | 1 | (FUNDADOR) | 4 |
| General Bigodão | O General | Chefe de segurança | 2 | Capitão Frajola | 3 |
| Mingau | Sombra Silenciosa | Chefe de operações | 2 | Capitão Frajola | 3 |
| Foguete | Flash | Chefe de logística | 2 | Capitão Frajola | 0 |
| Princesa | A Rainha | Supervisora de campo | 3 | Capitão Frajola | 0 |
| Nestor | - | Agente infiltrado | 3 | Mingau | 0 |
| Duquesa | - | Facilitadora petshop | 3 | Mingau | 0 |
| Bolinha | Barrigudo | Colaborador relutante | 4 | Mingau | 0 |
| Sombra | - | Olheiro | 4 | General Bigodão | 0 |
| Trovão | - | Olheiro | 4 | General Bigodão | 0 |
| Fantasminha | - | Olheiro | 4 | General Bigodão | 0 |

**Desafio 2 — Maiores ladrões (>5 sachês):**

| ladrao | funcao | total_operacoes | total_saches_roubados | valor_total_roubado |
|--------|--------|----------------|----------------------|---------------------|
| Mingau | Chefe de operações | 8 | 21 | 178.50 |
| Nestor | Agente infiltrado | 4 | 7 | 60.70 |

**Desafio 5c — GRANDE TOTAL:**

| prejuizo_total_bairro | total_incidentes |
|----------------------|------------------|
| **R$ 874,00** | **22** |

**Desafio 6 — Prova final:**

| nome | funcao | nivel_hierarquia | responsavel | participou_roubo | participou_entrega |
|------|--------|-----------------|-------------|------------------|--------------------|
| Capitão Frajola | Líder supremo | 1 | Sem dono | ✅ | ❌ |
| Mingau | Chefe de operações | 2 | Sem dono | ✅ | ❌ |
| Foguete | Chefe de logística | 2 | Sem dono | ❌ | ✅ |
| Nestor | Agente infiltrado | 3 | Dona Clotilde | ✅ | ❌ |

---

**🔎 Conclusão — FIM DO JOGO! 🎬🏆**

> ## 🏆🏆🏆 O GRANDE ESQUEMA FOI REVELADO!
>
> **O VEREDICTO FINAL:**
>
> ### 👑 O Chefão: Capitão Frajola
> Gato de rua, sem dono, recrutou 4 membros diretamente. Líder absoluto da **Operação Salmão**. Fundou a rede em janeiro de 2024 e em 4 meses construiu uma organização com 11 membros em 4 níveis.
>
> ### 📊 Os Números do Crime:
> - **11 membros** na rede (4 sem dono, 7 com dono)
> - **35 sachês** roubados diretamente (21 por Mingau + 7 por Nestor + 4 por Capitão + 3 dispersos)
> - **28 sachês** entregues ao galpão por Foguete
> - **R$ 874,00** em prejuízo total para o bairro
> - **22 incidentes** registrados ao longo da operação
> - **6 vítimas** humanas (Dona Margarete sendo a mais afetada)
>
> ### 🗺️ A Estrutura da Operação:
> ```
> CAPITÃO FRAJOLA (Líder)
> ├── MINGAU (Operações) — 21 sachês roubados
> │   ├── NESTOR (Infiltrado na casa da Dona Clotilde)
> │   ├── DUQUESA (Facilitadora — abre o petshop)
> │   └── BOLINHA (Colaborador relutante — vigia noturna)
> ├── FOGUETE (Logística) — 28 sachês transportados
> ├── GENERAL BIGODÃO (Segurança) — coordena olheiros
> │   ├── SOMBRA (Olheiro)
> │   ├── TROVÃO (Olheiro)
> │   └── FANTASMINHA (Olheiro)
> └── PRINCESA (Supervisora — nunca suja as patas)
> ```
>
> *O Detetive Bigode desliga o projetor. O silêncio no salão é ensurdecedor.*
>
> *Dona Clotilde se levanta: "Meu Nestor... minha Princesa... meus próprios gatos..." Seu Agenor bate palmas: "EU DISSE! EU SEMPRE DISSE!" Dona Margarete está ao telefone com a polícia — quer registrar um BO contra um gato. O delegado esfrega os olhos: "Isso é real?"*
>
> *Pedrinho levanta a mão: "E o Thor?" O Detetive sorri: "Thor é inocente no esquema dos sachês. Ele destrói coisas, mas por amor, não por crime organizado."*
>
> *Thor abana o rabo.*
>
> *Bolinha abre um olho do sofá, como quem diz "eu era apenas um colaborador relutante" e volta a dormir.*
>
> *O Detetive Bigode fecha o caderninho SQL pela última vez. "Este caso está encerrado. Mas se eu fosse vocês... eu trancaria os sachês de salmão. Porque gatos SEMPRE encontram um jeito."*
>
> *Lá fora, no telhado da Dona Clotilde, Capitão Frajola observa pela janela. Ele pisca lentamente.*
>
> *No idioma dos gatos, isso pode significar muitas coisas.*
>
> ---
>
> ## 🎬 CRÉDITOS FINAIS
>
> **Detetive de Quintal: Divisão de Casos Bobos**
>
> *Criado com amor, humor e SQL*
>
> **Elenco:**
> - 🔍 Detetive Bigode — Você, jogador!
> - 👑 Capitão Frajola — O Chefão
> - 🥷 Mingau — Sombra Silenciosa
> - 🏃 Foguete — Flash
> - 💂 General Bigodão — O General
> - 🐱 Nestor — O Infiltrado
> - 👸 Princesa — A Rainha
> - 🐱‍👤 Duquesa — A Informante
> - 😴 Bolinha — O Barrigudo
> - 🐕 Thor — O Destruidor (inocente)
> - 🐕 Salsicha — O Informante Canino
> - 🐹 Pipoca — A Vítima Colateral
>
> **Conceitos SQL Aprendidos:** 22 comandos e técnicas
> **Tabelas criadas:** 80+
> **Sachês de salmão perdidos:** Incontáveis
>
> ---
>
> ### 🐾 *"Em cada tigela vazia, uma pista. Em cada sofá rasgado, um mistério. Em cada sachê desaparecido... uma conspiração."*
>
> ### **FIM** 🐾
