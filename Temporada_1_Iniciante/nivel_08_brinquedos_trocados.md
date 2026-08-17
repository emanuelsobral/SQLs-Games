---
## 🐾 Nível 8: O Caso dos Brinquedos Trocados
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Uma situação bizarra está acontecendo no bairro: brinquedos de pets estão aparecendo em casas erradas. O ratinho de pelúcia da Princesa apareceu na casa do Pedrinho. A bola de tênis do Thor foi encontrada no jardim da Dona Clotilde. O arranhador portátil do Bolinha surgiu na varanda do Seu Agenor. Parece que alguém (ou alguns) está transportando brinquedos entre as casas durante a noite. Dona Jurema pede uma investigação: ela quer saber quais brinquedos têm a palavra "rato" ou "peixe" no nome — itens que gatos adoram e que podem indicar quem está por trás das trocas.

**🎬 Introdução:**
*O Detetive Bigode organiza uma mesa de evidências no quintal. Brinquedos de todas as casas do bairro estão espalhados como peças de um quebra-cabeça. "Isso é um sistema de trocas", murmura o Detetive. "Os pets estão fazendo escambo."*

*Dona Jurema cruza os braços: "Detetive, meu Tobias perdeu o peixinho de catnip que custou R$35 na petshop! E ontem encontrei um osso de borracha no meu sofá — EU NÃO TENHO CACHORRO!" O Detetive anota: "O interessante é o padrão. Todos os brinquedos têm tema de 'presa' — ratos, peixes... São os brinquedos preferidos de gatos."*

---

**🔍 Conceito SQL deste nível: `LIKE` (Consolidação)**

Você já aprendeu o `LIKE` no nível anterior. Agora vai explorar mais os curingas, combinando-os com outros filtros!

**Reforço:**
- `'%texto%'` → contém "texto" em qualquer posição
- `'texto%'` → **começa** com "texto"
- `'%texto'` → **termina** com "texto"
- `'_exto'` → primeiro caractere é qualquer um, seguido de "exto"

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 8: O Caso dos Brinquedos Trocados
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS brinquedos_perdidos;

CREATE TABLE brinquedos_perdidos (
    id INTEGER PRIMARY KEY,
    nome_brinquedo TEXT,
    dono_original TEXT,
    casa_original TEXT,
    encontrado_em TEXT,
    estado TEXT,
    data_encontrado TEXT
);

-- Inventário de brinquedos que apareceram em casas erradas
INSERT INTO brinquedos_perdidos VALUES (1, 'Ratinho de pelúcia rosa', 'Princesa', 'Dona Clotilde', 'Casa do Pedrinho', 'Mordido', '2024-03-18');
INSERT INTO brinquedos_perdidos VALUES (2, 'Bola de tênis amarela', 'Thor', 'Pedrinho', 'Jardim da Dona Clotilde', 'Babada', '2024-03-19');
INSERT INTO brinquedos_perdidos VALUES (3, 'Peixinho de catnip azul', 'Tobias', 'Dona Jurema', 'Varanda do Seu Agenor', 'Sem catnip', '2024-03-19');
INSERT INTO brinquedos_perdidos VALUES (4, 'Osso de borracha vermelho', 'Salsicha', 'Pedrinho', 'Sofá da Dona Jurema', 'Intacto', '2024-03-20');
INSERT INTO brinquedos_perdidos VALUES (5, 'Rato mecânico cinza', 'Bolinha', 'Detetive Bigode', 'Telhado da Dona Clotilde', 'Sem pilha', '2024-03-20');
INSERT INTO brinquedos_perdidos VALUES (6, 'Pena de pavão sintética', 'Mimi', 'Dona Clotilde', 'Quintal do Detetive', 'Desfiada', '2024-03-21');
INSERT INTO brinquedos_perdidos VALUES (7, 'Bolinha com guizo', 'Fifi', 'Dona Clotilde', 'Casa do Pedrinho', 'Sem guizo', '2024-03-21');
INSERT INTO brinquedos_perdidos VALUES (8, 'Peixe de feltro laranja', 'Nestor', 'Dona Clotilde', 'Varanda do Seu Agenor', 'Rasgado', '2024-03-22');
INSERT INTO brinquedos_perdidos VALUES (9, 'Ratão gigante de lã', 'Duquesa', 'Dona Margarete', 'Jardim da Dona Clotilde', 'Encharcado', '2024-03-22');
INSERT INTO brinquedos_perdidos VALUES (10, 'Disco voador de silicone', 'Thor', 'Pedrinho', 'Quintal do Detetive', 'Mordido', '2024-03-23');
```

---

**🎯 Missão:**
Dona Jurema quer um relatório dos brinquedos com tema de **"presa de gato"**. Use `LIKE` para encontrar:
1. Todos os brinquedos que contenham **"rato"** ou **"Rato"** no nome
2. Todos os brinquedos que contenham **"peix"** ou **"Peix"** no nome

Analise: para onde esses brinquedos estão indo?

---

**💡 Dica:**
> Faça duas consultas separadas: uma com `WHERE nome_brinquedo LIKE '%ato%'` (captura "rato", "Rato", "Ratão", "gato") e outra com `WHERE nome_brinquedo LIKE '%eix%'` (captura "Peixinho", "Peixe").

---

**✅ Script de Solução:**
```sql
-- Brinquedos com tema de "rato"
SELECT nome_brinquedo, dono_original, encontrado_em
FROM brinquedos_perdidos
WHERE nome_brinquedo LIKE '%ato%';

