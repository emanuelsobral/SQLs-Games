---
## 🐾 Nível 43: A Declaração do Informante
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
Salsicha, o dachshund informante, finalmente "depõe" (o Detetive interpreta seus latidos com dados da câmera). O depoimento tem múltiplas etapas lógicas: primeiro identificar os suspeitos, depois suas ações, depois os resultados. Para organizar essa consulta complexa, o Detetive usa CTEs — Common Table Expressions — que quebram a query em etapas nomeadas.

**🎬 Introdução:**
*"Salsicha viu tudo", narra o Detetive, organizando as evidências. "Mas para contar a história em etapas lógicas, preciso estruturar minha query. CTEs são como parágrafos — cada um conta uma parte da história."*

---

**🔍 Conceito SQL deste nível: CTEs (`WITH ... AS`)**

CTEs (Common Table Expressions) criam **tabelas temporárias nomeadas** dentro da query. Tornam queries complexas **legíveis**!

```sql
WITH suspeitos_ativos AS (
    SELECT nome, funcao FROM membros WHERE status = 'Ativo'
),
incidentes_graves AS (
    SELECT nome, COUNT(*) AS total FROM incidentes WHERE gravidade = 'Grave' GROUP BY nome
)
SELECT s.nome, s.funcao, COALESCE(i.total, 0) AS incidentes_graves
FROM suspeitos_ativos s
LEFT JOIN incidentes_graves i ON s.nome = i.nome;
```

> 💡 Cada CTE é como um "passo" da investigação, nomeado e reutilizável!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS registro_camera_salsicha;

CREATE TABLE registro_camera_salsicha (
    id INTEGER PRIMARY KEY,
    data TEXT,
    horario TEXT,
    nome_visto TEXT,
    acao TEXT,
    local_evento TEXT,
    gravidade TEXT
);

INSERT INTO registro_camera_salsicha VALUES (1,  '2024-04-25', '22:00', 'General Bigodão', 'Fazendo ronda no portão', 'Portão Dona Clotilde', 'Leve');
INSERT INTO registro_camera_salsicha VALUES (2,  '2024-04-25', '22:30', 'Mingau', 'Entrando no petshop pela porta dos fundos', 'Petshop', 'Grave');
INSERT INTO registro_camera_salsicha VALUES (3,  '2024-04-25', '22:45', 'Mingau', 'Saindo com 4 sachês na boca', 'Petshop', 'Grave');
INSERT INTO registro_camera_salsicha VALUES (4,  '2024-04-25', '23:00', 'Capitão Frajola', 'Recebendo sachês no telhado', 'Telhado Dona Clotilde', 'Grave');
INSERT INTO registro_camera_salsicha VALUES (5,  '2024-04-25', '23:15', 'Foguete', 'Saindo em velocidade com carga', 'Muro norte', 'Grave');
INSERT INTO registro_camera_salsicha VALUES (6,  '2024-04-25', '23:30', 'Princesa', 'Observando do telhado', 'Telhado Dona Clotilde', 'Leve');
INSERT INTO registro_camera_salsicha VALUES (7,  '2024-04-25', '23:30', 'Duquesa', 'Abrindo porta dos fundos petshop', 'Petshop', 'Grave');
INSERT INTO registro_camera_salsicha VALUES (8,  '2024-04-25', '23:45', 'Nestor', 'Levando sachê do armário para o telhado', 'Casa Dona Clotilde', 'Grave');
INSERT INTO registro_camera_salsicha VALUES (9,  '2024-04-26', '00:00', 'Capitão Frajola', 'Distribuindo sachês no telhado', 'Telhado Dona Clotilde', 'Grave');
INSERT INTO registro_camera_salsicha VALUES (10, '2024-04-26', '00:15', 'Bolinha', 'Dormindo na cozinha do Detetive', 'Casa Detetive', 'Leve');
```

---

**🎯 Missão:**
Organize o depoimento em 3 etapas com CTEs:
1. **Etapa 1 (CTE):** Listar apenas os eventos **graves**
2. **Etapa 2 (CTE):** Agrupar por suspeito e contar ações graves
3. **Query final:** Mostrar o ranking dos mais envolvidos, com detalhes

---

**✅ Script de Solução:**
```sql
WITH eventos_graves AS (
    SELECT nome_visto, acao, local_evento, horario
    FROM registro_camera_salsicha
    WHERE gravidade = 'Grave'
),
ranking_envolvimento AS (
    SELECT nome_visto, COUNT(*) AS acoes_graves
    FROM eventos_graves
    GROUP BY nome_visto
)
SELECT 
    r.nome_visto AS suspeito,
    r.acoes_graves,
    GROUP_CONCAT(e.acao, ' | ') AS descricao_acoes
FROM ranking_envolvimento r
INNER JOIN eventos_graves e ON r.nome_visto = e.nome_visto
GROUP BY r.nome_visto, r.acoes_graves
ORDER BY r.acoes_graves DESC;
```

**📋 Resultado:**

| suspeito | acoes_graves | descricao_acoes |
|----------|-------------|----------------|
| Mingau | 2 | Entrando no petshop pela porta dos fundos \| Saindo com 4 sachês na boca |
| Capitão Frajola | 2 | Recebendo sachês no telhado \| Distribuindo sachês no telhado |
| Foguete | 1 | Saindo em velocidade com carga |
| Duquesa | 1 | Abrindo porta dos fundos petshop |
| Nestor | 1 | Levando sachê do armário para o telhado |

---

**🔎 Conclusão:**
> O depoimento em 3 etapas revela: Mingau e Capitão Frajola lideram com 2 ações graves cada. A CTE organizou perfeitamente a lógica: filtrar → agrupar → apresentar.
>
> *"Salsicha viu tudo e latiu para as sombras, mas ninguém ouviu. Agora os dados falam por ele."*
>
> 🐾 **O depoimento está organizado, Detetive. Falta a reconstituição final...**
