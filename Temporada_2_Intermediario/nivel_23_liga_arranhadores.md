---
## 🐾 Nível 23: A Liga dos Arranhadores
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Cercas, portões e troncos de árvore do bairro estão aparecendo com marcas de garra. Dona Jurema quer saber quais gatos marcam mais território — mas só está preocupada com quem marcou **pelo menos 3 locais diferentes**. Isso indicaria "expansão territorial agressiva".

**🎬 Introdução:**
*O Detetive Bigode percorre o bairro com uma câmera. Cercas arranhadas, postes marcados, troncos com sulcos profundos. "Isso é marcação de território clássica", ele murmura. "Mas quem está expandindo mais?"*

---

**🔍 Conceito SQL deste nível: `HAVING` (Consolidação)**

Agora vamos combinar `HAVING` com `GROUP BY` mais complexo e múltiplas condições!

```sql
-- Exemplo: gatos com mais de X locais E mais de Y marcações
SELECT nome_gato, COUNT(*) AS marcacoes, COUNT(DISTINCT local) AS locais
FROM arranhoes
GROUP BY nome_gato
HAVING COUNT(DISTINCT local) >= 3;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS marcacoes_territorio;

CREATE TABLE marcacoes_territorio (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    local_marcado TEXT,
    tipo_marca TEXT,
    profundidade TEXT,
    data TEXT
);

INSERT INTO marcacoes_territorio VALUES (1,  'Capitão Frajola', 'Cerca petshop', 'Garra vertical', 'Profunda', '2024-04-10');
INSERT INTO marcacoes_territorio VALUES (2,  'Capitão Frajola', 'Portão Dona Clotilde', 'Garra cruzada', 'Profunda', '2024-04-10');
INSERT INTO marcacoes_territorio VALUES (3,  'Capitão Frajola', 'Tronco jabuticabeira', 'Garra longa', 'Média', '2024-04-11');
INSERT INTO marcacoes_territorio VALUES (4,  'Capitão Frajola', 'Poste da esquina', 'Garra vertical', 'Profunda', '2024-04-12');
INSERT INTO marcacoes_territorio VALUES (5,  'General Bigodão', 'Lixeira da esquina', 'Garra horizontal', 'Profunda', '2024-04-10');
INSERT INTO marcacoes_territorio VALUES (6,  'General Bigodão', 'Banco da praça', 'Garra cruzada', 'Profunda', '2024-04-11');
INSERT INTO marcacoes_territorio VALUES (7,  'General Bigodão', 'Muro da escola', 'Garra horizontal', 'Profunda', '2024-04-12');
INSERT INTO marcacoes_territorio VALUES (8,  'Nestor', 'Cerca quintal Clotilde', 'Garra leve', 'Superficial', '2024-04-10');
INSERT INTO marcacoes_territorio VALUES (9,  'Nestor', 'Porta lavanderia', 'Garra vertical', 'Média', '2024-04-11');
INSERT INTO marcacoes_territorio VALUES (10, 'Princesa', 'Arranhador premium', 'Garra elegante', 'Superficial', '2024-04-10');
INSERT INTO marcacoes_territorio VALUES (11, 'Mingau', 'Porta dos fundos petshop', 'Garra sutil', 'Superficial', '2024-04-12');
INSERT INTO marcacoes_territorio VALUES (12, 'Bolinha', 'Sofá Detetive', 'Garra preguiçosa', 'Superficial', '2024-04-09');
```

---

**🎯 Missão:**
Use `GROUP BY` e `HAVING` para encontrar os gatos que marcaram **3 ou mais locais diferentes** — os "expansionistas" do bairro.

---

**✅ Script de Solução:**
```sql
SELECT nome_gato, COUNT(*) AS total_marcacoes, COUNT(DISTINCT local_marcado) AS locais_diferentes
FROM marcacoes_territorio
GROUP BY nome_gato
HAVING COUNT(DISTINCT local_marcado) >= 3
ORDER BY locais_diferentes DESC;
```

**📋 Resultado Esperado:**

| nome_gato | total_marcacoes | locais_diferentes |
|-----------|----------------|-------------------|
| Capitão Frajola | 4 | 4 |
| General Bigodão | 3 | 3 |

---

**🔎 Conclusão:**
> **Capitão Frajola** marca 4 locais estratégicos (cerca do petshop, portão da Dona Clotilde, árvore, poste). **General Bigodão** marca 3 (lixeira, praça, escola). Ambos estão expandindo território agressivamente — o primeiro perto do petshop, o segundo no perímetro do bairro.
>
> *"O Capitão marca o petshop como seu. O General marca as fronteiras. É uma divisão militar clássica."*
>
> 🐾 **O território está dividido e protegido, Detetive...**
