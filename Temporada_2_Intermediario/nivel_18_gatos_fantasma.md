---
## 🐾 Nível 18: Os Gatos Fantasma
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Dona Jurema apresenta na reunião de moradores uma lista de "gatos avistados em locais suspeitos". Mas o Detetive precisa cruzar essa lista com o cadastro de pets registrados. O problema: nem todos os gatos avistados têm cadastro! Usando `INNER JOIN`, os gatos sem cadastro desaparecem do resultado. Mas são justamente os **não cadastrados** que mais interessam ao Detetive. Ele precisa de um JOIN que mostre TODOS os avistamentos, mesmo quando não há correspondência no cadastro.

**🎬 Introdução:**
*O Detetive Bigode está na delegacia improvisada (a garagem de casa) com dois quadros brancos. No primeiro: "Avistamentos Suspeitos". No segundo: "Cadastro Oficial". Ele traça linhas entre os nomes e percebe que três avistamentos não têm conexão com o cadastro.*

*"Se eu uso o INNER JOIN, esses gatos sem registro simplesmente... somem dos resultados. Mas são justamente eles que eu quero investigar! Preciso de um JOIN que mantenha TODOS os avistamentos, mesmo sem correspondência."*

*Ele escreve no quadro: "LEFT JOIN — não deixa ninguém de fora."*

---

**🔍 Conceito SQL deste nível: `LEFT JOIN`**

O `LEFT JOIN` retorna **TODAS as linhas da tabela da esquerda**, mesmo quando não há correspondência na tabela da direita. Onde não há correspondência, as colunas da direita ficam como `NULL`.

**Diferença visual:**
```
INNER JOIN: Só retorna linhas COM correspondência em AMBAS as tabelas
LEFT JOIN:  Retorna TODAS as linhas da tabela ESQUERDA, com ou sem correspondência

Tabela esquerda (avistamentos):   Tabela direita (cadastro):
 Mingau  ──────────────────────►  Mingau (sem dono)     ✅ Match
 Fantasma ─────────────── ✖ ──►  (não existe)          ⬅ NULL
 Princesa ──────────────────────► Princesa (Clotilde)   ✅ Match
```

**Sintaxe:**
```sql
SELECT t1.col, t2.col
FROM tabela_esquerda t1
LEFT JOIN tabela_direita t2 ON t1.chave = t2.chave;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 18: Os Gatos Fantasma
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS avistamentos_suspeitos;
DROP TABLE IF EXISTS registro_oficial;

-- Tabela ESQUERDA: Avistamentos suspeitos relatados por moradores
CREATE TABLE avistamentos_suspeitos (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    data TEXT,
    local_visto TEXT,
    hora TEXT,
    reportado_por TEXT
);

INSERT INTO avistamentos_suspeitos VALUES (1, 'Capitão Frajola', '2024-04-01', 'Telhado Dona Clotilde', '23:00', 'Seu Agenor');
INSERT INTO avistamentos_suspeitos VALUES (2, 'Sombra', '2024-04-01', 'Beco da padaria', '01:00', 'Seu Bartolomeu');
INSERT INTO avistamentos_suspeitos VALUES (3, 'Princesa', '2024-04-02', 'Janela Dona Clotilde', '22:30', 'Seu Agenor');
INSERT INTO avistamentos_suspeitos VALUES (4, 'Fantasminha', '2024-04-02', 'Muro do petshop', '00:15', 'Dona Margarete');
INSERT INTO avistamentos_suspeitos VALUES (5, 'Mingau', '2024-04-03', 'Porta dos fundos petshop', '23:45', 'Dona Margarete');
INSERT INTO avistamentos_suspeitos VALUES (6, 'Trovão', '2024-04-03', 'Lixeira da esquina', '02:00', 'Seu Agenor');
INSERT INTO avistamentos_suspeitos VALUES (7, 'Foguete', '2024-04-04', 'Muro do bairro (saída norte)', '00:30', 'Seu Agenor');
INSERT INTO avistamentos_suspeitos VALUES (8, 'Bolinha', '2024-04-04', 'Quintal Detetive', '03:00', 'Detetive Bigode');

-- Tabela DIREITA: Registro oficial de pets do bairro
CREATE TABLE registro_oficial (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    dono TEXT,
    especie TEXT,
    vacinado TEXT
);

INSERT INTO registro_oficial VALUES (1, 'Bolinha', 'Detetive Bigode', 'Gato', 'Sim');
INSERT INTO registro_oficial VALUES (2, 'Princesa', 'Dona Clotilde', 'Gato', 'Sim');
INSERT INTO registro_oficial VALUES (3, 'Nestor', 'Dona Clotilde', 'Gato', 'Sim');
INSERT INTO registro_oficial VALUES (4, 'Mingau', NULL, 'Gato', 'Não');
INSERT INTO registro_oficial VALUES (5, 'Capitão Frajola', NULL, 'Gato', 'Não');
INSERT INTO registro_oficial VALUES (6, 'Foguete', NULL, 'Gato', 'Não');
INSERT INTO registro_oficial VALUES (7, 'General Bigodão', NULL, 'Gato', 'Não');
INSERT INTO registro_oficial VALUES (8, 'Duquesa', 'Dona Margarete', 'Gato', 'Sim');
INSERT INTO registro_oficial VALUES (9, 'Thor', 'Pedrinho', 'Cachorro', 'Sim');
```

