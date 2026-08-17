---
## 🐾 Nível 26: O Cálculo do Prejuízo
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Dona Jurema quer uma planilha de danos com valores em reais para apresentar na prefeitura. Cada dano tem um custo unitário e uma quantidade. O Detetive precisa calcular o **valor total por morador** usando expressões e aliases.

**🎬 Introdução:**
*"Detetive, eu preciso de NÚMEROS para a prefeitura! Valor total dos danos, por morador, com nome bonito nas colunas!" O Detetive sorri: "Aliases e expressões, Dona Jurema. SQL faz isso fácil."*

---

**🔍 Conceito SQL deste nível: `AS` (Aliases) e Expressões**

**Aliases** renomeiam colunas para melhor leitura. **Expressões** permitem cálculos diretamente no SELECT!

```sql
SELECT 
    nome AS proprietario,
    quantidade * preco AS valor_total,
    quantidade * preco * 0.1 AS taxa_seguro
FROM danos;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS danos_bairro;

CREATE TABLE danos_bairro (
    id INTEGER PRIMARY KEY,
    morador TEXT,
    item_danificado TEXT,
    custo_unitario REAL,
    quantidade INTEGER,
    causado_por TEXT,
    data TEXT
);

INSERT INTO danos_bairro VALUES (1, 'Dona Clotilde', 'Vaso de orquídea', 120.00, 1, 'Princesa e Nestor', '2024-03-15');
INSERT INTO danos_bairro VALUES (2, 'Seu Agenor', 'Vaso de cerâmica jardim', 45.00, 2, 'Thor', '2024-03-22');
INSERT INTO danos_bairro VALUES (3, 'Seu Agenor', 'Mangueira de jardim', 35.00, 1, 'Thor', '2024-03-22');
INSERT INTO danos_bairro VALUES (4, 'Pedrinho', 'Almofada bordada', 80.00, 1, 'Thor', '2024-03-10');
INSERT INTO danos_bairro VALUES (5, 'Detetive Bigode', 'Sachê salmão premium', 8.50, 9, 'Rede felina', '2024-03-25');
INSERT INTO danos_bairro VALUES (6, 'Dona Margarete', 'Sachê salmão premium', 8.50, 4, 'Mingau', '2024-03-25');
INSERT INTO danos_bairro VALUES (7, 'Dona Jurema', 'Gnomo cerâmica', 89.00, 1, 'Thor', '2024-04-01');
INSERT INTO danos_bairro VALUES (8, 'Dona Jurema', 'Canteiro de rosas', 65.00, 2, 'Thor e Capitão Frajola', '2024-04-01');
INSERT INTO danos_bairro VALUES (9, 'Seu Bartolomeu', 'Camisa havaiana', 55.00, 1, 'Thor', '2024-03-28');
INSERT INTO danos_bairro VALUES (10, 'Dona Clotilde', 'Sachê salmão premium', 8.50, 3, 'Nestor', '2024-04-05');
```

---

**🎯 Missão:**
1. Calcule o **valor total** de cada dano (`custo_unitario * quantidade`) e dê o nome de `prejuizo`
2. Agrupe por **morador** e some os prejuízos totais (alias: `total_prejuizo`)
3. Calcule também o **prejuízo médio por incidente** por morador

---

**✅ Script de Solução:**
```sql
-- 1. Valor de cada dano
SELECT 
    morador,
    item_danificado,
    custo_unitario,
    quantidade,
    custo_unitario * quantidade AS prejuizo
FROM danos_bairro
ORDER BY prejuizo DESC;

-- 2. Total por morador
SELECT 
    morador AS proprietario,
    SUM(custo_unitario * quantidade) AS total_prejuizo,
    COUNT(*) AS total_incidentes,
    AVG(custo_unitario * quantidade) AS media_por_incidente
FROM danos_bairro
GROUP BY morador
ORDER BY total_prejuizo DESC;
```

**📋 Resultado (Total por morador):**

| proprietario | total_prejuizo | total_incidentes | media_por_incidente |
|-------------|---------------|------------------|---------------------|
| Dona Jurema | 219.00 | 2 | 109.50 |
| Dona Clotilde | 145.50 | 2 | 72.75 |
| Seu Agenor | 125.00 | 2 | 62.50 |
| Pedrinho | 80.00 | 1 | 80.00 |
| Detetive Bigode | 76.50 | 1 | 76.50 |
| Seu Bartolomeu | 55.00 | 1 | 55.00 |
| Dona Margarete | 34.00 | 1 | 34.00 |

---

**🔎 Conclusão:**
> **Prejuízo total do bairro: R$ 735,00!** Dona Jurema lidera o ranking de vítimas (R$219). Os sachês somam R$110,50 — a rede felina está custando caro.
>
> 🐾 **Os números vão para a prefeitura, Detetive. A pressão aumenta...**
