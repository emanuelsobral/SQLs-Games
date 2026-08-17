---
## 🐾 Nível 15: 🏆 A Noite do Grande Apagão
**Nível de Dificuldade:** Iniciante — **BOSS DE FIM DE TEMPORADA!**

**📜 Briefing:**
Na noite de sexta-feira, uma tempestade derruba a energia de todo o bairro por 4 horas (das 21h às 01h). Quando a luz volta, o caos está instalado: a despensa do Detetive foi invadida de novo (mais sachês sumiram), o jardim do Seu Agenor está destruído, há pegadas por todas as casas, e — o mais misterioso — um bilhete foi encontrado no telhado da Dona Clotilde com os dizeres "Operação Salmão: Fase 1 completa". 

Durante o apagão, os sensores de todas as casas continuaram funcionando (são a bateria) e registraram uma quantidade absurda de movimentação. Este é o seu primeiro caso complexo: você vai precisar de TODOS os comandos que aprendeu até agora!

**🎬 Introdução:**
*O Detetive Bigode acorda com a luz voltando às 01h da manhã. O bip do micro-ondas reiniciando é seguido por um pressentimento ruim. Ele corre para a despensa: porta aberta, sachês sumidos. Corre para a janela: pegadas no quintal. O telefone toca — é Seu Agenor: "DETETIVE! MEU JARDIM FOI DESTRUÍDO! TEM MARCAS DE PATA POR TODO LADO!"*

*Antes de sair, o telefone toca de novo. Dona Clotilde, em pânico: "Detetive, eu subi no telhado e encontrei um BILHETE! Escrito em... em patas? Tem letras tortas mas dá pra ler: 'Operação Salmão: Fase 1 completa.' O QUE É ISSO?!"*

*O Detetive Bigode veste o casaco, pega a lupa e o caderninho. "Esta noite, tudo muda." Ele olha para Bolinha, que dorme no sofá. "Você sabe de alguma coisa, não sabe?" Bolinha ronca. "Claro."*

---

**🔍 Conceito SQL deste nível: REVISÃO GERAL — BOSS FIGHT! 🏆**

Este é seu primeiro Boss Fight! Você vai usar **TODOS** os comandos aprendidos na Temporada 1:

| Conceito | Níveis | Comando |
|----------|--------|---------|
| Consulta básica | 1-2 | `SELECT * FROM tabela` |
| Filtros | 3-4 | `WHERE condição` |
| Ordenação | 5-6 | `ORDER BY coluna ASC/DESC` |
| Padrões | 7-8 | `LIKE '%padrão%'` |
| Condições combinadas | 9-10 | `AND` / `OR` |
| Intervalos e listas | 11-12 | `BETWEEN` / `IN` |
| Estatísticas | 13-14 | `COUNT()`, `SUM()`, `AVG()`, `MAX()`, `MIN()` |

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 15: 🏆 A Noite do Grande Apagão
-- BOSS FIGHT — FIM DA TEMPORADA 1
-- =============================================

-- Tabela 1: Movimentações registradas durante o apagão
DROP TABLE IF EXISTS movimentacao_apagao;

CREATE TABLE movimentacao_apagao (
    id INTEGER PRIMARY KEY,
    nome_pet TEXT,
    especie TEXT,
    horario TEXT,
    local_detectado TEXT,
    direcao TEXT,
    carregando_algo TEXT,
    descricao TEXT
);

