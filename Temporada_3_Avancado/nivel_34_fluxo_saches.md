---
## 🐾 Nível 34: O Fluxo dos Sachês
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
O Detetive quer rastrear um sachê individual desde a compra no fornecedor até o destino final, cruzando 4 tabelas: fornecedor → petshop → roubo → destino. É a cadeia completa de custódia.

**🎬 Introdução:**
*"Cada sachê tem uma jornada. Nasceu no fornecedor, chegou ao petshop, foi roubado e parou no galpão. Quero rastrear TODO o caminho."*

---

**🔍 Conceito SQL deste nível: Múltiplos JOINs (Consolidação — 4 tabelas)**

Encadeando 4 JOINs para rastrear uma entidade do início ao fim.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS lote_fornecedor;
DROP TABLE IF EXISTS recebimento_petshop;
DROP TABLE IF EXISTS registro_roubo;
DROP TABLE IF EXISTS destino_final;

CREATE TABLE lote_fornecedor (
    lote_id TEXT PRIMARY KEY,
    fornecedor TEXT,
    sabor TEXT,
    quantidade INTEGER,
    data_fabricacao TEXT
);

INSERT INTO lote_fornecedor VALUES ('LOTE-A1', 'PetFood Brasil', 'Salmão', 50, '2024-03-01');
INSERT INTO lote_fornecedor VALUES ('LOTE-B1', 'PetFood Brasil', 'Atum', 30, '2024-03-01');
INSERT INTO lote_fornecedor VALUES ('LOTE-C1', 'Ração Premium Ltda', 'Frango', 40, '2024-03-05');

CREATE TABLE recebimento_petshop (
    id INTEGER PRIMARY KEY,
    lote_id TEXT,
    data_recebimento TEXT,
    quantidade_recebida INTEGER,
    conferido_por TEXT
);

INSERT INTO recebimento_petshop VALUES (1, 'LOTE-A1', '2024-03-05', 50, 'Dona Margarete');
INSERT INTO recebimento_petshop VALUES (2, 'LOTE-B1', '2024-03-05', 30, 'Dona Margarete');
INSERT INTO recebimento_petshop VALUES (3, 'LOTE-C1', '2024-03-08', 40, 'Funcionário Carlos');

CREATE TABLE registro_roubo (
    id INTEGER PRIMARY KEY,
    lote_id TEXT,
    quantidade_roubada INTEGER,
    ladrao TEXT,
    data_roubo TEXT
);

INSERT INTO registro_roubo VALUES (1, 'LOTE-A1', 10, 'Mingau', '2024-03-20');
INSERT INTO registro_roubo VALUES (2, 'LOTE-A1', 4, 'Capitão Frajola', '2024-03-22');
INSERT INTO registro_roubo VALUES (3, 'LOTE-B1', 3, 'Mingau', '2024-04-01');
INSERT INTO registro_roubo VALUES (4, 'LOTE-C1', 0, NULL, NULL);

CREATE TABLE destino_final (
    id INTEGER PRIMARY KEY,
    lote_id TEXT,
    local_destino TEXT,
    quantidade_encontrada INTEGER,
    data_apreensao TEXT
);

INSERT INTO destino_final VALUES (1, 'LOTE-A1', 'Galpão abandonado norte', 12, '2024-04-18');
INSERT INTO destino_final VALUES (2, 'LOTE-B1', 'Galpão abandonado norte', 3, '2024-04-18');
INSERT INTO destino_final VALUES (3, 'LOTE-A1', 'Casinha do parque', 2, '2024-04-18');
```

---

**🎯 Missão:**
Rastreie o LOTE-A1 (Salmão) do fornecedor ao destino usando 4 JOINs. Quantos foram fabricados, recebidos, roubados e encontrados?

---

**✅ Script de Solução:**
```sql
SELECT 
    f.lote_id,
    f.fornecedor,
    f.sabor,
    f.quantidade AS fabricados,
    rp.quantidade_recebida AS recebidos_petshop,
    rr.quantidade_roubada AS roubados,
    rr.ladrao,
    df.local_destino AS encontrado_em,
    df.quantidade_encontrada AS recuperados
FROM lote_fornecedor f
INNER JOIN recebimento_petshop rp ON f.lote_id = rp.lote_id
INNER JOIN registro_roubo rr ON f.lote_id = rr.lote_id
LEFT JOIN destino_final df ON f.lote_id = df.lote_id
WHERE f.lote_id = 'LOTE-A1';
```

**📋 Resultado:**

| lote_id | fornecedor | sabor | fabricados | recebidos_petshop | roubados | ladrao | encontrado_em | recuperados |
|---------|-----------|-------|-----------|-------------------|----------|--------|---------------|-------------|
| LOTE-A1 | PetFood Brasil | Salmão | 50 | 50 | 10 | Mingau | Galpão abandonado norte | 12 |
| LOTE-A1 | PetFood Brasil | Salmão | 50 | 50 | 10 | Mingau | Casinha do parque | 2 |
| LOTE-A1 | PetFood Brasil | Salmão | 50 | 50 | 4 | Capitão Frajola | Galpão abandonado norte | 12 |
| LOTE-A1 | PetFood Brasil | Salmão | 50 | 50 | 4 | Capitão Frajola | Casinha do parque | 2 |

---

**🔎 Conclusão:**
> LOTE-A1: 50 fabricados → 50 recebidos → 14 roubados (10 Mingau + 4 Frajola) → 14 recuperados (12 galpão + 2 casinha). **A conta fecha!** Todos os sachês roubados foram recuperados nos depósitos.
>
> 🐾 **Rastreabilidade completa, Detetive. Cada sachê conta uma história...**
