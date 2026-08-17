---
## 🐾 Nível 30: 🏆 A Descoberta do Depósito Secreto
**Nível de Dificuldade:** Intermediário — **BOSS DE FIM DE TEMPORADA!**

**📜 Briefing:**
Todas as pistas convergem: o telhado da Dona Clotilde é o quartel-general, sachês somem do petshop e das casas, Foguete leva cargas para fora do bairro pela rota norte. Mas onde é o **depósito secreto**? O Detetive tem acesso a todas as tabelas coletadas na Temporada 2. Cruzando reuniões, rotas, transações e territórios, ele pode finalmente localizar o esconderijo.

**🎬 Introdução:**
*O Detetive Bigode está na garagem com um quadro cheio de fotos, fios vermelhos conectando nomes, linhas do tempo e um mapa do bairro. "Tudo conecta ao telhado da Dona Clotilde como ponto de DISTRIBUIÇÃO. Mas Foguete leva sachês para FORA do bairro. Tem que haver um depósito intermediário. E eu tenho os dados para encontrá-lo."*

*Ele cria o banco de dados completo da operação. "Preciso de JOINs, GROUP BY, HAVING, DISTINCT, subqueries — tudo junto. Este é o meu maior caso até agora."*

---

**🔍 Conceito SQL deste nível: REVISÃO GERAL — BOSS FIGHT T2! 🏆**

Todos os conceitos das Temporadas 1 e 2:

| Temporada | Conceitos |
|-----------|-----------|
| T1 | SELECT, WHERE, ORDER BY, LIKE, AND/OR, BETWEEN/IN, COUNT/SUM/AVG |
| T2 | INNER JOIN, LEFT JOIN, GROUP BY, HAVING, DISTINCT, AS, Subqueries |

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 30: 🏆 A Descoberta do Depósito Secreto
-- BOSS FIGHT — FIM DA TEMPORADA 2
-- =============================================

DROP TABLE IF EXISTS locais_suspeitos;
DROP TABLE IF EXISTS entregas_foguete;
DROP TABLE IF EXISTS membros_rede;
DROP TABLE IF EXISTS inventario_saches_encontrados;

-- Tabela 1: Locais suspeitos investigados
CREATE TABLE locais_suspeitos (
    id INTEGER PRIMARY KEY,
    local_nome TEXT,
    endereco TEXT,
    tipo TEXT,
    vezes_mencionado INTEGER,
    tem_acesso_gatos TEXT
);

INSERT INTO locais_suspeitos VALUES (1, 'Telhado Dona Clotilde', 'Rua das Acácias, 38', 'Ponto de reunião', 15, 'Sim');
INSERT INTO locais_suspeitos VALUES (2, 'Petshop Patinhas de Ouro', 'Rua dos Ipês, 15', 'Fonte de sachês', 8, 'Sim');
INSERT INTO locais_suspeitos VALUES (3, 'Galpão abandonado norte', 'Estrada do Morro, s/n', 'Desconhecido', 0, 'Sim');
INSERT INTO locais_suspeitos VALUES (4, 'Casinha do parque', 'Praça Central', 'Área pública', 2, 'Sim');
INSERT INTO locais_suspeitos VALUES (5, 'Porão casa abandonada', 'Rua das Acácias, 55', 'Abandonado', 1, 'Sim');
INSERT INTO locais_suspeitos VALUES (6, 'Garagem Seu Bartolomeu', 'Rua dos Ipês, 8', 'Particular', 3, 'Não');

-- Tabela 2: Todas as entregas do Foguete (destinos rastreados)
CREATE TABLE entregas_foguete (
    id INTEGER PRIMARY KEY,
    data TEXT,
    horario TEXT,
    origem TEXT,
    destino TEXT,
    carga TEXT,
    quantidade INTEGER
);

