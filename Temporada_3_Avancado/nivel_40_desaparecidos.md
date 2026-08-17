---
## 🐾 Nível 40: Os Desaparecidos
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
Dona Margarete faz um inventário final: quais sachês do estoque NÃO EXISTEM mais na prateleira E NUNCA foram registrados como vendidos? Esses são os definitivamente roubados.

**🎬 Introdução:**
*"Se um sachê não está na prateleira e também não foi vendido, só pode ter sido roubado. NOT EXISTS vai revelar tudo."*

---

**🔍 Conceito SQL deste nível: `EXISTS / NOT EXISTS` (Consolidação)**

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS catalogo_saches;
DROP TABLE IF EXISTS prateleira_atual;
DROP TABLE IF EXISTS vendas_registradas;

CREATE TABLE catalogo_saches (
    codigo TEXT PRIMARY KEY,
    sabor TEXT,
    preco REAL
);

INSERT INTO catalogo_saches VALUES ('S001', 'Salmão', 8.50);
INSERT INTO catalogo_saches VALUES ('S002', 'Salmão', 8.50);
INSERT INTO catalogo_saches VALUES ('S003', 'Salmão', 8.50);
INSERT INTO catalogo_saches VALUES ('S004', 'Atum', 7.90);
INSERT INTO catalogo_saches VALUES ('S005', 'Atum', 7.90);
INSERT INTO catalogo_saches VALUES ('S006', 'Frango', 6.90);
INSERT INTO catalogo_saches VALUES ('S007', 'Frango', 6.90);
INSERT INTO catalogo_saches VALUES ('S008', 'Fígado', 5.50);

CREATE TABLE prateleira_atual (
    codigo TEXT PRIMARY KEY
);

INSERT INTO prateleira_atual VALUES ('S003');
INSERT INTO prateleira_atual VALUES ('S006');
INSERT INTO prateleira_atual VALUES ('S008');

CREATE TABLE vendas_registradas (
    id INTEGER PRIMARY KEY,
    codigo_sache TEXT,
    comprador TEXT,
    data TEXT
);

INSERT INTO vendas_registradas VALUES (1, 'S004', 'Dona Jurema', '2024-04-10');
INSERT INTO vendas_registradas VALUES (2, 'S007', 'Pedrinho', '2024-04-12');
```

---

**🎯 Missão:**
Encontre sachês que:
1. **NÃO existem** na prateleira atual
2. E que **NÃO foram vendidos** 
Esses são os **roubados**!

---

**✅ Script de Solução:**
```sql
SELECT c.codigo, c.sabor, c.preco
FROM catalogo_saches c
WHERE NOT EXISTS (
    SELECT 1 FROM prateleira_atual p WHERE p.codigo = c.codigo
)
AND NOT EXISTS (
    SELECT 1 FROM vendas_registradas v WHERE v.codigo_sache = c.codigo
);
```

**📋 Resultado:**

| codigo | sabor | preco |
|--------|-------|-------|
| S001 | Salmão | 8.50 |
| S002 | Salmão | 8.50 |
| S005 | Atum | 7.90 |

---

**🔎 Conclusão:**
> **3 sachês roubados confirmados**: 2 de salmão (R$17,00) e 1 de atum (R$7,90). Total: **R$24,90**. Novamente, salmão é o alvo principal. Nenhum sachê de fígado foi tocado — até ladrões felinos têm padrões.
>
> 🐾 **A prova material está completa, Detetive...**
