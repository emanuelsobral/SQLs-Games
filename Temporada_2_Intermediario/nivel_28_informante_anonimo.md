---
## 🐾 Nível 28: O Informante Anônimo
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Uma denúncia anônima chega à caixa de correio do Detetive: "O gato mais visto perto do petshop nas últimas duas semanas é o líder de tudo." O Detetive precisa descobrir QUAL gato é esse. Mas em vez de contar manualmente, ele pode usar uma **subquery** — um SELECT dentro de outro SELECT — para automatizar a busca.

**🎬 Introdução:**
*O Detetive encontra um bilhete sem remetente: "Procure o gato com mais avistamentos perto do petshop. Ele é o cérebro." O Detetive pensa: "Eu poderia contar manualmente... ou eu posso fazer o SQL fazer o trabalho por mim. Uma consulta dentro de outra consulta."*

---

**🔍 Conceito SQL deste nível: Subqueries (SELECT dentro de SELECT)**

Uma **subquery** é um SELECT completo usado dentro de outro SELECT, geralmente no WHERE!

```sql
-- Subquery no WHERE
SELECT nome FROM pets 
WHERE peso_kg = (SELECT MAX(peso_kg) FROM pets);
-- "Encontre o pet cujo peso é igual ao peso máximo"

-- Subquery no FROM (como uma tabela temporária)
SELECT * FROM (SELECT nome, COUNT(*) AS total FROM avistamentos GROUP BY nome) AS sub
WHERE sub.total > 3;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS avistamentos_petshop;

CREATE TABLE avistamentos_petshop (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    local_avistamento TEXT,
    data TEXT,
    horario TEXT,
    atividade TEXT
);

INSERT INTO avistamentos_petshop VALUES (1,  'Capitão Frajola', 'Muro do petshop', '2024-04-10', '12:00', 'Observando a loja');
INSERT INTO avistamentos_petshop VALUES (2,  'Capitão Frajola', 'Calçada petshop', '2024-04-11', '11:00', 'Dormindo (vigiando)');
INSERT INTO avistamentos_petshop VALUES (3,  'Mingau', 'Porta dos fundos petshop', '2024-04-11', '23:00', 'Rondando');
INSERT INTO avistamentos_petshop VALUES (4,  'Capitão Frajola', 'Muro do petshop', '2024-04-12', '13:00', 'No muro, olhando fixamente');
INSERT INTO avistamentos_petshop VALUES (5,  'Duquesa', 'Dentro do petshop', '2024-04-12', '10:00', 'Normal (é de lá)');
INSERT INTO avistamentos_petshop VALUES (6,  'Capitão Frajola', 'Telhado petshop', '2024-04-13', '22:00', 'Andando no telhado');
INSERT INTO avistamentos_petshop VALUES (7,  'Mingau', 'Porta dos fundos petshop', '2024-04-14', '00:30', 'Entrando pela porta');
INSERT INTO avistamentos_petshop VALUES (8,  'Capitão Frajola', 'Muro do petshop', '2024-04-15', '14:00', 'Posição habitual');
INSERT INTO avistamentos_petshop VALUES (9,  'Foguete', 'Calçada petshop', '2024-04-15', '23:00', 'Esperando algo');
INSERT INTO avistamentos_petshop VALUES (10, 'General Bigodão', 'Esquina do petshop', '2024-04-16', '22:30', 'Vigiando');
```

---

**🎯 Missão:**
Use uma **subquery** para encontrar o gato com o **maior número de avistamentos** perto do petshop, sem precisar contar manualmente.

---

**✅ Script de Solução:**
```sql
-- Subquery: encontrar o gato com mais avistamentos
SELECT nome_gato, COUNT(*) AS total_avistamentos
FROM avistamentos_petshop
GROUP BY nome_gato
HAVING COUNT(*) = (
    SELECT MAX(contagem) FROM (
        SELECT COUNT(*) AS contagem 
        FROM avistamentos_petshop 
        GROUP BY nome_gato
    )
);
```

**📋 Resultado:**

| nome_gato | total_avistamentos |
|-----------|--------------------|
| Capitão Frajola | 5 |

---

**🔎 Conclusão:**
> **Capitão Frajola** — 5 avistamentos perto do petshop! Ele é o mais presente. O informante anônimo estava certo: o gato que mais vigia o petshop é o líder.
>
> *"Quem mandou o bilhete? Alguém de dentro da rede? Salsicha, o informante canino? Ou... a própria Duquesa?"*
>
> 🐾 **O cerco está se fechando, Detetive...**
