---
## 🐾 Nível 21: O Mapa das Sonecas
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Seu Agenor, eterno vigilante, mantém um registro dos locais favoritos de soneca dos gatos do bairro. Cada vez que vê um gato dormindo, ele anota o nome, o local e o horário. Ao agrupar esses dados, o Detetive pode descobrir onde os gatos se **concentram** durante o dia — e comparar com os locais das atividades suspeitas noturnas. Se um gato dorme perto do petshop durante o dia, pode estar "estudando o alvo".

**🎬 Introdução:**
*Seu Agenor abre um caderno grosso com o título "MAPA DE SONECAS DO BAIRRO - CONFIDENCIAL" escrito em letras garrafais. "Detetive, eu mapeei CADA soneca de CADA gato nos últimos 10 dias. Hora e local." O Detetive folheia: "Seu Agenor, isso é... incrivelmente detalhado." O velho responde com orgulho: "Vigilância é minha vida."*

---

**🔍 Conceito SQL deste nível: `GROUP BY` (Consolidação)**

Agora vamos usar `GROUP BY` com **múltiplas colunas** e combinando com **múltiplas funções de agregação**!

```sql
-- Agrupar por DUAS colunas
SELECT nome_gato, local_soneca, COUNT(*) AS vezes
FROM sonecas
GROUP BY nome_gato, local_soneca;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 21: O Mapa das Sonecas
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS registro_sonecas;

CREATE TABLE registro_sonecas (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    local_soneca TEXT,
    horario_inicio TEXT,
    duracao_minutos INTEGER,
    data TEXT
);

INSERT INTO registro_sonecas VALUES (1,  'Bolinha', 'Sofá Detetive', '14:00', 180, '2024-04-08');
INSERT INTO registro_sonecas VALUES (2,  'Bolinha', 'Cama Detetive', '10:00', 120, '2024-04-09');
INSERT INTO registro_sonecas VALUES (3,  'Bolinha', 'Sofá Detetive', '15:00', 200, '2024-04-10');
INSERT INTO registro_sonecas VALUES (4,  'Princesa', 'Janela Dona Clotilde', '11:00', 90, '2024-04-08');
INSERT INTO registro_sonecas VALUES (5,  'Princesa', 'Janela Dona Clotilde', '13:00', 75, '2024-04-09');
INSERT INTO registro_sonecas VALUES (6,  'Princesa', 'Telhado Dona Clotilde', '16:00', 60, '2024-04-10');
INSERT INTO registro_sonecas VALUES (7,  'Capitão Frajola', 'Muro do petshop', '12:00', 45, '2024-04-08');
INSERT INTO registro_sonecas VALUES (8,  'Capitão Frajola', 'Telhado Dona Clotilde', '14:00', 90, '2024-04-09');
INSERT INTO registro_sonecas VALUES (9,  'Capitão Frajola', 'Muro do petshop', '11:00', 60, '2024-04-10');
INSERT INTO registro_sonecas VALUES (10, 'Capitão Frajola', 'Muro do petshop', '13:00', 50, '2024-04-11');
INSERT INTO registro_sonecas VALUES (11, 'Mingau', 'Telhado Dona Clotilde', '09:00', 30, '2024-04-08');
INSERT INTO registro_sonecas VALUES (12, 'Mingau', 'Porta dos fundos petshop', '15:00', 40, '2024-04-09');
INSERT INTO registro_sonecas VALUES (13, 'Nestor', 'Quintal Dona Clotilde', '10:00', 120, '2024-04-08');
INSERT INTO registro_sonecas VALUES (14, 'Nestor', 'Quintal Dona Clotilde', '14:00', 150, '2024-04-10');
INSERT INTO registro_sonecas VALUES (15, 'Foguete', 'Muro norte do bairro', '08:00', 20, '2024-04-09');
INSERT INTO registro_sonecas VALUES (16, 'Foguete', 'Beco lateral', '16:00', 35, '2024-04-11');
```

---

**🎯 Missão:**
1. Agrupe por **gato + local** para ver onde cada gato dorme com mais frequência
2. Calcule o **tempo total de soneca por gato** para saber quem dorme mais
3. Encontre quais gatos dormem perto do **petshop**

---

**✅ Script de Solução:**
```sql
-- 1. Locais favoritos por gato (quantas vezes e tempo total)
SELECT nome_gato, local_soneca, COUNT(*) AS vezes, SUM(duracao_minutos) AS minutos_total
FROM registro_sonecas
GROUP BY nome_gato, local_soneca
ORDER BY nome_gato, vezes DESC;

-- 2. Ranking de dorminhoco (tempo total por gato)
SELECT nome_gato, SUM(duracao_minutos) AS total_minutos, COUNT(*) AS total_sonecas
FROM registro_sonecas
GROUP BY nome_gato
ORDER BY total_minutos DESC;
```

**📋 Resultado (Query 1 — Locais favoritos):**

| nome_gato | local_soneca | vezes | minutos_total |
|-----------|-------------|-------|---------------|
| Bolinha | Sofá Detetive | 2 | 380 |
| Bolinha | Cama Detetive | 1 | 120 |
| Capitão Frajola | Muro do petshop | 3 | 155 |
| Capitão Frajola | Telhado Dona Clotilde | 1 | 90 |
| Foguete | Muro norte do bairro | 1 | 20 |
| Foguete | Beco lateral | 1 | 35 |
| Mingau | Telhado Dona Clotilde | 1 | 30 |
| Mingau | Porta dos fundos petshop | 1 | 40 |
| Nestor | Quintal Dona Clotilde | 2 | 270 |
| Princesa | Janela Dona Clotilde | 2 | 165 |
| Princesa | Telhado Dona Clotilde | 1 | 60 |

---

**🔎 Conclusão:**
> **Caso encerrado!** Os locais de soneca revelam intenções! 😴🐱
>
> **Capitão Frajola** dorme no **muro do petshop 3 vezes** — mais do que em qualquer outro lugar! Ele está **vigiando o petshop durante o dia** disfarçado de soneca!
>
> **Mingau** dorme na **porta dos fundos do petshop** — a mesma porta que ele usou para invadir durante o Apagão!
>
> *O Detetive conecta os pontos: "De dia, Capitão Frajola estuda o petshop do muro. De noite, invade. Mingau reconhece a porta dos fundos. Foguete dorme perto do muro norte — sua rota de fuga. CADA local de soneca corresponde a uma função operacional."*
>
> 🐾 **As sonecas são fachada, Detetive. É reconhecimento de campo...**