-- Brinquedos com tema de "peixe"
SELECT nome_brinquedo, dono_original, encontrado_em
FROM brinquedos_perdidos
WHERE nome_brinquedo LIKE '%eix%';
```

**📋 Resultado Esperado (Query 1 — "rato"):**

| nome_brinquedo | dono_original | encontrado_em |
|----------------|---------------|---------------|
| Ratinho de pelúcia rosa | Princesa | Casa do Pedrinho |
| Rato mecânico cinza | Bolinha | Telhado da Dona Clotilde |
| Ratão gigante de lã | Duquesa | Jardim da Dona Clotilde |

**📋 Resultado Esperado (Query 2 — "peixe"):**

| nome_brinquedo | dono_original | encontrado_em |
|----------------|---------------|---------------|
| Peixinho de catnip azul | Tobias | Varanda do Seu Agenor |
| Peixe de feltro laranja | Nestor | Varanda do Seu Agenor |

---

**🔎 Conclusão:**
> **Caso encerrado!** Os brinquedos com tema de "presa" seguem padrões claros! 🐱🐀🐟
>
> **Brinquedos de rato:** Todos são de **gatos** (Princesa, Bolinha, Duquesa) e dois terminaram em propriedades da **Dona Clotilde** (telhado e jardim).
>
> **Brinquedos de peixe:** Ambos foram parar na **varanda do Seu Agenor** — que coincidentemente fica entre a casa da Dona Clotilde e o petshop da Dona Margarete. Seria um ponto de passagem?
>
> **Padrão geral:** A casa da Dona Clotilde (especialmente o **telhado**) e a varanda do Seu Agenor funcionam como "centrais de distribuição" de brinquedos. Brinquedos de **gatos** vão para lá; brinquedos de **cachorro** aparecem aleatoriamente.
>
> *O Detetive Bigode anota com urgência: "O telhado da Dona Clotilde aparece de novo! Primeiro as reuniões noturnas (Nível 7), agora como depósito de brinquedos contrabandeados. Algo está se formando naquele telhado. E a varanda do Seu Agenor como ponto intermediário? Estranho."*
>
> *Nota sobre Duquesa: é a gata da Dona Margarete, dona do petshop. O Ratão dela apareceu no jardim da Dona Clotilde. Conexão petshop ↔ Dona Clotilde? Monitorar.*
>
> 🐾 **As peças do quebra-cabeça estão se encaixando, Detetive. E o telhado da Dona Clotilde é o epicentro...**
