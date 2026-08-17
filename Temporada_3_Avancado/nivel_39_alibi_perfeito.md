---
## 🐾 Nível 39: O Álibi Perfeito
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
Princesa e Duquesa alegam que têm álibis para as noites dos roubos — estavam em outros locais registrados por seus donos. O Detetive precisa verificar: para cada noite de roubo, EXISTE um registro das duas em outro local? Se existir, o álibi é válido. Se não, estão mentindo.

**🎬 Introdução:**
*"Princesa diz que dormia na cama da Dona Clotilde. Duquesa diz que estava no petshop arrumando prateleiras. Vamos ver se EXISTS um registro que confirme isso."*

---

**🔍 Conceito SQL deste nível: `EXISTS` / `NOT EXISTS`**

`EXISTS` verifica se uma subquery retorna **pelo menos uma linha**. Retorna TRUE ou FALSE.

```sql
-- Encontrar suspeitos que TÊM álibi
SELECT s.nome FROM suspeitos s
WHERE EXISTS (
    SELECT 1 FROM alibis a 
    WHERE a.nome = s.nome AND a.data = s.data_crime
);

-- Encontrar suspeitos que NÃO TÊM álibi
SELECT s.nome FROM suspeitos s
WHERE NOT EXISTS (
    SELECT 1 FROM alibis a 
    WHERE a.nome = s.nome AND a.data = s.data_crime
);
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS noites_roubo;
DROP TABLE IF EXISTS registros_alibi;

CREATE TABLE noites_roubo (
    id INTEGER PRIMARY KEY,
    data TEXT,
    suspeito TEXT,
    local_roubo TEXT
);

INSERT INTO noites_roubo VALUES (1, '2024-04-20', 'Princesa', 'Telhado Dona Clotilde');
INSERT INTO noites_roubo VALUES (2, '2024-04-21', 'Princesa', 'Telhado Dona Clotilde');
INSERT INTO noites_roubo VALUES (3, '2024-04-22', 'Princesa', 'Telhado Dona Clotilde');
INSERT INTO noites_roubo VALUES (4, '2024-04-20', 'Duquesa', 'Petshop');
INSERT INTO noites_roubo VALUES (5, '2024-04-21', 'Duquesa', 'Petshop');
INSERT INTO noites_roubo VALUES (6, '2024-04-22', 'Duquesa', 'Petshop');

CREATE TABLE registros_alibi (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    data TEXT,
    local_registrado TEXT,
    registrado_por TEXT
);

INSERT INTO registros_alibi VALUES (1, 'Princesa', '2024-04-20', 'Cama Dona Clotilde', 'Dona Clotilde');
INSERT INTO registros_alibi VALUES (2, 'Princesa', '2024-04-22', 'Cama Dona Clotilde', 'Dona Clotilde');
INSERT INTO registros_alibi VALUES (3, 'Duquesa', '2024-04-20', 'Petshop (dentro da loja)', 'Dona Margarete');
-- Nota: NÃO há álibi para Princesa dia 21 nem Duquesa dias 21 e 22
```

---

**🎯 Missão:**
1. Use `EXISTS` para ver quais noites cada suspeita **TEM** álibi
2. Use `NOT EXISTS` para ver quais noites **NÃO TÊM** álibi — são as noites em que participaram!

---

**✅ Script de Solução:**
```sql
-- 1. Noites COM álibi
SELECT n.data, n.suspeito, n.local_roubo, 'TEM ÁLIBI' AS status
FROM noites_roubo n
WHERE EXISTS (
    SELECT 1 FROM registros_alibi a 
    WHERE a.nome = n.suspeito AND a.data = n.data
);

-- 2. Noites SEM álibi (PARTICIPARAM!)
SELECT n.data, n.suspeito, n.local_roubo, 'SEM ÁLIBI — PARTICIPOU!' AS status
FROM noites_roubo n
WHERE NOT EXISTS (
    SELECT 1 FROM registros_alibi a 
    WHERE a.nome = n.suspeito AND a.data = n.data
);
```

**📋 Resultado (SEM álibi):**

| data | suspeito | local_roubo | status |
|------|----------|-------------|--------|
| 2024-04-21 | Princesa | Telhado Dona Clotilde | SEM ÁLIBI — PARTICIPOU! |
| 2024-04-21 | Duquesa | Petshop | SEM ÁLIBI — PARTICIPOU! |
| 2024-04-22 | Duquesa | Petshop | SEM ÁLIBI — PARTICIPOU! |

---

**🔎 Conclusão:**
> **Princesa** não tem álibi para o dia 21 — estava no telhado! **Duquesa** não tem álibi para os dias 21 E 22 — facilitou os roubos no petshop nessas noites. Os álibis do dia 20 são parcialmente verdadeiros, mas os demais dias? Busted!
>
> 🐾 **EXISTS não mente, Detetive. Os álibis foram desmontados...**
