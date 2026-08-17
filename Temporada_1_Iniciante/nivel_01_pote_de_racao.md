---
## 🐾 Nível 1: O Caso do Pote de Ração Vazio
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Você acorda numa segunda-feira e encontra o pote de ração do Bolinha completamente vazio. O problema? Você encheu o pote ontem à noite às 22h com 500 gramas de ração premium sabor frango. Alguém (ou algo) devorou tudo durante a madrugada. Cinco pets tinham acesso livre à cozinha naquela noite. Está na hora de consultar os registros.

**🎬 Introdução:**
*O Detetive Bigode ajusta sua lupa de brinquedo e se aproxima da cena do crime: a cozinha. O pote de ração jaz vazio, sem uma única migalha sequer. Há um silêncio sepulcral no cômodo — exceto pelo ronco potente do Bolinha, que dorme de barriga para cima no sofá com um sorriso extremamente suspeito no focinho.*

*"Elementar, meu caro Watson", você murmura para ninguém em particular, porque você mora sozinho com cinco animais que não entendem referências literárias. Hora de abrir o caderninho SQL e investigar!*

---

**🔍 Conceito SQL deste nível: `SELECT * FROM`**

Este é o comando mais básico e poderoso do SQL! Com ele, você pode **ver TODOS os dados** de uma tabela.

- `SELECT` = "Selecione / Me mostre"
- `*` = "Todas as colunas" (o asterisco é um curinga que significa "tudo")
- `FROM` = "Da tabela..."

**Sintaxe:**
```sql
SELECT * FROM nome_da_tabela;
```

**Exemplo:** Se temos uma tabela chamada `frutas`, o comando `SELECT * FROM frutas;` mostra todas as frutas e todas as informações sobre elas.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 1: O Caso do Pote de Ração Vazio
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS suspeitos;

CREATE TABLE suspeitos (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    especie TEXT,
    estava_na_cozinha TEXT,
    horario_visto TEXT,
    tem_racao_no_focinho TEXT,
    comportamento TEXT
);

-- Os suspeitos da madrugada fatídica
INSERT INTO suspeitos VALUES (1, 'Bolinha', 'Gato', 'Sim', '03:15', 'Sim', 'Dormindo de barriga cheia no sofá');
INSERT INTO suspeitos VALUES (2, 'Princesa', 'Gata', 'Não', '22:30', 'Não', 'Dormindo na cama da Dona Clotilde a noite toda');
INSERT INTO suspeitos VALUES (3, 'Thor', 'Cachorro', 'Sim', '02:00', 'Não', 'Bebeu água e voltou para a caminha');
INSERT INTO suspeitos VALUES (4, 'Salsicha', 'Cachorro', 'Não', NULL, 'Não', 'Trancado no quarto do Pedrinho a noite toda');
INSERT INTO suspeitos VALUES (5, 'Mingau', 'Gato', 'Sim', '04:00', 'Não', 'Visto olhando pela janela da cozinha, pensativo');
```

---

**🎯 Missão:**
Sua primeira missão como Detetive de Quintal é simples: **visualize todos os dados da tabela de suspeitos** para descobrir quem é o culpado pelo pote vazio!

Rode o comando para ver todos os suspeitos e analise as evidências. Quem estava na cozinha? Quem tem ração no focinho? Quem tem comportamento suspeito?

---

**💡 Dica:**
> Para ver **tudo** que está na tabela `suspeitos`, use o comando que seleciona TODAS (`*`) as colunas dessa tabela. Não esqueça o ponto e vírgula no final!

---

**✅ Script de Solução:**
```sql
-- Veja todos os suspeitos e suas evidências
SELECT * FROM suspeitos;
```

**📋 Resultado Esperado:**

| id | nome | especie | estava_na_cozinha | horario_visto | tem_racao_no_focinho | comportamento |
|----|------|---------|-------------------|---------------|----------------------|---------------|
| 1 | Bolinha | Gato | Sim | 03:15 | Sim | Dormindo de barriga cheia no sofá |
| 2 | Princesa | Gata | Não | 22:30 | Não | Dormindo na cama da Dona Clotilde a noite toda |
| 3 | Thor | Cachorro | Sim | 02:00 | Não | Bebeu água e voltou para a caminha |
| 4 | Salsicha | Cachorro | Não | NULL | Não | Trancado no quarto do Pedrinho a noite toda |
| 5 | Mingau | Gato | Sim | 04:00 | Não | Visto olhando pela janela da cozinha, pensativo |

---

**🔎 Conclusão:**
> **Caso encerrado!** O culpado é o **Bolinha**! 🐱
>
> As evidências são esmagadoras: ele foi visto na cozinha às 03:15, é o **único** com ração no focinho (`tem_racao_no_focinho = 'Sim'`), e seu comportamento — "Dormindo de barriga cheia no sofá" — é praticamente uma confissão.
>
> Thor esteve na cozinha, mas só bebeu água. Mingau apareceu às 4h, mas provavelmente chegou tarde demais — o crime já havia sido cometido. Princesa e Salsicha têm álibis sólidos.
>
> *O Detetive Bigode anota no caderninho: "Bolinha — reincidente em potencial. Monitorar de perto. Suspeito tem histórico de barriga cheia e cara de inocente."*
>
> 🐾 **Próximo caso aguarda, Detetive!**
