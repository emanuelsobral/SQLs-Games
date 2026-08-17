---
## 🐾 Nível 27: O Ranking de Travessuras
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Para a reunião da Associação, o Detetive deve criar um **ranking de periculosidade** dos pets. Cada pet recebe pontos: 1 ponto por incidente leve, 3 por moderado e 5 por grave. O ranking final é calculado usando expressões no SELECT.

**🎬 Introdução:**
*"Precisamos de um sistema de pontuação", propõe o Detetive. "Gravidade × peso do incidente = pontuação de periculosidade. Vamos ranquear esses arteiros."*

---

**🔍 Conceito SQL deste nível: `AS` (Consolidação) com expressões complexas**

Combinando aliases com `CASE`-style calculations e múltiplas expressões aritméticas.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS ficha_incidentes;

CREATE TABLE ficha_incidentes (
    id INTEGER PRIMARY KEY,
    nome_pet TEXT,
    tipo_incidente TEXT,
    gravidade TEXT,
    pontos_gravidade INTEGER,
    local_incidente TEXT,
    data TEXT
);

INSERT INTO ficha_incidentes VALUES (1,  'Thor', 'Destruição de objeto', 'Grave', 5, 'Casa Pedrinho', '2024-03-10');
INSERT INTO ficha_incidentes VALUES (2,  'Thor', 'Destruição de jardim', 'Grave', 5, 'Jardim Dona Jurema', '2024-04-01');
INSERT INTO ficha_incidentes VALUES (3,  'Thor', 'Roubo de objeto', 'Moderado', 3, 'Casa Seu Agenor', '2024-03-22');
INSERT INTO ficha_incidentes VALUES (4,  'Thor', 'Derrubar varal', 'Moderado', 3, 'Quintal Seu Bartolomeu', '2024-03-28');
INSERT INTO ficha_incidentes VALUES (5,  'Bolinha', 'Roubo de ração', 'Leve', 1, 'Despensa Detetive', '2024-03-18');
INSERT INTO ficha_incidentes VALUES (6,  'Bolinha', 'Invasão noturna', 'Moderado', 3, 'Despensa Detetive', '2024-03-20');
INSERT INTO ficha_incidentes VALUES (7,  'Capitão Frajola', 'Roubo de sachê', 'Grave', 5, 'Despensa Detetive', '2024-03-22');
INSERT INTO ficha_incidentes VALUES (8,  'Capitão Frajola', 'Invasão de propriedade', 'Moderado', 3, 'Jardim Dona Jurema', '2024-04-01');
INSERT INTO ficha_incidentes VALUES (9,  'Capitão Frajola', 'Organização criminosa', 'Grave', 5, 'Telhado Dona Clotilde', '2024-04-10');
INSERT INTO ficha_incidentes VALUES (10, 'Mingau', 'Roubo de sachê', 'Grave', 5, 'Petshop', '2024-03-22');
INSERT INTO ficha_incidentes VALUES (11, 'Mingau', 'Invasão petshop', 'Grave', 5, 'Petshop', '2024-04-10');
INSERT INTO ficha_incidentes VALUES (12, 'Nestor', 'Roubo de sachê', 'Moderado', 3, 'Casa Dona Clotilde', '2024-03-22');
INSERT INTO ficha_incidentes VALUES (13, 'Princesa', 'Destruição de vaso', 'Leve', 1, 'Janela Dona Clotilde', '2024-03-15');
INSERT INTO ficha_incidentes VALUES (14, 'Foguete', 'Transporte de contrabando', 'Grave', 5, 'Muro norte', '2024-04-10');
```

---

**🎯 Missão:**
Crie o ranking com:
- `nome_pet` renomeado para `suspeito`
- `total_pontos` = soma dos pontos de gravidade
- `total_incidentes` = contagem de incidentes
- `media_gravidade` = média dos pontos
Ordene do mais perigoso ao menos perigoso.

---

**✅ Script de Solução:**
```sql
SELECT 
    nome_pet AS suspeito,
    COUNT(*) AS total_incidentes,
    SUM(pontos_gravidade) AS total_pontos,
    ROUND(AVG(pontos_gravidade), 1) AS media_gravidade
FROM ficha_incidentes
GROUP BY nome_pet
ORDER BY total_pontos DESC;
```

**📋 Resultado:**

| suspeito | total_incidentes | total_pontos | media_gravidade |
|----------|-----------------|-------------|-----------------|
| Thor | 4 | 16 | 4.0 |
| Capitão Frajola | 3 | 13 | 4.3 |
| Mingau | 2 | 10 | 5.0 |
| Bolinha | 2 | 4 | 2.0 |
| Foguete | 1 | 5 | 5.0 |
| Nestor | 1 | 3 | 3.0 |
| Princesa | 1 | 1 | 1.0 |

---

**🔎 Conclusão:**
> **Thor** lidera em pontos totais (16), mas **Mingau** e **Foguete** têm a média mais alta (5.0) — todos os incidentes deles são graves! **Capitão Frajola** é o mais equilibradamente perigoso (13 pontos, 4.3 média).
>
> *"Thor destrói, mas sem intenção. Capitão Frajola e Mingau agem com premeditação. Essa é a diferença."*
>
> 🐾 **O ranking está feito, Detetive. Os números não perdoam...**
