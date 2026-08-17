---
## 🐾 Nível 5: A Trilha de Pegadas Misteriosas
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Após uma noite chuvosa, o Detetive Bigode acorda e descobre pegadas de lama por toda a casa. Elas vão da porta dos fundos até a cozinha, passam pela sala, sobem no sofá e terminam... na sua cama. Alguém entrou pela porta dos fundos durante a chuva e passeou pela casa inteira. Felizmente, a câmera de segurança com sensor de movimento registrou cada passagem com timestamp. Ao analisar a ordem cronológica, o Detetive pode reconstruir a rota do invasor lamacento.

**🎬 Introdução:**
*O Detetive Bigode coloca os pés no chão ao acordar e... SQUELCH. Lama. Ele olha para baixo: pegadas de pata sujam o tapete do quarto. Segue o rastro com os olhos: as pegadas vêm da porta, passam pelo corredor, entram na sala, sobem no sofá (LAMA NO SOFÁ!) e entram no quarto.*

*"Isso é uma invasão domiciliar!", exclama o Detetive, e depois percebe que está sendo dramático demais para pegadas de animal. Mas a cena é clara: alguém entrou pela porta dos fundos (que estava destrancada — nota mental: trancar a porta), passeou pela casa toda e aparentemente dormiu na cama do Detetive.*

*Ao lado do travesseiro, dormindo tranquilamente, está Mingau — o gato preto misterioso que não é oficialmente de ninguém, mas aparece quando quer. Seus patas? Impecavelmente limpas. "Ele limpou as patas", pensa o Detetive. "Esse gato é bom."*

---

**🔍 Conceito SQL deste nível: `ORDER BY`**

Agora você vai aprender a **ordenar** os resultados da sua consulta! Isso é essencial para reconstruir linhas do tempo.

- `ORDER BY coluna` = ordena em ordem crescente (A→Z, 1→9, cedo→tarde)
- `ORDER BY coluna ASC` = mesma coisa (ASC é o padrão)
- `ORDER BY coluna DESC` = ordem decrescente (Z→A, 9→1, tarde→cedo)

**Sintaxe:**
```sql
SELECT * FROM tabela ORDER BY coluna;
SELECT * FROM tabela ORDER BY coluna DESC;
```

**Exemplo:**
```sql
-- Ordenar eventos do mais antigo ao mais recente
SELECT * FROM eventos ORDER BY horario ASC;

-- Ordenar notas da maior para menor
SELECT aluno, nota FROM provas ORDER BY nota DESC;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 5: A Trilha de Pegadas Misteriosas
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS registro_pegadas;

CREATE TABLE registro_pegadas (
    id INTEGER PRIMARY KEY,
    comodo TEXT,
    horario TEXT,
    tamanho_pegada_cm REAL,
    tipo_pegada TEXT,
    quantidade_lama TEXT
);

-- Registros do sensor de movimento com as pegadas detectadas
INSERT INTO registro_pegadas VALUES (1, 'Sala de estar', '02:35', 4.5, 'Felina', 'Média');
INSERT INTO registro_pegadas VALUES (2, 'Porta dos fundos', '02:20', 4.5, 'Felina', 'Muita');
INSERT INTO registro_pegadas VALUES (3, 'Quarto do Detetive', '02:55', 4.5, 'Felina', 'Pouca');
INSERT INTO registro_pegadas VALUES (4, 'Cozinha', '02:25', 4.5, 'Felina', 'Muita');
INSERT INTO registro_pegadas VALUES (5, 'Corredor', '02:30', 4.5, 'Felina', 'Média');
INSERT INTO registro_pegadas VALUES (6, 'Sofá (em cima)', '02:40', 4.5, 'Felina', 'Média');
INSERT INTO registro_pegadas VALUES (7, 'Banheiro', '02:45', 4.5, 'Felina', 'Pouca');
INSERT INTO registro_pegadas VALUES (8, 'Corredor (volta)', '02:50', 4.5, 'Felina', 'Pouca');
```

---

**🎯 Missão:**
As pegadas foram registradas fora de ordem na tabela! Para reconstruir a **rota exata** do invasor, você precisa **ordenar os registros por horário** (do mais cedo ao mais tarde).

Descubra: por onde o invasor entrou, qual caminho percorreu e onde terminou?

---

**💡 Dica:**
> Use `ORDER BY horario` para colocar os registros em ordem cronológica. A coluna `quantidade_lama` vai te ajudar a confirmar a direção: quanto mais cedo (mais perto da entrada), mais lama!

---

**✅ Script de Solução:**
```sql
-- Reconstruir a rota do invasor em ordem cronológica
SELECT horario, comodo, quantidade_lama
FROM registro_pegadas
ORDER BY horario ASC;
```

**📋 Resultado Esperado:**

| horario | comodo | quantidade_lama |
|---------|--------|-----------------|
| 02:20 | Porta dos fundos | Muita |
| 02:25 | Cozinha | Muita |
| 02:30 | Corredor | Média |
| 02:35 | Sala de estar | Média |
| 02:40 | Sofá (em cima) | Média |
| 02:45 | Banheiro | Pouca |
| 02:50 | Corredor (volta) | Pouca |
| 02:55 | Quarto do Detetive | Pouca |

---

**🔎 Conclusão:**
> **Caso encerrado!** O invasor lamacento é o **Mingau**! 🐱‍👤
>
> A rota reconstruída conta a história completa:
> 1. **02:20** — Entrou pela **porta dos fundos** (muita lama — acabou de pisar na chuva)
> 2. **02:25** — Passou pela **cozinha** (provavelmente procurando comida)
> 3. **02:30** → **02:35** — Atravessou **corredor** → **sala de estar**
> 4. **02:40** — Subiu no **sofá** (LAMA NO SOFÁ!)
> 5. **02:45** — Parou no **banheiro** (gatos e suas necessidades...)
> 6. **02:50** → **02:55** — Voltou pelo **corredor** até o **quarto do Detetive**
>
> Note como a quantidade de lama diminui ao longo do trajeto (de "Muita" para "Pouca") — as patas foram se limpando conforme andava. Pegada de 4,5 cm, tipo felina: perfil exato do Mingau.
>
> *O Detetive olha para Mingau, que ronrona satisfeito no travesseiro. "Você invadiu minha casa, sujou meu sofá e dormiu na minha cama." Mingau pisca lentamente — no idioma dos gatos, isso significa 'eu te amo'. Ou 'não me importo'. É difícil saber.*
>
> *Nota no caderninho: "Mingau aparece e desaparece como fantasma. Usa a porta dos fundos. Possível agente de campo? Investigar."*
>
> 🐾 **Mingau sabe mais do que mostra, Detetive. Fique atento...**
