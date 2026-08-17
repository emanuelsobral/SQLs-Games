---
## 🐾 Nível 3: O Vaso Tombado da Dona Clotilde
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Dona Clotilde acorda às 6h da manhã e encontra seu precioso vaso de orquídeas — presente do falecido marido — estilhaçado no chão da sala. O vaso ficava na borda da janela. Ela tem 7 gatos em casa, mas jura de pé junto que "todos são anjinhos incapazes de maldade". As evidências da câmera caseira (que ela usa para vigiar os gatos, e não ladrões) mostram que o acidente aconteceu por volta das 3h da manhã. Dois gatos foram vistos na janela da sala nesse horário.

**🎬 Introdução:**
*O Detetive Bigode é recebido por Dona Clotilde, que segura os cacos do vaso com lágrimas nos olhos. "Era uma orquídea Phalaenopsis roxa, Detetive! ROXA! Meu Aristides — que Deus o tenha — trouxe de Holambra em 2003!" Sete gatos observam a cena de vários pontos estratégicos da casa, com a indiferença clássica da espécie.*

*"Dona Clotilde, a senhora tem sete gatos e um vaso na borda da janela. Com todo respeito, isso era uma questão de tempo." Ela se ofende: "Meus gatos são EDUCADOS! Devem ter sido os gatos de RUA!" O Detetive suspira e abre o caderninho: "Vamos ver o que os dados dizem..."*

---

**🔍 Conceito SQL deste nível: `SELECT colunas FROM tabela WHERE condição`**

Agora você vai aprender a **filtrar** dados! Em vez de ver TUDO, você pode selecionar apenas as linhas que atendem a uma condição.

- `WHERE` = "Onde..." (funciona como um filtro)
- Você pode comparar com `=`, `>`, `<`, `>=`, `<=`, `!=`

**Sintaxe:**
```sql
SELECT coluna1, coluna2 FROM tabela WHERE condição;
```

**Exemplos:**
```sql
-- Mostrar só os gatos que pesam mais de 5kg
SELECT nome, peso_kg FROM gatos WHERE peso_kg > 5;

-- Mostrar só quem estava na cozinha
SELECT nome FROM suspeitos WHERE estava_na_cozinha = 'Sim';
```

> 💡 **Dica importante:** Você também pode selecionar **colunas específicas** em vez de usar `*`. Basta listar os nomes das colunas separados por vírgula!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 3: O Vaso Tombado da Dona Clotilde
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS gatos_clotilde;

CREATE TABLE gatos_clotilde (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    cor TEXT,
    peso_kg REAL,
    local_visto TEXT,
    horario TEXT,
    atividade TEXT
);

-- Os 7 gatos da Dona Clotilde e onde estavam às 3h da manhã
INSERT INTO gatos_clotilde VALUES (1, 'Mimi', 'Branca', 3.2, 'Sofá da sala', '03:00', 'Dormindo enrolada como um croissant');
INSERT INTO gatos_clotilde VALUES (2, 'Princesa', 'Branca', 4.1, 'Janela da sala', '03:10', 'Andando na borda da janela com elegância perigosa');
INSERT INTO gatos_clotilde VALUES (3, 'Fifi', 'Cinza', 3.8, 'Cozinha', '02:45', 'Bebendo água da torneira que pinga');
INSERT INTO gatos_clotilde VALUES (4, 'Dudu', 'Laranja', 5.5, 'Cama da Clotilde', '03:00', 'Dormindo nos pés da dona, roncando');
INSERT INTO gatos_clotilde VALUES (5, 'Lili', 'Preta', 3.0, 'Quintal', '02:30', 'Caçando mariposas no jardim');
INSERT INTO gatos_clotilde VALUES (6, 'Nestor', 'Rajado', 6.2, 'Janela da sala', '03:05', 'Pulando na janela para disputar espaço');
INSERT INTO gatos_clotilde VALUES (7, 'Bebel', 'Tricolor', 3.5, 'Banheiro', '03:15', 'Desenrolando o papel higiênico inteiro');
```

---

**🎯 Missão:**
Dona Clotilde tem 7 gatos, mas o vaso estava na **janela da sala**. Use o comando `WHERE` para filtrar apenas os gatos que estavam na janela da sala no horário do acidente!

Descubra: **quais gatos** estavam na janela e **o que estavam fazendo**?

---

**💡 Dica:**
> Filtre a tabela `gatos_clotilde` para mostrar apenas os registros onde o `local_visto` é igual a `'Janela da sala'`. Selecione as colunas `nome`, `horario` e `atividade` para ter uma visão clara.

---

**✅ Script de Solução:**
```sql
-- Filtrar apenas os gatos que estavam na janela da sala
SELECT nome, horario, atividade
FROM gatos_clotilde
WHERE local_visto = 'Janela da sala';
```

**📋 Resultado Esperado:**

| nome | horario | atividade |
|------|---------|-----------|
| Princesa | 03:10 | Andando na borda da janela com elegância perigosa |
| Nestor | 03:05 | Pulando na janela para disputar espaço |

---

**🔎 Conclusão:**
> **Caso encerrado!** Os culpados são **Princesa** e **Nestor**! 🐱🐱
>
> A cena se reconstrói assim: **Nestor** (6,2 kg de puro gato rajado) pulou na janela às 03:05 para "disputar espaço". **Princesa** já estava "andando na borda com elegância perigosa" desde as 03:10. O encontro dos dois na borda estreita da janela, somando mais de 10 kg de gato, foi demais para o equilíbrio do vaso de orquídeas.
>
> Dona Clotilde se recusa a aceitar: "Mas a Princesa é tão delicada!" O Detetive aponta para os dados: "Dona Clotilde, os dados não mentem. E 'elegância perigosa' não é exatamente um álibi."
>
> *O Detetive Bigode anota no caderninho: "Princesa — apesar da aparência de 'anjinha', já é a segunda vez que o nome dela aparece numa investigação. Coincidência? Nestor — 6,2 kg de gato na borda de uma janela é um desastre anunciado."*
>
> 🐾 **A vizinhança começa a falar, Detetive. E os casos só aumentam...**