INSERT INTO movimentacao_apagao VALUES (1,  'Mingau', 'Gato', '21:15', 'Despensa Detetive', 'Entrando', 'Sim', 'Carregando sachê na boca');
INSERT INTO movimentacao_apagao VALUES (2,  'Bolinha', 'Gato', '21:20', 'Cozinha Detetive', 'Parado', 'Não', 'Comendo ração do pote como se nada estivesse acontecendo');
INSERT INTO movimentacao_apagao VALUES (3,  'Capitão Frajola', 'Gato', '21:30', 'Quintal Detetive', 'Entrando', 'Não', 'Entrou pela porta dos fundos');
INSERT INTO movimentacao_apagao VALUES (4,  'Capitão Frajola', 'Gato', '21:45', 'Despensa Detetive', 'Saindo', 'Sim', 'Saiu carregando dois sachês empilhados');
INSERT INTO movimentacao_apagao VALUES (5,  'Thor', 'Cachorro', '22:00', 'Jardim Seu Agenor', 'Correndo', 'Não', 'Cavando buracos freneticamente');
INSERT INTO movimentacao_apagao VALUES (6,  'Foguete', 'Gato', '22:10', 'Muro do bairro', 'Indo para norte', 'Sim', 'Correndo em alta velocidade com algo na boca');
INSERT INTO movimentacao_apagao VALUES (7,  'Mingau', 'Gato', '22:15', 'Telhado Dona Clotilde', 'Subindo', 'Sim', 'Subiu no telhado carregando sachê');
INSERT INTO movimentacao_apagao VALUES (8,  'General Bigodão', 'Gato', '22:30', 'Portão Dona Clotilde', 'Vigiando', 'Não', 'Sentado no portão como sentinela');
INSERT INTO movimentacao_apagao VALUES (9,  'Nestor', 'Gato', '22:45', 'Janela Dona Clotilde', 'Saindo', 'Sim', 'Saiu pela janela com sachê do armário da dona');
INSERT INTO movimentacao_apagao VALUES (10, 'Princesa', 'Gato', '23:00', 'Telhado Dona Clotilde', 'Parada', 'Não', 'Observando tudo do telhado como supervisora');
INSERT INTO movimentacao_apagao VALUES (11, 'Foguete', 'Gato', '23:15', 'Beco lateral', 'Indo para sul', 'Não', 'Voltando sem nada — entregou a carga');
INSERT INTO movimentacao_apagao VALUES (12, 'Salsicha', 'Cachorro', '23:20', 'Rua principal', 'Latindo', 'Não', 'Latindo para as sombras, ignorado por todos');
INSERT INTO movimentacao_apagao VALUES (13, 'Capitão Frajola', 'Gato', '23:30', 'Telhado Dona Clotilde', 'Subindo', 'Sim', 'Subiu no telhado com sachês — parece distribuir');
INSERT INTO movimentacao_apagao VALUES (14, 'Mingau', 'Gato', '23:45', 'Petshop Patinhas de Ouro', 'Saindo', 'Sim', 'Saiu do petshop fechado carregando sachê');
INSERT INTO movimentacao_apagao VALUES (15, 'Foguete', 'Gato', '00:00', 'Muro do bairro', 'Indo para norte', 'Sim', 'Nova corrida com carga');
INSERT INTO movimentacao_apagao VALUES (16, 'Capitão Frajola', 'Gato', '00:15', 'Telhado Dona Clotilde', 'Parado', 'Não', 'Sentado no telhado como se presidisse uma reunião');
INSERT INTO movimentacao_apagao VALUES (17, 'General Bigodão', 'Gato', '00:30', 'Telhado Dona Clotilde', 'Subindo', 'Não', 'Juntou-se ao grupo no telhado');
INSERT INTO movimentacao_apagao VALUES (18, 'Pipoca', 'Hamster', '00:45', 'Sala Pedrinho', 'Escapando', 'Não', 'Escapou da gaiola durante o apagão — pânico total');

-- Tabela 2: Itens desaparecidos confirmados após o apagão
DROP TABLE IF EXISTS itens_desaparecidos_apagao;

CREATE TABLE itens_desaparecidos_apagao (
    id INTEGER PRIMARY KEY,
    item TEXT,
    tipo TEXT,
    local_original TEXT,
    valor_estimado REAL,
    hora_provavel_sumiço TEXT,
    observacao TEXT
);

