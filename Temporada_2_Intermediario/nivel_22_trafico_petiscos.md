---
## 🐾 Nível 22: O Tráfico de Petiscos
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Dona Margarete do petshop instalou uma câmera escondida após os sumiços. Ela registrou a quantidade de sachês que cada gato "negociou" (roubou ou redistribuiu) nos últimos dias. O Detetive quer filtrar para ver apenas os gatos que negociaram **mais de 3 sachês** — ou seja, os traficantes de alto volume. Mas como filtrar o resultado de um `GROUP BY`? O `WHERE` não funciona com funções de agregação...

**🎬 Introdução:**
*Dona Margarete mostra as gravações ao Detetive. "Olha isso: gatos entrando, pegando sachês, levando embora. É um TRÁFICO organizado!" O Detetive assiste, incrédulo, enquanto Mingau entra pela porta dos fundos, pega 2 sachês e sai como se fosse o dono da loja.*

*"Dona Margarete, eu preciso dos GRANDES traficantes. Os que movem mais volume. Tenho os dados agrupados por gato, mas preciso filtrar só quem traficou MAIS de 3 unidades." Ele pausa. "E o WHERE não funciona com COUNT... Preciso do HAVING."*

---

**🔍 Conceito SQL deste nível: `HAVING`**

O `HAVING` é como o `WHERE`, mas funciona **depois** do `GROUP BY` — ou seja, filtra os **grupos**, não as linhas individuais!

**Diferença:**
- `WHERE` → filtra **linhas** ANTES do agrupamento
- `HAVING` → filtra **grupos** DEPOIS do agrupamento

**Sintaxe:**
```sql
SELECT coluna, COUNT(*) AS total
FROM tabela
GROUP BY coluna
HAVING COUNT(*) > valor;
```

**Exemplo:**
```sql
-- Gatos com mais de 2 avistamentos
SELECT nome_gato, COUNT(*) AS vezes
FROM avistamentos
GROUP BY nome_gato
HAVING COUNT(*) > 2;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 22: O Tráfico de Petiscos
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS transacoes_saches;

CREATE TABLE transacoes_saches (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    tipo_transacao TEXT,
    sabor_sache TEXT,
    local_transacao TEXT,
    data TEXT,
    horario TEXT
);

INSERT INTO transacoes_saches VALUES (1,  'Mingau', 'Roubo', 'Salmão', 'Petshop', '2024-04-10', '23:30');
INSERT INTO transacoes_saches VALUES (2,  'Mingau', 'Roubo', 'Salmão', 'Despensa Detetive', '2024-04-11', '02:00');
INSERT INTO transacoes_saches VALUES (3,  'Mingau', 'Entrega', 'Salmão', 'Telhado Dona Clotilde', '2024-04-11', '02:30');
INSERT INTO transacoes_saches VALUES (4,  'Mingau', 'Roubo', 'Atum', 'Petshop', '2024-04-12', '23:45');
INSERT INTO transacoes_saches VALUES (5,  'Mingau', 'Roubo', 'Salmão', 'Cozinha Pedrinho', '2024-04-13', '01:00');
INSERT INTO transacoes_saches VALUES (6,  'Capitão Frajola', 'Distribuição', 'Salmão', 'Telhado Dona Clotilde', '2024-04-10', '00:00');
INSERT INTO transacoes_saches VALUES (7,  'Capitão Frajola', 'Distribuição', 'Atum', 'Telhado Dona Clotilde', '2024-04-11', '00:00');
INSERT INTO transacoes_saches VALUES (8,  'Capitão Frajola', 'Distribuição', 'Salmão', 'Telhado Dona Clotilde', '2024-04-12', '00:00');
INSERT INTO transacoes_saches VALUES (9,  'Capitão Frajola', 'Distribuição', 'Frango', 'Telhado Dona Clotilde', '2024-04-13', '00:00');
INSERT INTO transacoes_saches VALUES (10, 'Foguete', 'Entrega', 'Salmão', 'Fora do bairro', '2024-04-10', '00:30');
INSERT INTO transacoes_saches VALUES (11, 'Foguete', 'Entrega', 'Salmão', 'Fora do bairro', '2024-04-12', '01:00');
INSERT INTO transacoes_saches VALUES (12, 'Nestor', 'Roubo', 'Salmão', 'Armário Dona Clotilde', '2024-04-11', '22:00');
INSERT INTO transacoes_saches VALUES (13, 'Nestor', 'Entrega', 'Salmão', 'Telhado Dona Clotilde', '2024-04-11', '22:30');
INSERT INTO transacoes_saches VALUES (14, 'Princesa', 'Supervisão', 'Nenhum', 'Telhado Dona Clotilde', '2024-04-10', '00:00');
INSERT INTO transacoes_saches VALUES (15, 'Duquesa', 'Facilitação', 'Nenhum', 'Petshop', '2024-04-10', '23:00');
INSERT INTO transacoes_saches VALUES (16, 'Duquesa', 'Facilitação', 'Nenhum', 'Petshop', '2024-04-12', '23:15');
```

---

**🎯 Missão:**
1. Agrupe as transações por gato e conte quantas cada um fez
2. Use `HAVING` para filtrar apenas os gatos com **mais de 3 transações** — os "grandes operadores"
3. Descubra quem é o maior traficante de sachês!

---

**✅ Script de Solução:**
```sql
-- Grandes operadores: mais de 3 transações
SELECT nome_gato, COUNT(*) AS total_transacoes
FROM transacoes_saches
GROUP BY nome_gato
HAVING COUNT(*) > 3
ORDER BY total_transacoes DESC;
```

**📋 Resultado Esperado:**

| nome_gato | total_transacoes |
|-----------|-----------------|
| Mingau | 5 |
| Capitão Frajola | 4 |

---

**🔎 Conclusão:**
> **Caso encerrado!** Os dois maiores operadores são **Mingau** (5 transações) e **Capitão Frajola** (4)! 🐱💰
>
> **Mingau** é o **ladrão principal** — rouba sachês de múltiplos locais e entrega no telhado. **Capitão Frajola** é o **distribuidor** — recebe no telhado e distribui para a rede.
>
> Os demais (Foguete: 2, Nestor: 2, Duquesa: 2, Princesa: 1) são operativos de apoio, abaixo do limiar de "grande operador".
>
> 🐾 **Mingau é o braço operacional. Capitão Frajola é o cérebro. A rede está cada vez mais clara...**
