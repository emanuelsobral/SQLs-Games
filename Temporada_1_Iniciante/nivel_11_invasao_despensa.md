---
## 🐾 Nível 11: A Invasão da Despensa
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
O Detetive Bigode acorda e percebe que a porta da despensa está aberta. Ao inspecionar, descobre que vários itens foram atacados durante a madrugada: pacotes de ração rasgados, biscoitos para cachorro espalhados e — o mais grave — o estoque de sachês de salmão está menor que deveria. A câmera da cozinha registrou as invasões, e todas aconteceram entre 01:00 e 04:00 da manhã. Mas a despensa também sofreu ataques em outros horários. O Detetive precisa filtrar especificamente os ataques dessa janela de tempo madrugada para ver se há um padrão noturno.

**🎬 Introdução:**
*O Detetive Bigode abre a porta da despensa e congela. O cenário é apocalíptico: um saco de ração de 3kg tem um buraco do tamanho de uma cabeça de gato. Biscoitos caninos estão espalhados como confete. E no canto da prateleira, onde deveria haver 12 sachês de salmão premium, há apenas 8.*

*"Quatro sachês...", murmura o Detetive, contando nos dedos. "Quatro sachês sumiram." Ele pega a lupa (por força do hábito, mesmo sendo desnecessária para contar sachês) e examina o buraco na ração: "Marcas de dentes pequenos. E marcas de garras na prateleira do sachê. Trabalho profissional."*

*Ele acessa os registros da câmera. "Se eu filtrar por horário, posso isolar os ataques da madrugada. E algo me diz que o time da madrugada é diferente do time do dia..."*

---

**🔍 Conceito SQL deste nível: `BETWEEN` e `IN`**

Agora você vai aprender dois filtros muito úteis:

### `BETWEEN` — Filtrar por intervalo
Seleciona valores dentro de um **intervalo** (inclusive os extremos).

```sql
-- Ataques entre 01:00 e 04:00
SELECT * FROM invasoes WHERE horario BETWEEN '01:00' AND '04:00';

-- Equivalente a:
SELECT * FROM invasoes WHERE horario >= '01:00' AND horario <= '04:00';
```

### `IN` — Filtrar por lista de valores
Seleciona linhas onde a coluna está em uma **lista** de valores específicos.

```sql
-- Itens que são ração, sachê ou biscoito
SELECT * FROM invasoes WHERE item IN ('Ração', 'Sachê', 'Biscoito');

-- Equivalente a:
SELECT * FROM invasoes WHERE item = 'Ração' OR item = 'Sachê' OR item = 'Biscoito';
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 11: A Invasão da Despensa
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS invasoes_despensa;

CREATE TABLE invasoes_despensa (
    id INTEGER PRIMARY KEY,
    horario TEXT,
    item_atacado TEXT,
    tipo_item TEXT,
    dano TEXT,
    suspeito_visto TEXT,
    data TEXT
);

-- Registros de invasões à despensa na última semana
INSERT INTO invasoes_despensa VALUES (1,  '01:15', 'Saco de ração frango 3kg', 'Ração', 'Buraco na lateral', 'Bolinha', '2024-03-20');
INSERT INTO invasoes_despensa VALUES (2,  '09:00', 'Pacote de biscoito canino', 'Biscoito', 'Rasgado e espalhado', 'Thor', '2024-03-20');
INSERT INTO invasoes_despensa VALUES (3,  '02:30', 'Sachê de salmão premium', 'Sachê', 'Desaparecido', 'Mingau', '2024-03-20');
INSERT INTO invasoes_despensa VALUES (4,  '14:30', 'Pacote de petisco de carne', 'Petisco', 'Mordido no canto', 'Thor', '2024-03-21');
INSERT INTO invasoes_despensa VALUES (5,  '01:45', 'Sachê de salmão premium', 'Sachê', 'Desaparecido', 'Vulto não identificado', '2024-03-21');
INSERT INTO invasoes_despensa VALUES (6,  '03:00', 'Saco de ração frango 3kg', 'Ração', 'Segundo buraco', 'Bolinha', '2024-03-21');
INSERT INTO invasoes_despensa VALUES (7,  '10:30', 'Graveto mastigável', 'Brinquedo', 'Mastigado', 'Salsicha', '2024-03-22');
INSERT INTO invasoes_despensa VALUES (8,  '02:00', 'Sachê de salmão premium', 'Sachê', 'Desaparecido', 'Vulto não identificado', '2024-03-22');
INSERT INTO invasoes_despensa VALUES (9,  '03:30', 'Sachê de atum gourmet', 'Sachê', 'Desaparecido', 'Capitão Frajola', '2024-03-22');
INSERT INTO invasoes_despensa VALUES (10, '16:00', 'Pacote de biscoito canino', 'Biscoito', 'Aberto pela metade', 'Thor', '2024-03-22');
INSERT INTO invasoes_despensa VALUES (11, '02:15', 'Sachê de salmão premium', 'Sachê', 'Desaparecido', 'Mingau', '2024-03-23');
INSERT INTO invasoes_despensa VALUES (12, '07:00', 'Pote de ração úmida', 'Ração', 'Tampa removida', 'Bolinha', '2024-03-23');
```

