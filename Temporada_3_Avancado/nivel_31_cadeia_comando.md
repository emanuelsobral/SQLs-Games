---
## 🐾 Nível 31: A Cadeia de Comando
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
Com a hierarquia da rede exposta, o Detetive precisa entender as relações de poder. Cada membro foi recrutado por outro membro. Para ver quem responde a quem, ele precisa cruzar a tabela consigo mesma — usando uma **subquery correlacionada** que referencia a consulta externa.

**🎬 Introdução:**
*"Eu tenho o organograma, mas preciso ver as relações de forma dinâmica. Quem recrutou quem? E quem tem mais subordinados diretos? A tabela se referencia a si mesma — preciso de uma subquery que 'converse' com a query principal."*

---

**🔍 Conceito SQL deste nível: Subqueries Correlacionadas**

Uma subquery correlacionada **referencia** uma coluna da query externa! É executada UMA VEZ para cada linha da query principal.

```sql
-- Para cada pet, contar quantos foram recrutados por ele
SELECT m.nome, m.funcao,
    (SELECT COUNT(*) FROM membros m2 WHERE m2.recrutado_por = m.nome) AS subordinados
FROM membros m;
```

> 💡 Note que `m2.recrutado_por = m.nome` referencia `m.nome` da query externa!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS hierarquia_rede;

CREATE TABLE hierarquia_rede (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    funcao TEXT,
    nivel INTEGER,
    recrutado_por TEXT,
    status TEXT
);

INSERT INTO hierarquia_rede VALUES (1, 'Capitão Frajola', 'Líder supremo', 1, NULL, 'Ativo');
INSERT INTO hierarquia_rede VALUES (2, 'Mingau', 'Chefe de operações', 2, 'Capitão Frajola', 'Ativo');
INSERT INTO hierarquia_rede VALUES (3, 'Foguete', 'Chefe de logística', 2, 'Capitão Frajola', 'Ativo');
INSERT INTO hierarquia_rede VALUES (4, 'General Bigodão', 'Chefe de segurança', 2, 'Capitão Frajola', 'Ativo');
INSERT INTO hierarquia_rede VALUES (5, 'Nestor', 'Agente infiltrado', 3, 'Mingau', 'Ativo');
INSERT INTO hierarquia_rede VALUES (6, 'Princesa', 'Supervisora de campo', 3, 'Capitão Frajola', 'Ativo');
INSERT INTO hierarquia_rede VALUES (7, 'Duquesa', 'Informante petshop', 3, 'Mingau', 'Ativo');
INSERT INTO hierarquia_rede VALUES (8, 'Bolinha', 'Vigia noturno', 4, 'Mingau', 'Relutante');
INSERT INTO hierarquia_rede VALUES (9, 'Sombra', 'Recruta novo', 4, 'General Bigodão', 'Ativo');
INSERT INTO hierarquia_rede VALUES (10, 'Trovão', 'Recruta novo', 4, 'General Bigodão', 'Ativo');
```

---

**🎯 Missão:**
Use subquery correlacionada para listar cada membro com o **número de subordinados diretos** que ele recrutou. Ordene por número de subordinados.

---

**✅ Script de Solução:**
```sql
SELECT 
    h.nome,
    h.funcao,
    h.nivel,
    (SELECT COUNT(*) FROM hierarquia_rede h2 WHERE h2.recrutado_por = h.nome) AS subordinados_diretos
FROM hierarquia_rede h
ORDER BY subordinados_diretos DESC;
```

**📋 Resultado:**

| nome | funcao | nivel | subordinados_diretos |
|------|--------|-------|---------------------|
| Capitão Frajola | Líder supremo | 1 | 4 |
| Mingau | Chefe de operações | 2 | 3 |
| General Bigodão | Chefe de segurança | 2 | 2 |
| Foguete | Chefe de logística | 2 | 0 |
| Nestor | Agente infiltrado | 3 | 0 |
| Princesa | Supervisora de campo | 3 | 0 |
| Duquesa | Informante petshop | 3 | 0 |
| Bolinha | Vigia noturno | 4 | 0 |
| Sombra | Recruta novo | 4 | 0 |
| Trovão | Recruta novo | 4 | 0 |

---

**🔎 Conclusão:**
> **Capitão Frajola** recrutou 4 membros diretamente, **Mingau** recrutou 3 e **General Bigodão** recrutou 2 (os gatos fantasma Sombra e Trovão!). A rede tem **10 membros** em 4 níveis hierárquicos.
>
> *"Os gatos fantasma do Nível 18 agora fazem sentido — foram RECRUTADOS pelo General Bigodão!"*
>
> 🐾 **A cadeia de comando está mapeada, Detetive...**