INSERT INTO itens_desaparecidos_apagao VALUES (1, 'Sachê salmão premium', 'Sachê', 'Despensa Detetive', 8.50, '21:15', 'Levado pelo Mingau');
INSERT INTO itens_desaparecidos_apagao VALUES (2, 'Sachê salmão premium', 'Sachê', 'Despensa Detetive', 8.50, '21:45', 'Levado pelo Capitão Frajola');
INSERT INTO itens_desaparecidos_apagao VALUES (3, 'Sachê atum gourmet', 'Sachê', 'Despensa Detetive', 7.90, '21:45', 'Levado pelo Capitão Frajola');
INSERT INTO itens_desaparecidos_apagao VALUES (4, 'Sachê salmão premium', 'Sachê', 'Armário Dona Clotilde', 8.50, '22:45', 'Levado pelo Nestor');
INSERT INTO itens_desaparecidos_apagao VALUES (5, 'Sachê salmão premium', 'Sachê', 'Petshop Patinhas', 8.50, '23:45', 'Levado pelo Mingau do petshop fechado');
INSERT INTO itens_desaparecidos_apagao VALUES (6, 'Sachê frango special', 'Sachê', 'Petshop Patinhas', 6.90, '23:45', 'Levado junto com o de salmão');
INSERT INTO itens_desaparecidos_apagao VALUES (7, 'Vaso de cerâmica', 'Decoração', 'Jardim Seu Agenor', 45.00, '22:00', 'Derrubado pelo Thor cavando');
INSERT INTO itens_desaparecidos_apagao VALUES (8, 'Mangueira de jardim', 'Ferramenta', 'Jardim Seu Agenor', 35.00, '22:00', 'Mordida e furada pelo Thor');
INSERT INTO itens_desaparecidos_apagao VALUES (9, 'Chinelo do Pedrinho', 'Roupa', 'Porta da casa Pedrinho', 25.00, '22:30', 'Desaparecido — provavelmente Thor');
```

---

**🎯 Missão — BOSS FIGHT! 🏆**
Resolva todos os mistérios da Noite do Grande Apagão usando suas habilidades SQL:

**Desafio 1 — SELECT * + ORDER BY:**
Reconstrua a **linha do tempo completa** do apagão, ordenando por horário.

**Desafio 2 — WHERE + AND:**
Encontre todos os registros onde pets estavam **carregando algo** E foram vistos no **Telhado da Dona Clotilde**.

**Desafio 3 — LIKE:**
Encontre todas as movimentações que mencionam **"sachê"** na descrição.

**Desafio 4 — IN:**
Filtre os itens desaparecidos que são do tipo **'Sachê'** e veja o prejuízo.

**Desafio 5 — BETWEEN + COUNT:**
Quantas movimentações aconteceram entre **22:00 e 00:00** (o período mais intenso)?

**Desafio 6 — SUM:**
Qual o **valor total** do prejuízo da noite?

---

**💡 Dicas:**
> - Desafio 1: `ORDER BY horario ASC`
> - Desafio 2: `WHERE carregando_algo = 'Sim' AND local_detectado = 'Telhado Dona Clotilde'`
> - Desafio 3: `WHERE descricao LIKE '%sachê%' OR descricao LIKE '%Sachê%'`
> - Desafio 4: `WHERE tipo = 'Sachê'`
> - Desafio 5: `COUNT(*) ... BETWEEN '22:00' AND '00:00'` — cuidado com meia-noite!
> - Desafio 6: `SUM(valor_estimado)`

---

**✅ Scripts de Solução:**
```sql
-- DESAFIO 1: Linha do tempo completa
SELECT horario, nome_pet, local_detectado, descricao
FROM movimentacao_apagao
ORDER BY horario ASC;

-- DESAFIO 2: Quem chegou ao telhado carregando algo?
SELECT nome_pet, horario, descricao
FROM movimentacao_apagao
WHERE carregando_algo = 'Sim' AND local_detectado = 'Telhado Dona Clotilde';

-- DESAFIO 3: Menções a sachê nas movimentações
SELECT horario, nome_pet, descricao
FROM movimentacao_apagao
WHERE descricao LIKE '%sachê%' OR descricao LIKE '%sachês%';

-- DESAFIO 4: Itens do tipo Sachê que sumiram
SELECT item, local_original, valor_estimado, observacao
FROM itens_desaparecidos_apagao
WHERE tipo = 'Sachê';

-- DESAFIO 5: Movimentações no período mais intenso (22:00 a 23:59)
SELECT COUNT(*) AS total_movimentacoes_pico
FROM movimentacao_apagao
WHERE horario BETWEEN '22:00' AND '23:59';

