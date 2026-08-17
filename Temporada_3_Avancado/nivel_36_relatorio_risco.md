---
## 🐾 Nível 36: O Relatório de Risco
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
Dona Jurema precisa de um relatório classificando cada membro do esquema por nível de risco usando critérios numéricos e CASE WHEN com múltiplas condições combinadas.

**🎬 Introdução:**
*"A prefeitura quer um relatório de risco", explica Dona Jurema. "Cada animal precisa de uma classificação: Crítico, Alto, Médio ou Baixo. Baseado em número de incidentes, valor do prejuízo e posição na hierarquia."*

---

**🔍 Conceito SQL deste nível: `CASE WHEN` (Consolidação)**

CASE WHEN com cálculos e múltiplas condições aninhadas.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS dossie_completo;

CREATE TABLE dossie_completo (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    total_incidentes INTEGER,
    prejuizo_total REAL,
    nivel_hierarquia INTEGER,
    tem_dono TEXT,
    vacinado TEXT
);

INSERT INTO dossie_completo VALUES (1, 'Capitão Frajola', 8, 250.00, 1, 'Não', 'Não');
INSERT INTO dossie_completo VALUES (2, 'Mingau', 7, 180.00, 2, 'Não', 'Não');
INSERT INTO dossie_completo VALUES (3, 'Thor', 6, 320.00, 0, 'Sim', 'Sim');
INSERT INTO dossie_completo VALUES (4, 'General Bigodão', 4, 0.00, 2, 'Não', 'Não');
INSERT INTO dossie_completo VALUES (5, 'Foguete', 3, 0.00, 2, 'Não', 'Não');
INSERT INTO dossie_completo VALUES (6, 'Nestor', 4, 85.00, 3, 'Sim', 'Sim');
INSERT INTO dossie_completo VALUES (7, 'Princesa', 3, 120.00, 3, 'Sim', 'Sim');
INSERT INTO dossie_completo VALUES (8, 'Duquesa', 2, 0.00, 3, 'Sim', 'Sim');
INSERT INTO dossie_completo VALUES (9, 'Bolinha', 4, 76.50, 4, 'Sim', 'Sim');
INSERT INTO dossie_completo VALUES (10, 'Salsicha', 1, 0.00, 0, 'Sim', 'Sim');
```

---

**🎯 Missão:**
Classifique cada membro:
- **Crítico**: incidentes ≥ 7 OU nível hierárquico = 1
- **Alto**: incidentes ≥ 4 E prejuízo > 50
- **Médio**: incidentes ≥ 2
- **Baixo**: demais

---

**✅ Script de Solução:**
```sql
SELECT 
    nome,
    total_incidentes,
    prejuizo_total,
    nivel_hierarquia,
    CASE 
        WHEN total_incidentes >= 7 OR nivel_hierarquia = 1 THEN '🔴 Crítico'
        WHEN total_incidentes >= 4 AND prejuizo_total > 50 THEN '🟠 Alto'
        WHEN total_incidentes >= 2 THEN '🟡 Médio'
        ELSE '🟢 Baixo'
    END AS nivel_risco,
    CASE
        WHEN tem_dono = 'Não' THEN 'Sem dono — difícil de controlar'
        ELSE 'Tem dono — responsabilizar dono'
    END AS estrategia
FROM dossie_completo
ORDER BY 
    CASE 
        WHEN total_incidentes >= 7 OR nivel_hierarquia = 1 THEN 1
        WHEN total_incidentes >= 4 AND prejuizo_total > 50 THEN 2
        WHEN total_incidentes >= 2 THEN 3
        ELSE 4
    END;
```

**📋 Resultado:**

| nome | total_incidentes | prejuizo_total | nivel_hierarquia | nivel_risco | estrategia |
|------|-----------------|---------------|-----------------|-------------|-----------|
| Capitão Frajola | 8 | 250.00 | 1 | 🔴 Crítico | Sem dono — difícil de controlar |
| Mingau | 7 | 180.00 | 2 | 🔴 Crítico | Sem dono — difícil de controlar |
| Thor | 6 | 320.00 | 0 | 🟠 Alto | Tem dono — responsabilizar dono |
| Nestor | 4 | 85.00 | 3 | 🟠 Alto | Tem dono — responsabilizar dono |
| Bolinha | 4 | 76.50 | 4 | 🟠 Alto | Tem dono — responsabilizar dono |
| General Bigodão | 4 | 0.00 | 2 | 🟡 Médio | Sem dono — difícil de controlar |
| Princesa | 3 | 120.00 | 3 | 🟡 Médio | Tem dono — responsabilizar dono |
| Foguete | 3 | 0.00 | 2 | 🟡 Médio | Sem dono — difícil de controlar |
| Duquesa | 2 | 0.00 | 3 | 🟡 Médio | Tem dono — responsabilizar dono |
| Salsicha | 1 | 0.00 | 0 | 🟢 Baixo | Tem dono — responsabilizar dono |

---

**🔎 Conclusão:**
> Dois **Críticos** (Capitão Frajola e Mingau) — ambos sem dono! Três **Altos** — Thor por destruição, Nestor e Bolinha por envolvimento na rede. O relatório vai para a prefeitura.
>
> 🐾 **Os dados falam, Detetive. A pressão sobre o esquema aumenta...**
