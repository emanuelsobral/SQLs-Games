---
## 🐾 Nível 32: Os Olheiros da Rua
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
General Bigodão posicionou "olheiros" (gatos sentinela) em ruas estratégicas. O Detetive quer descobrir quais olheiros monitoram as mesmas ruas que seus superiores frequentam, usando subquery correlacionada para cruzar a posição de cada olheiro com as rotas dos chefes.

**🎬 Introdução:**
*"Os sentinelas não ficam em posições aleatórias", percebe o Detetive. "Cada olheiro vigia a mesma rua por onde seu chefe passa. Preciso confirmar isso cruzando os dados."*

---

**🔍 Conceito SQL deste nível: Subqueries Correlacionadas (Consolidação)**

Agora usamos subqueries correlacionadas para **filtrar** — mostrando apenas olheiros cuja rua aparece nas rotas de seus superiores.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS posicoes_olheiros;
DROP TABLE IF EXISTS rotas_chefes;

CREATE TABLE posicoes_olheiros (
    id INTEGER PRIMARY KEY,
    nome_olheiro TEXT,
    rua_vigiada TEXT,
    turno TEXT,
    chefe_direto TEXT
);

INSERT INTO posicoes_olheiros VALUES (1, 'Sombra', 'Rua dos Ipês', 'Noite', 'General Bigodão');
INSERT INTO posicoes_olheiros VALUES (2, 'Trovão', 'Rua das Acácias', 'Noite', 'General Bigodão');
INSERT INTO posicoes_olheiros VALUES (3, 'Fantasminha', 'Rua do Comércio', 'Madrugada', 'General Bigodão');
INSERT INTO posicoes_olheiros VALUES (4, 'Nestor', 'Rua das Acácias', 'Noite', 'Mingau');
INSERT INTO posicoes_olheiros VALUES (5, 'Duquesa', 'Rua dos Ipês', 'Noite', 'Mingau');

CREATE TABLE rotas_chefes (
    id INTEGER PRIMARY KEY,
    nome_chefe TEXT,
    rua_frequentada TEXT,
    frequencia TEXT
);

INSERT INTO rotas_chefes VALUES (1, 'General Bigodão', 'Rua das Acácias', 'Diária');
INSERT INTO rotas_chefes VALUES (2, 'General Bigodão', 'Rua dos Ipês', 'Diária');
INSERT INTO rotas_chefes VALUES (3, 'Mingau', 'Rua dos Ipês', 'Diária');
INSERT INTO rotas_chefes VALUES (4, 'Mingau', 'Rua das Acácias', 'Ocasional');
INSERT INTO rotas_chefes VALUES (5, 'Capitão Frajola', 'Rua do Comércio', 'Semanal');
```

---

**🎯 Missão:**
Use subquery correlacionada para mostrar os olheiros cuja rua vigiada também é frequentada por seu chefe direto.

---

**✅ Script de Solução:**
```sql
SELECT o.nome_olheiro, o.rua_vigiada, o.chefe_direto
FROM posicoes_olheiros o
WHERE o.rua_vigiada IN (
    SELECT r.rua_frequentada 
    FROM rotas_chefes r 
    WHERE r.nome_chefe = o.chefe_direto
);
```

**📋 Resultado:**

| nome_olheiro | rua_vigiada | chefe_direto |
|-------------|-------------|-------------|
| Sombra | Rua dos Ipês | General Bigodão |
| Trovão | Rua das Acácias | General Bigodão |
| Nestor | Rua das Acácias | Mingau |
| Duquesa | Rua dos Ipês | Mingau |

---

**🔎 Conclusão:**
> 4 de 5 olheiros vigiam ruas que seus chefes frequentam — confirmação de que as posições são **estratégicas**! Apenas Fantasminha vigia a Rua do Comércio para o General, mas essa rua é do Capitão Frajola, não do General — indicando que Fantasminha pode responder a um nível mais alto.
>
> 🐾 **A rede de vigilância é militar, Detetive...**
