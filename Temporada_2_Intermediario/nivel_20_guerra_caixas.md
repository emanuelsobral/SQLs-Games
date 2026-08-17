---
## 🐾 Nível 20: A Guerra das Caixas de Papelão
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Um conflito territorial explodiu no bairro: caixas de papelão estão sendo "roubadas" entre as casas. Gatos amam caixas, e alguém está acumulando mais do que deveria. Dona Jurema exige um relatório: quantas caixas cada gato reivindicou como suas? O Detetive tem registros de "posse de caixa" — cada vez que um gato é visto dentro ou em cima de uma caixa, conta como uma reivindicação. Hora de agrupar os dados por gato e contar.

**🎬 Introdução:**
*A Rua das Acácias parece uma zona de guerra de papelão. Caixas de todos os tamanhos estão espalhadas por quintais, varandas e telhados. Dona Clotilde grita pela janela: "O NESTOR ROUBOU A CAIXA DA GELADEIRA DO MEU VIZINHO!" Pedrinho protesta: "A caixa do micro-ondas era do THOR!"*

*O Detetive Bigode ergue as mãos: "CALMA! Vamos resolver isso com dados! Eu registrei cada avistamento de gato em caixa. Vamos contar quem tem mais caixas."*

---

**🔍 Conceito SQL deste nível: `GROUP BY`**

Até agora, funções de agregação (`COUNT`, `SUM`) retornavam UM valor para a tabela inteira. Com `GROUP BY`, você pode agrupar por categoria e ter resultados **para cada grupo**!

**Sem GROUP BY:**
```sql
SELECT COUNT(*) FROM reivindicacoes; -- Retorna: 1 número (total)
```

**Com GROUP BY:**
```sql
SELECT nome_gato, COUNT(*) FROM reivindicacoes GROUP BY nome_gato;
-- Retorna: 1 número POR GATO!
```

**Sintaxe:**
```sql
SELECT coluna_agrupada, funcao_agregacao(coluna)
FROM tabela
GROUP BY coluna_agrupada;
```

> ⚠️ **Regra importante:** Toda coluna no `SELECT` que NÃO está dentro de uma função de agregação **deve** aparecer no `GROUP BY`!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 20: A Guerra das Caixas de Papelão
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS reivindicacoes_caixas;

CREATE TABLE reivindicacoes_caixas (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    tipo_caixa TEXT,
    tamanho TEXT,
    local_caixa TEXT,
    data TEXT,
    acao TEXT
);

-- Registro de reivindicações de caixas no bairro
INSERT INTO reivindicacoes_caixas VALUES (1,  'Bolinha', 'Caixa de sapato', 'Pequena', 'Sala Detetive', '2024-04-08', 'Deitou dentro e dormiu');
INSERT INTO reivindicacoes_caixas VALUES (2,  'Capitão Frajola', 'Caixa de geladeira', 'Gigante', 'Quintal Dona Clotilde', '2024-04-08', 'Entrou e não saiu por 3 horas');
INSERT INTO reivindicacoes_caixas VALUES (3,  'Princesa', 'Caixa de presente', 'Pequena', 'Sala Dona Clotilde', '2024-04-08', 'Sentou em cima com elegância');
INSERT INTO reivindicacoes_caixas VALUES (4,  'Nestor', 'Caixa de micro-ondas', 'Média', 'Cozinha Pedrinho', '2024-04-09', 'Carregou para outra casa');
INSERT INTO reivindicacoes_caixas VALUES (5,  'Capitão Frajola', 'Caixa de TV', 'Grande', 'Garagem Seu Agenor', '2024-04-09', 'Marcou território arranhando');
INSERT INTO reivindicacoes_caixas VALUES (6,  'Mingau', 'Caixa de pizza', 'Média', 'Lixeira da esquina', '2024-04-09', 'Dormiu dentro a noite toda');
INSERT INTO reivindicacoes_caixas VALUES (7,  'Capitão Frajola', 'Caixa de mudança', 'Gigante', 'Telhado Dona Clotilde', '2024-04-10', 'Transformou em quartel-general');
INSERT INTO reivindicacoes_caixas VALUES (8,  'Bolinha', 'Caixa de Amazon', 'Média', 'Quarto Detetive', '2024-04-10', 'Destruiu a caixa de dentro pra fora');
INSERT INTO reivindicacoes_caixas VALUES (9,  'Nestor', 'Caixa de vinho', 'Pequena', 'Adega Dona Clotilde', '2024-04-10', 'Enfiou dentro e ficou espiando');
INSERT INTO reivindicacoes_caixas VALUES (10, 'General Bigodão', 'Caixa de banana', 'Grande', 'Feira livre', '2024-04-10', 'Dormiu na feira e ninguém quis acordar');
INSERT INTO reivindicacoes_caixas VALUES (11, 'Capitão Frajola', 'Caixa de papelão genérica', 'Média', 'Rua principal', '2024-04-11', 'Empurrou para o beco');
INSERT INTO reivindicacoes_caixas VALUES (12, 'Princesa', 'Caixa de Chanel (vazia)', 'Pequena', 'Closet Dona Clotilde', '2024-04-11', 'Recusou todas as outras caixas por esta');
INSERT INTO reivindicacoes_caixas VALUES (13, 'Foguete', 'Caixa de encomenda', 'Média', 'Portão petshop', '2024-04-11', 'Usou como esconderijo temporário');
INSERT INTO reivindicacoes_caixas VALUES (14, 'Nestor', 'Caixa de sabão em pó', 'Pequena', 'Lavanderia Dona Clotilde', '2024-04-11', 'Trouxe de outra casa');
```

---

**🎯 Missão:**
Use `GROUP BY` para responder às perguntas da Dona Jurema:
1. **Quantas caixas** cada gato reivindicou?
2. Ordene pelo número de reivindicações (quem tem mais caixas primeiro)

---

**💡 Dica:**
> `SELECT nome_gato, COUNT(*) AS total_caixas FROM reivindicacoes_caixas GROUP BY nome_gato ORDER BY total_caixas DESC;`

---

**✅ Script de Solução:**
```sql
-- Quantas caixas cada gato reivindicou?
SELECT nome_gato, COUNT(*) AS total_caixas
FROM reivindicacoes_caixas
GROUP BY nome_gato
ORDER BY total_caixas DESC;
```

**📋 Resultado Esperado:**

| nome_gato | total_caixas |
|-----------|-------------|
| Capitão Frajola | 4 |
| Nestor | 3 |
| Bolinha | 2 |
| Princesa | 2 |
| Mingau | 1 |
| General Bigodão | 1 |
| Foguete | 1 |

---

**🔎 Conclusão:**
> **Caso encerrado!** O **Capitão Frajola** domina o mercado de caixas! 📦🐱
>
> Com **4 reivindicações** (incluindo uma caixa de geladeira "Gigante" e uma caixa de mudança transformada em "quartel-general" no telhado), ele lidera com folga. **Nestor** vem em segundo com 3, sendo que pelo menos 1 foi **roubada de outra casa**.
>
> *O Detetive nota: "O Capitão Frajola não coleciona caixas por diversão. A caixa de mudança no telhado é um 'quartel-general'. A caixa de TV na garagem é um 'posto avançado'. Ele está montando infraestrutura."*
>
> 🐾 **Caixas são território, Detetive. E o Capitão Frajola está expandindo o império...**
