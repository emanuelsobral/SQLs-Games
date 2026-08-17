---
## 🐾 Nível 24: Os Turnos do Telhado
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Seu Agenor passou a registrar não só quem aparece no telhado, mas os horários exatos. O Detetive percebeu que os gatos se revezam em "turnos". Para mapear os turnos, ele precisa saber os **horários únicos** em que as visitas acontecem, sem repetições.

**🎬 Introdução:**
*"Os gatos não ficam todos ao mesmo tempo", explica o Detetive ao analisar os dados. "Eles se REVEZAM. Mas quais são os horários dos turnos? Preciso listar os horários ÚNICOS, sem duplicata."*

---

**🔍 Conceito SQL deste nível: `DISTINCT`**

O `DISTINCT` remove duplicatas dos resultados, retornando apenas valores **únicos**!

```sql
-- Sem DISTINCT: pode ter repetições
SELECT horario FROM visitas; -- 22:00, 22:00, 23:00, 23:00, 23:00

-- Com DISTINCT: valores únicos
SELECT DISTINCT horario FROM visitas; -- 22:00, 23:00
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS visitas_telhado;

CREATE TABLE visitas_telhado (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    horario TEXT,
    data TEXT,
    funcao TEXT
);

INSERT INTO visitas_telhado VALUES (1,  'General Bigodão', '22:00', '2024-04-15', 'Sentinela');
INSERT INTO visitas_telhado VALUES (2,  'Capitão Frajola', '23:00', '2024-04-15', 'Líder');
INSERT INTO visitas_telhado VALUES (3,  'Mingau', '23:00', '2024-04-15', 'Operativo');
INSERT INTO visitas_telhado VALUES (4,  'Princesa', '23:00', '2024-04-15', 'Supervisora');
INSERT INTO visitas_telhado VALUES (5,  'Foguete', '00:00', '2024-04-15', 'Entregador');
INSERT INTO visitas_telhado VALUES (6,  'General Bigodão', '22:00', '2024-04-16', 'Sentinela');
INSERT INTO visitas_telhado VALUES (7,  'Capitão Frajola', '23:00', '2024-04-16', 'Líder');
INSERT INTO visitas_telhado VALUES (8,  'Nestor', '23:00', '2024-04-16', 'Operativo');
INSERT INTO visitas_telhado VALUES (9,  'Foguete', '00:00', '2024-04-16', 'Entregador');
INSERT INTO visitas_telhado VALUES (10, 'General Bigodão', '22:00', '2024-04-17', 'Sentinela');
INSERT INTO visitas_telhado VALUES (11, 'Capitão Frajola', '23:00', '2024-04-17', 'Líder');
INSERT INTO visitas_telhado VALUES (12, 'Mingau', '23:30', '2024-04-17', 'Operativo');
INSERT INTO visitas_telhado VALUES (13, 'Foguete', '00:30', '2024-04-17', 'Entregador');
```

---

**🎯 Missão:**
1. Liste os **horários únicos** dos turnos no telhado
2. Liste as **funções únicas** que existem na operação
3. Liste as **combinações únicas** de horário + função

---

**✅ Script de Solução:**
```sql
-- 1. Horários únicos dos turnos
SELECT DISTINCT horario FROM visitas_telhado ORDER BY horario;

-- 2. Funções únicas na operação
SELECT DISTINCT funcao FROM visitas_telhado;

-- 3. Combinação turno-função
SELECT DISTINCT horario, funcao FROM visitas_telhado ORDER BY horario;
```

**📋 Resultado (Horários únicos):**

| horario |
|---------|
| 22:00 |
| 23:00 |
| 23:30 |
| 00:00 |
| 00:30 |

**📋 Resultado (Combinação turno-função):**

| horario | funcao |
|---------|--------|
| 22:00 | Sentinela |
| 23:00 | Líder |
| 23:00 | Operativo |
| 23:00 | Supervisora |
| 23:30 | Operativo |
| 00:00 | Entregador |
| 00:30 | Entregador |

---

**🔎 Conclusão:**
> **Turnos mapeados!** A operação funciona como um relógio:
> - **22:00** — Sentinela (General Bigodão) faz a ronda
> - **23:00** — Líder + Operativos + Supervisora — reunião principal
> - **00:00-00:30** — Entregador (Foguete) faz as corridas
>
> *"É uma operação militar. Vigiar, reunir, executar."*
>
> 🐾 **O cronograma está decifrado, Detetive...**
