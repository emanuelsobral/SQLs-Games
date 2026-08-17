---
## 🐾 Nível 42: O Dossiê Completo
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
O Detetive precisa montar o dossiê final de cada suspeito, puxando dados de múltiplas tabelas e preenchendo lacunas com COALESCE. A ficha deve incluir informações pessoais, total de incidentes, prejuízo causado e classificação de risco — tudo limpo e sem NULLs.

**🎬 Introdução:**
*"O dossiê perfeito: completo, sem lacunas e com classificação clara. Vou combinar COALESCE com JOINs e CASE WHEN."*

---

**🔍 Conceito SQL deste nível: `COALESCE` (Consolidação) + combinação de conceitos**

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS perfil_suspeito;
DROP TABLE IF EXISTS historico_incidentes;

CREATE TABLE perfil_suspeito (
    nome TEXT PRIMARY KEY,
    dono TEXT,
    raca TEXT,
    peso_kg REAL,
    vacinado TEXT
);

INSERT INTO perfil_suspeito VALUES ('Capitão Frajola', NULL, 'SRD', 5.0, NULL);
INSERT INTO perfil_suspeito VALUES ('Mingau', NULL, 'SRD', 4.3, NULL);
INSERT INTO perfil_suspeito VALUES ('Nestor', 'Dona Clotilde', 'SRD', 6.2, 'Sim');
INSERT INTO perfil_suspeito VALUES ('Princesa', 'Dona Clotilde', 'Persa', 4.1, 'Sim');
INSERT INTO perfil_suspeito VALUES ('Bolinha', 'Detetive Bigode', 'SRD', 7.8, 'Sim');

CREATE TABLE historico_incidentes (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    tipo TEXT,
    prejuizo REAL
);

INSERT INTO historico_incidentes VALUES (1, 'Capitão Frajola', 'Roubo', 85.00);
INSERT INTO historico_incidentes VALUES (2, 'Capitão Frajola', 'Invasão', 0.00);
INSERT INTO historico_incidentes VALUES (3, 'Capitão Frajola', 'Organização', 250.00);
INSERT INTO historico_incidentes VALUES (4, 'Mingau', 'Roubo', 120.00);
INSERT INTO historico_incidentes VALUES (5, 'Mingau', 'Invasão petshop', 60.00);
INSERT INTO historico_incidentes VALUES (6, 'Nestor', 'Roubo', 25.50);
INSERT INTO historico_incidentes VALUES (7, 'Princesa', 'Supervisão', 0.00);
INSERT INTO historico_incidentes VALUES (8, 'Bolinha', 'Cumplicidade', 0.00);
```

---

**🎯 Missão:**
Monte o dossiê combinando COALESCE, LEFT JOIN, CASE WHEN e GROUP BY:
- Dono: se NULL, mostrar 'Gato de rua'
- Vacinado: se NULL, 'Desconhecido'
- Total de incidentes e prejuízo por suspeito
- Classificação: Líder/Operativo/Cúmplice baseado no número de incidentes

---

**✅ Script de Solução:**
```sql
SELECT 
    p.nome,
    COALESCE(p.dono, 'Gato de rua') AS responsavel,
    p.raca,
    p.peso_kg,
    COALESCE(p.vacinado, 'Desconhecido') AS vacinado,
    COUNT(h.id) AS total_incidentes,
    COALESCE(SUM(h.prejuizo), 0) AS prejuizo_total,
    CASE 
        WHEN COUNT(h.id) >= 3 THEN '🔴 Líder/Principal'
        WHEN COUNT(h.id) >= 2 THEN '🟠 Operativo'
        ELSE '🟡 Cúmplice'
    END AS classificacao
FROM perfil_suspeito p
LEFT JOIN historico_incidentes h ON p.nome = h.nome
GROUP BY p.nome, p.dono, p.raca, p.peso_kg, p.vacinado
ORDER BY prejuizo_total DESC;
```

**📋 Resultado:**

| nome | responsavel | raca | peso_kg | vacinado | total_incidentes | prejuizo_total | classificacao |
|------|-----------|------|---------|----------|-----------------|---------------|--------------|
| Capitão Frajola | Gato de rua | SRD | 5.0 | Desconhecido | 3 | 335.00 | 🔴 Líder/Principal |
| Mingau | Gato de rua | SRD | 4.3 | Desconhecido | 2 | 180.00 | 🟠 Operativo |
| Nestor | Dona Clotilde | SRD | 6.2 | Sim | 1 | 25.50 | 🟡 Cúmplice |
| Bolinha | Detetive Bigode | SRD | 7.8 | Sim | 1 | 0.00 | 🟡 Cúmplice |
| Princesa | Dona Clotilde | Persa | 4.1 | Sim | 1 | 0.00 | 🟡 Cúmplice |

---

**🔎 Conclusão:**
> Dossiê completo! O Capitão Frajola lidera com R$335 em prejuízos. Todas as lacunas preenchidas, classificações claras. Pronto para a prefeitura.
>
> 🐾 **O dossiê está perfeito, Detetive. Faltam os depoimentos...**
