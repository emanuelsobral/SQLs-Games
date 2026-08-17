---
## 🐾 Nível 44: A Reconstituição
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
O Detetive deve reconstruir a linha do tempo completa de uma noite de operação usando CTEs encadeadas: preparação → execução → transporte → armazenamento. Cada CTE alimenta a próxima, criando uma narrativa passo-a-passo da operação criminosa.

**🎬 Introdução:**
*"Vou reconstituir a noite do dia 25 de abril em 4 fases. Cada fase é uma CTE que alimenta a próxima. No final, a história completa se revela."*

---

**🔍 Conceito SQL deste nível: CTEs Encadeadas (Consolidação)**

CTEs podem referenciar CTEs anteriores, criando uma cadeia lógica!

```sql
WITH fase1 AS (...),
     fase2 AS (SELECT ... FROM fase1 ...),
     fase3 AS (SELECT ... FROM fase2 ...)
SELECT * FROM fase3;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS log_operacao_25abril;

CREATE TABLE log_operacao_25abril (
    id INTEGER PRIMARY KEY,
    horario TEXT,
    agente TEXT,
    acao TEXT,
    fase TEXT,
    local_evento TEXT,
    itens_envolvidos TEXT,
    quantidade INTEGER
);

-- Fase 1: Preparação (21h-22h)
INSERT INTO log_operacao_25abril VALUES (1,  '21:00', 'Capitão Frajola', 'Inspecionou o telhado', 'Preparação', 'Telhado Dona Clotilde', NULL, 0);
INSERT INTO log_operacao_25abril VALUES (2,  '21:15', 'General Bigodão', 'Assumiu posição de sentinela', 'Preparação', 'Portão Dona Clotilde', NULL, 0);
INSERT INTO log_operacao_25abril VALUES (3,  '21:30', 'Duquesa', 'Destrancou porta dos fundos petshop', 'Preparação', 'Petshop', NULL, 0);

-- Fase 2: Execução (22h-23h)
INSERT INTO log_operacao_25abril VALUES (4,  '22:00', 'Mingau', 'Entrou no petshop', 'Execução', 'Petshop', 'Sachê salmão', 3);
INSERT INTO log_operacao_25abril VALUES (5,  '22:15', 'Mingau', 'Saiu com sachês', 'Execução', 'Petshop', 'Sachê salmão', 3);
INSERT INTO log_operacao_25abril VALUES (6,  '22:30', 'Nestor', 'Pegou sachês do armário', 'Execução', 'Casa Dona Clotilde', 'Sachê atum', 2);
INSERT INTO log_operacao_25abril VALUES (7,  '22:45', 'Princesa', 'Confirmou área limpa', 'Execução', 'Telhado Dona Clotilde', NULL, 0);

-- Fase 3: Transporte (23h-00h)  
INSERT INTO log_operacao_25abril VALUES (8,  '23:00', 'Mingau', 'Entregou sachês ao Frajola', 'Transporte', 'Telhado Dona Clotilde', 'Sachê salmão', 3);
INSERT INTO log_operacao_25abril VALUES (9,  '23:15', 'Nestor', 'Entregou sachês ao Frajola', 'Transporte', 'Telhado Dona Clotilde', 'Sachê atum', 2);
INSERT INTO log_operacao_25abril VALUES (10, '23:30', 'Capitão Frajola', 'Empacotou tudo para Foguete', 'Transporte', 'Telhado Dona Clotilde', 'Sachês mistos', 5);
INSERT INTO log_operacao_25abril VALUES (11, '23:45', 'Foguete', 'Saiu pela rota norte', 'Transporte', 'Muro norte', 'Sachês mistos', 5);

-- Fase 4: Armazenamento (00h+)
INSERT INTO log_operacao_25abril VALUES (12, '00:15', 'Foguete', 'Chegou ao galpão', 'Armazenamento', 'Galpão abandonado', 'Sachês mistos', 5);
INSERT INTO log_operacao_25abril VALUES (13, '00:30', 'Foguete', 'Organizou sachês na prateleira', 'Armazenamento', 'Galpão abandonado', 'Sachês mistos', 5);
INSERT INTO log_operacao_25abril VALUES (14, '01:00', 'General Bigodão', 'Encerrou vigilância', 'Armazenamento', 'Portão Dona Clotilde', NULL, 0);
```

---

**🎯 Missão:**
Use CTEs encadeadas para reconstruir a noite em 4 fases:
1. **CTE preparacao:** agentes e ações da fase 'Preparação'
2. **CTE execucao:** total de sachês roubados na fase 'Execução'
3. **CTE transporte:** rastrear a carga na fase 'Transporte'
4. **Query final:** resumo com agentes por fase e total de sachês movidos

---

**✅ Script de Solução:**
```sql
WITH preparacao AS (
    SELECT agente, acao, horario
    FROM log_operacao_25abril
    WHERE fase = 'Preparação'
),
execucao AS (
    SELECT agente, SUM(quantidade) AS saches_roubados
    FROM log_operacao_25abril
    WHERE fase = 'Execução' AND quantidade > 0
    GROUP BY agente
),
transporte AS (
    SELECT agente, acao, horario, quantidade
    FROM log_operacao_25abril
    WHERE fase = 'Transporte'
),
resumo_fases AS (
    SELECT fase, COUNT(DISTINCT agente) AS agentes_envolvidos, SUM(quantidade) AS total_itens
    FROM log_operacao_25abril
    GROUP BY fase
)
SELECT * FROM resumo_fases ORDER BY 
    CASE fase
        WHEN 'Preparação' THEN 1
        WHEN 'Execução' THEN 2
        WHEN 'Transporte' THEN 3
        WHEN 'Armazenamento' THEN 4
    END;
```

**📋 Resultado:**

| fase | agentes_envolvidos | total_itens |
|------|-------------------|-------------|
| Preparação | 3 | 0 |
| Execução | 3 | 8 |
| Transporte | 4 | 15 |
| Armazenamento | 2 | 10 |

---

**🔎 Conclusão:**
> A reconstituição completa em 4 fases: **3 agentes** preparam, **3** executam (roubando 8 sachês), **4** transportam e **2** armazenam. O ciclo dura **4 horas** (21h→01h). Uma máquina perfeita.
>
> *"A operação é como um relógio suíço. Cada gato sabe seu papel. Cada fase flui para a próxima. É hora de acabar com isso."*
>
> 🐾 **A reconstituição está completa, Detetive. Hora do confronto final!**
