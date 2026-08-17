---
## 🐾 Nível 29: O Estoque Misterioso
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Dona Margarete fez um inventário comparando o estoque esperado (baseado em compras menos vendas) com o estoque real na prateleira. A diferença são os sachês que desapareceram. Uma subquery vai calcular quantos deveriam existir vs. quantos realmente existem.

**🎬 Introdução:**
*"Detetive, olha os meus números!", Dona Margarete empurra duas planilhas. "Eu comprei 100 sachês. Vendi 62. Deviam sobrar 38. Mas na prateleira só tem 25. TREZE sachês evaporaram!" O Detetive pega a calculadora: "Vamos descobrir quais sabores foram os mais roubados."*

---

**🔍 Conceito SQL deste nível: Subqueries (Consolidação)**

Agora vamos usar subqueries para **comparar valores** entre tabelas diferentes.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS estoque_comprado;
DROP TABLE IF EXISTS vendas_petshop;
DROP TABLE IF EXISTS estoque_real;

CREATE TABLE estoque_comprado (
    sabor TEXT PRIMARY KEY,
    quantidade_comprada INTEGER
);

INSERT INTO estoque_comprado VALUES ('Salmão', 40);
INSERT INTO estoque_comprado VALUES ('Atum', 25);
INSERT INTO estoque_comprado VALUES ('Frango', 20);
INSERT INTO estoque_comprado VALUES ('Fígado', 15);

CREATE TABLE vendas_petshop (
    id INTEGER PRIMARY KEY,
    sabor TEXT,
    quantidade_vendida INTEGER,
    mes TEXT
);

INSERT INTO vendas_petshop VALUES (1, 'Salmão', 18, 'Março');
INSERT INTO vendas_petshop VALUES (2, 'Atum', 12, 'Março');
INSERT INTO vendas_petshop VALUES (3, 'Frango', 15, 'Março');
INSERT INTO vendas_petshop VALUES (4, 'Fígado', 10, 'Março');
INSERT INTO vendas_petshop VALUES (5, 'Salmão', 5, 'Abril');
INSERT INTO vendas_petshop VALUES (6, 'Atum', 2, 'Abril');

CREATE TABLE estoque_real (
    sabor TEXT PRIMARY KEY,
    quantidade_na_prateleira INTEGER
);

INSERT INTO estoque_real VALUES ('Salmão', 7);
INSERT INTO estoque_real VALUES ('Atum', 8);
INSERT INTO estoque_real VALUES ('Frango', 5);
INSERT INTO estoque_real VALUES ('Fígado', 5);
```

---

**🎯 Missão:**
Para cada sabor, calcule:
1. **Comprado** - **Vendido** = **Deveria ter** (usando subquery para somar vendas)
2. Compare com o **estoque real**
3. A **diferença** é o que foi roubado!

---

**✅ Script de Solução:**
```sql
SELECT 
    ec.sabor,
    ec.quantidade_comprada AS comprado,
    (SELECT SUM(v.quantidade_vendida) FROM vendas_petshop v WHERE v.sabor = ec.sabor) AS vendido,
    ec.quantidade_comprada - (SELECT SUM(v.quantidade_vendida) FROM vendas_petshop v WHERE v.sabor = ec.sabor) AS deveria_ter,
    er.quantidade_na_prateleira AS tem_na_prateleira,
    ec.quantidade_comprada - (SELECT SUM(v.quantidade_vendida) FROM vendas_petshop v WHERE v.sabor = ec.sabor) - er.quantidade_na_prateleira AS roubado
FROM estoque_comprado ec
INNER JOIN estoque_real er ON ec.sabor = er.sabor
ORDER BY roubado DESC;
```

**📋 Resultado:**

| sabor | comprado | vendido | deveria_ter | tem_na_prateleira | roubado |
|-------|----------|---------|-------------|-------------------|---------|
| Salmão | 40 | 23 | 17 | 7 | **10** |
| Atum | 25 | 14 | 11 | 8 | **3** |
| Fígado | 15 | 10 | 5 | 5 | **0** |
| Frango | 20 | 15 | 5 | 5 | **0** |

---

**🔎 Conclusão:**
> **13 sachês roubados!** E o padrão é claro: **10 de salmão** e **3 de atum**. Zero de fígado e frango. Os ladrões têm paladar refinado — confirmando o modus operandi da rede felina!
>
> *"Salmão é o alvo número 1. Sempre foi. E 10 unidades é muito — isso é uma operação comercial, não gulodice."*
>
> 🐾 **O petshop confirma: sachês de salmão são a moeda do crime, Detetive...**
