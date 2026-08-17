---
## 🐾 Nível 25: As Rotas de Fuga
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Foguete, o entregador, usa diversas rotas para sair do bairro com a carga. O Detetive precisa listar as **rotas únicas** para montar um bloqueio. Cada saída registrada tem um ponto de partida, caminho e destino. Algumas rotas se repetem — DISTINCT vai ajudar a limpar.

**🎬 Introdução:**
*"Foguete é rápido demais para seguir", admite o Detetive. "Mas se eu mapear as rotas únicas que ele usa, posso prever o próximo movimento. Preciso tirar as duplicatas."*

---

**🔍 Conceito SQL deste nível: `DISTINCT` (Consolidação)**

Combinando `DISTINCT` com `COUNT` para contar quantas rotas únicas existem, e com `WHERE` para filtrar.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS rotas_foguete;

CREATE TABLE rotas_foguete (
    id INTEGER PRIMARY KEY,
    ponto_partida TEXT,
    caminho TEXT,
    destino TEXT,
    horario TEXT,
    data TEXT,
    carregando TEXT
);

INSERT INTO rotas_foguete VALUES (1, 'Telhado Dona Clotilde', 'Muro norte > Beco escuro', 'Fora do bairro (norte)', '00:00', '2024-04-10', 'Sachês');
INSERT INTO rotas_foguete VALUES (2, 'Telhado Dona Clotilde', 'Muro norte > Beco escuro', 'Fora do bairro (norte)', '00:30', '2024-04-11', 'Sachês');
INSERT INTO rotas_foguete VALUES (3, 'Telhado Dona Clotilde', 'Quintal Seu Agenor > Rua lateral', 'Fora do bairro (leste)', '01:00', '2024-04-12', 'Sachês');
INSERT INTO rotas_foguete VALUES (4, 'Petshop', 'Beco da padaria > Muro sul', 'Fora do bairro (sul)', '23:30', '2024-04-13', 'Sachês');
INSERT INTO rotas_foguete VALUES (5, 'Telhado Dona Clotilde', 'Muro norte > Beco escuro', 'Fora do bairro (norte)', '00:15', '2024-04-14', 'Sachês');
INSERT INTO rotas_foguete VALUES (6, 'Telhado Dona Clotilde', 'Quintal Seu Agenor > Rua lateral', 'Fora do bairro (leste)', '00:45', '2024-04-15', 'Sachês');
INSERT INTO rotas_foguete VALUES (7, 'Petshop', 'Beco da padaria > Muro sul', 'Fora do bairro (sul)', '23:45', '2024-04-16', 'Sachês');
INSERT INTO rotas_foguete VALUES (8, 'Telhado Dona Clotilde', 'Telhados vizinhos > Muro oeste', 'Fora do bairro (oeste)', '01:30', '2024-04-17', 'Sachês');
```

---

**🎯 Missão:**
1. Liste as **rotas únicas** (combinação de caminho + destino)
2. Conte quantas rotas diferentes Foguete usa
3. Qual rota é a **mais usada**?

---

**✅ Script de Solução:**
```sql
-- 1. Rotas únicas
SELECT DISTINCT caminho, destino FROM rotas_foguete;

-- 2. Total de rotas diferentes
SELECT COUNT(DISTINCT caminho) AS total_rotas FROM rotas_foguete;

-- 3. Rota mais usada
SELECT caminho, destino, COUNT(*) AS vezes_usada
FROM rotas_foguete
GROUP BY caminho, destino
ORDER BY vezes_usada DESC;
```

**📋 Resultado (Rotas únicas):**

| caminho | destino |
|---------|---------|
| Muro norte > Beco escuro | Fora do bairro (norte) |
| Quintal Seu Agenor > Rua lateral | Fora do bairro (leste) |
| Beco da padaria > Muro sul | Fora do bairro (sul) |
| Telhados vizinhos > Muro oeste | Fora do bairro (oeste) |

**📋 Resultado (Mais usada):**

| caminho | destino | vezes_usada |
|---------|---------|-------------|
| Muro norte > Beco escuro | Fora do bairro (norte) | 3 |
| Quintal Seu Agenor > Rua lateral | Fora do bairro (leste) | 2 |
| Beco da padaria > Muro sul | Fora do bairro (sul) | 2 |
| Telhados vizinhos > Muro oeste | Fora do bairro (oeste) | 1 |

---

**🔎 Conclusão:**
> **4 rotas mapeadas!** Foguete usa as 4 direções cardeais, mas a rota **norte** (Muro norte > Beco escuro) é favorita com 3 usos. Importante: os sachês vão para **FORA do bairro**. Para onde? Para quem?
>
> *"Os sachês saem do bairro. Há um comprador externo. Na próxima temporada, vou rastrear o destino final."*
>
> 🐾 **As rotas estão mapeadas. Mas para onde levam?...**