INSERT INTO entregas_foguete VALUES (1,  '2024-04-10', '00:00', 'Telhado Dona Clotilde', 'Galpão abandonado norte', 'Sachês salmão', 3);
INSERT INTO entregas_foguete VALUES (2,  '2024-04-11', '00:30', 'Telhado Dona Clotilde', 'Galpão abandonado norte', 'Sachês salmão', 2);
INSERT INTO entregas_foguete VALUES (3,  '2024-04-12', '01:00', 'Telhado Dona Clotilde', 'Galpão abandonado norte', 'Sachês atum', 2);
INSERT INTO entregas_foguete VALUES (4,  '2024-04-13', '23:30', 'Petshop', 'Galpão abandonado norte', 'Sachês salmão', 4);
INSERT INTO entregas_foguete VALUES (5,  '2024-04-14', '00:15', 'Telhado Dona Clotilde', 'Casinha do parque', 'Sachês frango', 1);
INSERT INTO entregas_foguete VALUES (6,  '2024-04-15', '23:45', 'Telhado Dona Clotilde', 'Galpão abandonado norte', 'Sachês salmão', 3);
INSERT INTO entregas_foguete VALUES (7,  '2024-04-16', '00:45', 'Petshop', 'Galpão abandonado norte', 'Sachês salmão', 2);
INSERT INTO entregas_foguete VALUES (8,  '2024-04-17', '01:30', 'Telhado Dona Clotilde', 'Galpão abandonado norte', 'Sachês atum', 1);

-- Tabela 3: Membros confirmados da rede
CREATE TABLE membros_rede (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    funcao TEXT,
    nivel_hierarquia INTEGER,
    recrutado_por TEXT
);

INSERT INTO membros_rede VALUES (1, 'Capitão Frajola', 'Líder', 1, NULL);
INSERT INTO membros_rede VALUES (2, 'Mingau', 'Ladrão principal', 2, 'Capitão Frajola');
INSERT INTO membros_rede VALUES (3, 'Foguete', 'Entregador', 2, 'Capitão Frajola');
INSERT INTO membros_rede VALUES (4, 'General Bigodão', 'Sentinela', 2, 'Capitão Frajola');
INSERT INTO membros_rede VALUES (5, 'Nestor', 'Infiltrado', 3, 'Mingau');
INSERT INTO membros_rede VALUES (6, 'Princesa', 'Supervisora', 3, 'Capitão Frajola');
INSERT INTO membros_rede VALUES (7, 'Duquesa', 'Facilitadora petshop', 3, 'Mingau');
INSERT INTO membros_rede VALUES (8, 'Bolinha', 'Colaborador involuntário', 4, 'Mingau');

-- Tabela 4: Sachês encontrados no galpão (depois de uma busca)
CREATE TABLE inventario_saches_encontrados (
    id INTEGER PRIMARY KEY,
    sabor TEXT,
    quantidade INTEGER,
    estado TEXT,
    data_estimada_chegada TEXT
);

INSERT INTO inventario_saches_encontrados VALUES (1, 'Salmão', 14, 'Intacto', '2024-04-10 a 2024-04-16');
INSERT INTO inventario_saches_encontrados VALUES (2, 'Atum', 3, 'Intacto', '2024-04-12 a 2024-04-17');
INSERT INTO inventario_saches_encontrados VALUES (3, 'Frango', 1, 'Aberto (comido parcialmente)', '2024-04-14');
INSERT INTO inventario_saches_encontrados VALUES (4, 'Salmão', 2, 'Embalagem do petshop', '2024-04-13');
```

---

**🎯 Missão — BOSS FIGHT! 🏆**

**Desafio 1 — JOIN + GROUP BY:**
Cruze `entregas_foguete` com `locais_suspeitos` para ver qual local recebeu **mais entregas** e a **maior quantidade de sachês**.

**Desafio 2 — HAVING:**
Encontre os destinos que receberam **mais de 5 sachês** no total.

**Desafio 3 — LEFT JOIN:**
Cruze `locais_suspeitos` com `entregas_foguete` para ver quais locais **nunca receberam** entregas (são seguros).

**Desafio 4 — Subquery:**
Encontre o membro da rede cuja `funcao` é a mesma do membro com o nível hierárquico mais baixo (numericamente maior).

**Desafio 5 — SUM + DISTINCT + AS:**
Calcule o **total de sachês entregues** ao galpão abandonado, com alias bonito.

---

**✅ Scripts de Solução:**
```sql
-- DESAFIO 1: Local que mais recebeu entregas
SELECT 
    e.destino,
    l.tipo,
    COUNT(*) AS total_entregas,
    SUM(e.quantidade) AS total_saches
