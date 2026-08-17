---
## 🐾 Nível 16: A Reunião Secreta no Telhado
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Após os eventos do Grande Apagão, o Detetive Bigode sabe que os gatos se reúnem no telhado da Dona Clotilde. Mas agora ele precisa de mais informações: QUAIS gatos se reúnem e QUEM são seus donos? Seu Agenor, fiel ao seu posto na janela, registrou todos os gatos avistados no telhado nas últimas duas semanas, anotando nome e horário. Mas os dados do Seu Agenor estão em uma tabela separada dos dados do cadastro de pets. Para cruzar "avistamentos" com "donos", o Detetive vai precisar de uma ferramenta nova: o JOIN.

**🎬 Introdução:**
*O Detetive Bigode bate à porta do Seu Agenor às 7h da manhã. O velho já está na janela com binóculos militares e um café na mão. "Eu sabia que você viria, Detetive. Estou de vigília há 14 dias. Anotei TODOS os gatos que vi no telhado da Clotilde."*

*Ele empurra duas cadernetas para o Detetive. "Caderneta 1: avistamentos no telhado. Caderneta 2: cadastro dos gatos com seus donos." O Detetive olha para as duas. "Seu Agenor, eu preciso CRUZAR essas informações. Saber não só QUEM estava no telhado, mas de QUEM é cada gato."*

*Seu Agenor assente gravemente: "Use suas ferramentas de banco de dados, Detetive. A verdade está no cruzamento dos dados."*

---

**🔍 Conceito SQL deste nível: `INNER JOIN`**

Até agora, você consultou dados de **uma tabela por vez**. Mas no mundo real, informações relacionadas ficam em **tabelas diferentes**. O `JOIN` permite **cruzar duas tabelas** usando uma coluna em comum!

### `INNER JOIN`
Retorna apenas as linhas que têm correspondência em **ambas** as tabelas.

**Sintaxe:**
```sql
SELECT tabela1.coluna, tabela2.coluna
FROM tabela1
INNER JOIN tabela2 ON tabela1.coluna_comum = tabela2.coluna_comum;
```

**Exemplo visual:**
```
Tabela: avistamentos          Tabela: cadastro
┌──────────┬─────────┐       ┌──────────┬──────────┐
│ nome_gato│ horario │       │ nome     │ dono     │
├──────────┼─────────┤       ├──────────┼──────────┤
│ Bolinha  │ 22:00   │       │ Bolinha  │ Detetive │
│ Mingau   │ 23:00   │       │ Princesa │ Clotilde │
│ Princesa │ 23:30   │       │ Mingau   │ NULL     │
└──────────┴─────────┘       └──────────┴──────────┘

INNER JOIN ON avistamentos.nome_gato = cadastro.nome:
┌──────────┬─────────┬──────────┐
│ nome_gato│ horario │ dono     │
├──────────┼─────────┼──────────┤
│ Bolinha  │ 22:00   │ Detetive │
│ Mingau   │ 23:00   │ NULL     │
│ Princesa │ 23:30   │ Clotilde │
└──────────┴─────────┘──────────┘
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 16: A Reunião Secreta no Telhado
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS avistamentos_telhado;
DROP TABLE IF EXISTS cadastro_gatos;

-- Tabela 1: Avistamentos no telhado (registrados pelo Seu Agenor)
CREATE TABLE avistamentos_telhado (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    data TEXT,
    horario TEXT,
    atividade TEXT
);

INSERT INTO avistamentos_telhado VALUES (1,  'Capitão Frajola', '2024-03-25', '23:00', 'Sentado no centro, como líder');
INSERT INTO avistamentos_telhado VALUES (2,  'Mingau', '2024-03-25', '23:15', 'Chegou carregando algo');
INSERT INTO avistamentos_telhado VALUES (3,  'Princesa', '2024-03-25', '23:20', 'Sentada elegantemente na beirada');
INSERT INTO avistamentos_telhado VALUES (4,  'Nestor', '2024-03-25', '23:10', 'Deitado, bocejando');
INSERT INTO avistamentos_telhado VALUES (5,  'General Bigodão', '2024-03-26', '22:45', 'Vigiando a rua do telhado');
INSERT INTO avistamentos_telhado VALUES (6,  'Capitão Frajola', '2024-03-26', '23:00', 'No centro novamente');
INSERT INTO avistamentos_telhado VALUES (7,  'Foguete', '2024-03-26', '23:30', 'Chegou correndo, parou ofegante');
INSERT INTO avistamentos_telhado VALUES (8,  'Duquesa', '2024-03-27', '22:30', 'Primeira vez vista no telhado');
INSERT INTO avistamentos_telhado VALUES (9,  'Capitão Frajola', '2024-03-27', '22:45', 'Recebendo Duquesa');
INSERT INTO avistamentos_telhado VALUES (10, 'Bolinha', '2024-03-28', '23:00', 'Dormindo — foi ao telhado para dormir');

-- Tabela 2: Cadastro dos gatos (com dono e informações)
CREATE TABLE cadastro_gatos (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    dono TEXT,
    endereco_dono TEXT,
    registrado TEXT
);

INSERT INTO cadastro_gatos VALUES (1, 'Bolinha', 'Detetive Bigode', 'Rua das Acácias, 42', 'Sim');
INSERT INTO cadastro_gatos VALUES (2, 'Princesa', 'Dona Clotilde', 'Rua das Acácias, 38', 'Sim');
INSERT INTO cadastro_gatos VALUES (3, 'Nestor', 'Dona Clotilde', 'Rua das Acácias, 38', 'Sim');
INSERT INTO cadastro_gatos VALUES (4, 'Mingau', NULL, NULL, 'Não');
INSERT INTO cadastro_gatos VALUES (5, 'Capitão Frajola', NULL, NULL, 'Não');
INSERT INTO cadastro_gatos VALUES (6, 'General Bigodão', NULL, NULL, 'Não');
INSERT INTO cadastro_gatos VALUES (7, 'Foguete', NULL, NULL, 'Não');
INSERT INTO cadastro_gatos VALUES (8, 'Duquesa', 'Dona Margarete', 'Rua dos Ipês, 15', 'Sim');
INSERT INTO cadastro_gatos VALUES (9, 'Mimi', 'Dona Clotilde', 'Rua das Acácias, 38', 'Sim');
INSERT INTO cadastro_gatos VALUES (10, 'Dudu', 'Dona Clotilde', 'Rua das Acácias, 38', 'Sim');
```