-- DESAFIO 6: Prejuízo total da noite
SELECT SUM(valor_estimado) AS prejuizo_total FROM itens_desaparecidos_apagao;
```

**📋 Resultados Esperados:**

**Desafio 2 — Quem carregou sachê ao telhado:**

| nome_pet | horario | descricao |
|----------|---------|-----------|
| Mingau | 22:15 | Subiu no telhado carregando sachê |
| Capitão Frajola | 23:30 | Subiu no telhado com sachês — parece distribuir |

**Desafio 4 — Sachês desaparecidos:**

| item | local_original | valor_estimado | observacao |
|------|----------------|----------------|-----------|
| Sachê salmão premium | Despensa Detetive | 8.50 | Levado pelo Mingau |
| Sachê salmão premium | Despensa Detetive | 8.50 | Levado pelo Capitão Frajola |
| Sachê atum gourmet | Despensa Detetive | 7.90 | Levado pelo Capitão Frajola |
| Sachê salmão premium | Armário Dona Clotilde | 8.50 | Levado pelo Nestor |
| Sachê salmão premium | Petshop Patinhas | 8.50 | Levado pelo Mingau do petshop fechado |
| Sachê frango special | Petshop Patinhas | 6.90 | Levado junto com o de salmão |

**Desafio 5:** 8 movimentações entre 22:00 e 23:59

**Desafio 6:** Prejuízo total: **R$ 154,30**

---

**🔎 Conclusão — FIM DA TEMPORADA 1:**
> ## 🏆 CASO DE FIM DE TEMPORADA ENCERRADO!
>
> **A Noite do Grande Apagão revelou TUDO sobre a "Operação Salmão"!**
>
> **O que aconteceu naquela noite:**
> 1. **21:15-21:45** — **Mingau** e **Capitão Frajola** invadiram a despensa do Detetive e roubaram 3 sachês
> 2. **22:00** — **Thor** serviu como distração involuntária, destruindo o jardim do Seu Agenor
> 3. **22:10-23:15** — **Foguete** (finalmente identificado!) fez corridas de entrega, levando sachês para fora do bairro
> 4. **22:15-23:30** — **Mingau** e **Capitão Frajola** subiram ao telhado da Dona Clotilde com sachês
> 5. **22:30** — **General Bigodão** ficou de sentinela no portão da Dona Clotilde
> 6. **22:45** — **Nestor** (gato DA Dona Clotilde!) roubou sachê do armário da própria dona!
> 7. **23:00** — **Princesa** supervisionou tudo do telhado (como sempre, sem sujar as patas)
> 8. **23:45** — **Mingau** entrou no PETSHOP FECHADO e roubou 2 sachês!
> 9. **00:15** — **Capitão Frajola** "presidiu" uma reunião no telhado
>
> **A HIERARQUIA:**
> - 👑 **Capitão Frajola** — O LÍDER. Coordena, distribui, preside reuniões.
> - 🥷 **Mingau** — O LADRÃO. Entra em qualquer lugar, até no petshop fechado.
> - 🏃 **Foguete** — O ENTREGADOR. Corre para fora do bairro com a carga.
> - 💂 **General Bigodão** — O SENTINELA. Vigia os portões.
> - 🐱 **Nestor** — O INFILTRADO. Rouba de dentro da própria casa.
> - 👸 **Princesa** — A SUPERVISORA. Observa tudo sem se comprometer.
>
> **Prejuízo total da noite: R$ 154,30**
> **6 sachês roubados de 3 locais diferentes**
> **Bilhete no telhado: "Operação Salmão: Fase 1 completa"**
>
> *O Detetive Bigode fecha o caderninho. "Fase 1 completa. Isso significa que existe uma Fase 2. E se o Foguete está levando sachês para FORA do bairro... para onde? Para quem?"*
>
> *Ele olha para o telhado da Dona Clotilde iluminado pela lua. "Na próxima temporada, eu vou precisar de ferramentas mais poderosas. JOINs, GROUP BY, subqueries... A investigação se expande para o bairro inteiro."*
>
> ---
> ### 🎬 PREVIEW DA TEMPORADA 2:
> *"Os gatos do bairro têm uma rede organizada. O telhado da Dona Clotilde é o quartel-general. Sachês estão sendo contrabandeados para fora do bairro. O petshop é alvo. E o Capitão Frajola é apenas o começo..."*
>
> **Na Temporada 2 — Intrigas de Bairro**, você vai aprender a **cruzar tabelas** com JOINs, **agrupar dados** com GROUP BY e usar **subqueries** para desvendar a rede completa!
>
> 🐾 **Até a próxima temporada, Detetive! A Operação Salmão é só o começo...**