---

**🎯 Missão:**
Use `LEFT JOIN` para cruzar os avistamentos suspeitos com o registro oficial. Depois, filtre para encontrar os **gatos fantasma** — aqueles que foram avistados mas **NÃO existem** no registro oficial (onde o registro retorna `NULL`).

---

**💡 Dica:**
> Faça o `LEFT JOIN` e depois use `WHERE r.nome IS NULL` para encontrar os avistamentos sem correspondência no registro. Esses são os "gatos fantasma"!

---

**✅ Script de Solução:**
```sql
-- Primeiro: ver TODOS os avistamentos com dados do registro (quando existem)
SELECT 
    a.nome_gato,
    a.data,
    a.local_visto,
    a.hora,
    r.dono,
    r.vacinado
FROM avistamentos_suspeitos a
LEFT JOIN registro_oficial r ON a.nome_gato = r.nome
ORDER BY a.data;

-- Segundo: encontrar os GATOS FANTASMA (sem registro)
SELECT 
    a.nome_gato AS gato_fantasma,
    a.data,
    a.local_visto,
    a.hora,
    a.reportado_por
FROM avistamentos_suspeitos a
LEFT JOIN registro_oficial r ON a.nome_gato = r.nome
WHERE r.nome IS NULL;
```

**📋 Resultado Esperado (Gatos Fantasma):**

| gato_fantasma | data | local_visto | hora | reportado_por |
|---------------|------|-------------|------|---------------|
| Sombra | 2024-04-01 | Beco da padaria | 01:00 | Seu Bartolomeu |
| Fantasminha | 2024-04-02 | Muro do petshop | 00:15 | Dona Margarete |
| Trovão | 2024-04-03 | Lixeira da esquina | 02:00 | Seu Agenor |

---

**🔎 Conclusão:**
> **Caso encerrado!** Existem **3 gatos fantasma** operando no bairro! 👻🐱
>
> **Gatos sem registro nenhum:**
> - **Sombra** — Visto no beco da padaria à 01:00 pelo Seu Bartolomeu
> - **Fantasminha** — Visto no **muro do petshop** à 00:15 pela **Dona Margarete**!
> - **Trovão** — Visto na lixeira da esquina às 02:00 pelo Seu Agenor
>
> Esses gatos **não existem** em nenhum registro. São completamente desconhecidos. E o mais preocupante: **Fantasminha** foi visto no muro do petshop — outro gato rondando o petshop sem identificação!
>
> *O Detetive Bigode adiciona 3 fotos borradas ao quadro de investigação: "Sombra, Fantasminha, Trovão — gatos completamente fora do radar. São novos recrutas do Capitão Frajola? Agentes externos? O LEFT JOIN revelou o que o INNER JOIN escondia."*
>
> 🐾 **A rede é maior do que imaginávamos, Detetive. Gatos que nem conhecemos estão operando nas sombras...**