---

**🎯 Missão:**
Use os novos comandos para investigar:
1. **`BETWEEN`:** Filtre os ataques que aconteceram entre **01:00 e 04:00** (janela da madrugada)
2. **`IN`:** Dos ataques da madrugada, filtre apenas os itens do tipo **'Sachê'** ou **'Ração'** (os alvos de maior valor)

---

**💡 Dica:**
> Para a primeira query, use `WHERE horario BETWEEN '01:00' AND '04:00'`. Para a segunda, combine `BETWEEN` com `AND tipo_item IN ('Sachê', 'Ração')`.

---

**✅ Script de Solução:**
```sql
-- 1. Ataques na janela da madrugada (01:00 - 04:00)
SELECT horario, item_atacado, dano, suspeito_visto, data
FROM invasoes_despensa
WHERE horario BETWEEN '01:00' AND '04:00';

-- 2. Focar nos itens de alto valor: apenas Sachês e Ração na madrugada
SELECT horario, item_atacado, tipo_item, suspeito_visto, data
FROM invasoes_despensa
WHERE horario BETWEEN '01:00' AND '04:00'
  AND tipo_item IN ('Sachê', 'Ração');
```

**📋 Resultado Esperado (Query 1 — Madrugada):**

| horario | item_atacado | dano | suspeito_visto | data |
|---------|-------------|------|----------------|------|
| 01:15 | Saco de ração frango 3kg | Buraco na lateral | Bolinha | 2024-03-20 |
| 02:30 | Sachê de salmão premium | Desaparecido | Mingau | 2024-03-20 |
| 01:45 | Sachê de salmão premium | Desaparecido | Vulto não identificado | 2024-03-21 |
| 03:00 | Saco de ração frango 3kg | Segundo buraco | Bolinha | 2024-03-21 |
| 02:00 | Sachê de salmão premium | Desaparecido | Vulto não identificado | 2024-03-22 |
| 03:30 | Sachê de atum gourmet | Desaparecido | Capitão Frajola | 2024-03-22 |
| 02:15 | Sachê de salmão premium | Desaparecido | Mingau | 2024-03-23 |

**📋 Resultado Esperado (Query 2 — Alto valor na madrugada):**

| horario | item_atacado | tipo_item | suspeito_visto | data |
|---------|-------------|-----------|----------------|------|
| 01:15 | Saco de ração frango 3kg | Ração | Bolinha | 2024-03-20 |
| 02:30 | Sachê de salmão premium | Sachê | Mingau | 2024-03-20 |
| 01:45 | Sachê de salmão premium | Sachê | Vulto não identificado | 2024-03-21 |
| 03:00 | Saco de ração frango 3kg | Ração | Bolinha | 2024-03-21 |
| 02:00 | Sachê de salmão premium | Sachê | Vulto não identificado | 2024-03-22 |
| 03:30 | Sachê de atum gourmet | Sachê | Capitão Frajola | 2024-03-22 |
| 02:15 | Sachê de salmão premium | Sachê | Mingau | 2024-03-23 |

---

**🔎 Conclusão:**
> **Caso encerrado!** A despensa está sendo saqueada por uma **operação noturna**! 🌙🐱
>
> **Padrão da madrugada (01h-04h):**
> - **Bolinha** ataca a **ração** (sua paixão — ele é gordo por uma razão)
> - **Mingau** foca nos **sachês de salmão** (ladrão seletivo!)
> - **Capitão Frajola** apareceu uma vez, pegando sachê de atum (ele está entrando na SUA casa agora!)
> - **"Vulto não identificado"** levou sachês nos dias 21 e 22 — quem é esse vulto?
>
> **O mais alarmante:** os **sachês** estão sendo sistematicamente **roubados e levados embora** (status: "Desaparecido"), enquanto a ração e biscoitos são comidos no local. Alguém está **estocando** sachês!
>
> *O Detetive Bigode senta na cadeira da cozinha, pensativo. "Os sachês não estão sendo comidos aqui. Estão sendo transportados para outro lugar. O Mingau aparece e desaparece... O Capitão Frajola entra na minha casa... E o 'vulto não identificado' pode ser qualquer um deles com a câmera desfocada."*
>
> *Nota URGENTE no caderninho: "SACHÊS ESTÃO SUMINDO DO BAIRRO. Não são comidos — são LEVADOS. Para onde? Telhado da Dona Clotilde? Verificar conexão com as reuniões noturnas (Nível 7) e os brinquedos aparecendo lá (Nível 8). O telhado pode ser um DEPÓSITO."*
>
> 🐾 **Os sachês estão sendo contrabandeados, Detetive. E a rede é maior do que parece...**