---

**🎯 Missão:**
Use `INNER JOIN` para cruzar os avistamentos no telhado com o cadastro de gatos. Descubra:
1. **Quais gatos** frequentam o telhado e **quem são seus donos**?
2. Algum gato de **dono específico** aparece com frequência suspeita?

---

**💡 Dica:**
> A coluna em comum é o **nome do gato**: `avistamentos_telhado.nome_gato = cadastro_gatos.nome`. Use essa coluna no `ON` do JOIN.

---

**✅ Script de Solução:**
```sql
-- Cruzar avistamentos com cadastro para ver os donos
SELECT 
    a.nome_gato,
    a.data,
    a.horario,
    a.atividade,
    c.dono,
    c.endereco_dono,
    c.registrado
FROM avistamentos_telhado a
INNER JOIN cadastro_gatos c ON a.nome_gato = c.nome
ORDER BY a.data, a.horario;
```

**📋 Resultado Esperado:**

| nome_gato | data | horario | atividade | dono | endereco_dono | registrado |
|-----------|------|---------|-----------|------|---------------|------------|
| Capitão Frajola | 2024-03-25 | 23:00 | Sentado no centro, como líder | NULL | NULL | Não |
| Nestor | 2024-03-25 | 23:10 | Deitado, bocejando | Dona Clotilde | Rua das Acácias, 38 | Sim |
| Mingau | 2024-03-25 | 23:15 | Chegou carregando algo | NULL | NULL | Não |
| Princesa | 2024-03-25 | 23:20 | Sentada elegantemente | Dona Clotilde | Rua das Acácias, 38 | Sim |
| General Bigodão | 2024-03-26 | 22:45 | Vigiando a rua do telhado | NULL | NULL | Não |
| Capitão Frajola | 2024-03-26 | 23:00 | No centro novamente | NULL | NULL | Não |
| Foguete | 2024-03-26 | 23:30 | Chegou correndo, ofegante | NULL | NULL | Não |
| Duquesa | 2024-03-27 | 22:30 | Primeira vez vista no telhado | Dona Margarete | Rua dos Ipês, 15 | Sim |
| Capitão Frajola | 2024-03-27 | 22:45 | Recebendo Duquesa | NULL | NULL | Não |
| Bolinha | 2024-03-28 | 23:00 | Dormindo — foi ao telhado pra dormir | Detetive Bigode | Rua das Acácias, 42 | Sim |

---

**🔎 Conclusão:**
> **Caso encerrado!** O telhado é um **quartel-general multidonos**! 🏠🐱
>
> **Descobertas ao cruzar os dados:**
> - **Capitão Frajola** (sem dono) aparece **3 vezes** em 3 dias — sempre no centro, como líder
> - **Gatos da Dona Clotilde** (Nestor, Princesa) participam ativamente — a dona nem sabe!
> - **Duquesa** (da Dona Margarete, do **petshop**!) apareceu pela primeira vez — e foi "recebida" pelo Capitão Frajola!
> - **4 gatos sem dono** (não registrados) participam: Capitão Frajola, Mingau, General Bigodão, Foguete
> - **Bolinha** (do Detetive!) foi ao telhado — mas só para dormir 😴
>
> *O Detetive Bigode circula o nome "Duquesa" no caderninho. "A gata do PETSHOP está participando das reuniões. Ela foi 'recebida' pelo Capitão Frajola pessoalmente. Isso explica como o Mingau entrou no petshop fechado durante o Apagão — a Duquesa deve ter facilitado o acesso!"*
>
> 🐾 **A conexão petshop-telhado está confirmada, Detetive. E a Duquesa é a informante de dentro...**