FROM entregas_foguete e
INNER JOIN locais_suspeitos l ON e.destino = l.local_nome
GROUP BY e.destino
ORDER BY total_saches DESC;

-- DESAFIO 2: Destinos com mais de 5 sachês
SELECT destino, SUM(quantidade) AS total
FROM entregas_foguete
GROUP BY destino
HAVING SUM(quantidade) > 5;

-- DESAFIO 3: Locais seguros (sem entregas)
SELECT l.local_nome, l.tipo
FROM locais_suspeitos l
LEFT JOIN entregas_foguete e ON l.local_nome = e.destino
WHERE e.destino IS NULL;

-- DESAFIO 4: Membro de nível mais baixo
SELECT nome, funcao, nivel_hierarquia
FROM membros_rede
WHERE nivel_hierarquia = (SELECT MAX(nivel_hierarquia) FROM membros_rede);

-- DESAFIO 5: Total de sachês no galpão
SELECT 
    SUM(quantidade) AS total_saches_depositados,
    COUNT(DISTINCT carga) AS variedade_sabores
FROM entregas_foguete
WHERE destino = 'Galpão abandonado norte';
```

**📋 Resultados Chave:**

**Desafio 1:**
| destino | tipo | total_entregas | total_saches |
|---------|------|---------------|-------------|
| Galpão abandonado norte | Desconhecido | 7 | 17 |
| Casinha do parque | Área pública | 1 | 1 |

**Desafio 2:** Galpão abandonado norte — 17 sachês!

**Desafio 3 (Locais seguros):**
| local_nome | tipo |
|-----------|------|
| Porão casa abandonada | Abandonado |
| Garagem Seu Bartolomeu | Particular |

**Desafio 4:** Bolinha — "Colaborador involuntário", nível 4

---

**🔎 Conclusão — FIM DA TEMPORADA 2:**
> ## 🏆 O DEPÓSITO SECRETO FOI ENCONTRADO!
>
> **O Galpão Abandonado Norte** é o depósito secreto! 🏚️
>
> **As provas:**
> - **7 entregas** registradas para lá, totalizando **17 sachês**
> - **Inventário encontrado:** 14 salmão + 3 atum + 1 frango + 2 salmão do petshop = **20 sachês** estocados!
> - Foguete fez entregas de **duas origens**: Telhado Dona Clotilde (centro de distribuição) e Petshop (direto da fonte)
>
> **A hierarquia completa:**
> 1. **Capitão Frajola** — Líder (recrutou 4 membros diretamente)
> 2. **Mingau, Foguete, General Bigodão** — Nível 2 (braços operacionais)
> 3. **Nestor, Princesa, Duquesa** — Nível 3 (infiltrados e facilitadores)
> 4. **Bolinha** — Nível 4 ("colaborador involuntário" — coitado)
>
> *O Detetive Bigode está na porta do galpão abandonado. Dentro, prateleiras improvisadas com sachês empilhados. No chão, marcas de pata em todas as direções. "Encontrei o depósito. Mas POR QUE estocar sachês? Gatos comem na hora. A menos que..."*
>
> *Ele congela. "A menos que eles estejam VENDENDO. Ou TROCANDO. Com alguém de fora do bairro."*
>
> ---
> ### 🎬 PREVIEW DA TEMPORADA 3:
> *"O depósito foi encontrado, mas o esquema é maior. Os sachês não são para consumo — são MOEDA DE TROCA. O Capitão Frajola está negociando com gatos de outros bairros. E quem é o verdadeiro CHEFÃO por trás de tudo?"*
>
> **Na Temporada 3 — O Grande Esquema**, você vai usar subqueries correlacionadas, múltiplos JOINs, CASE WHEN, UNION, EXISTS e CTEs para desmantelar a operação inteira!
>
> 🐾 **O depósito é só a ponta do iceberg, Detetive. O Grande Esquema aguarda!**
