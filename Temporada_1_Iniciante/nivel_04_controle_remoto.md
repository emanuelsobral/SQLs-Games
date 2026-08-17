---
## 🐾 Nível 4: O Sumiço do Controle Remoto
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Seu Agenor liga furioso: o controle remoto da TV sumiu bem na hora do jogo do Flamengo. Ele jura que deixou na mesa de centro às 14h. Agora são 16h e o controle evaporou. A casa tem três pets e um neto que veio passar o fim de semana. Seu Agenor suspeita do Pedrinho, Pedrinho suspeita do Thor, e Thor suspeita de todo mundo (mas não fala porque é cachorro). Os objetos sumiram antes, e Seu Agenor mantém um registro meticuloso de cada item desaparecido em sua casa.

**🎬 Introdução:**
*O Detetive Bigode encontra Seu Agenor ajoelhado atrás do sofá, vasculhando debaixo das almofadas como um arqueólogo desesperado. "DETETIVE! Meu controle sumiu! O jogo começa em 20 minutos! Isso é uma emergência de segurança doméstica!"*

*O Detetive olha ao redor. O Thor está deitado estrategicamente em cima de sua caminha — que está suspeitamente mais alta que o normal. Pedrinho brinca no quintal, aparentemente inocente. "Seu Agenor, o senhor tem um registro dos objetos que somem, não é?" O velho abre uma caderneta: "Tenho sim! Anoto TUDO! Data, hora, onde estava, onde achei, quem pegou!"*

*"Perfeito. Vamos consultar esses dados."*

---

**🔍 Conceito SQL deste nível: `WHERE` (Consolidação)**

Você já aprendeu o `WHERE` no nível anterior. Agora vai usá-lo com um operador diferente: ao invés de `=`, vamos usar outros comparadores!

**Operadores de comparação:**
| Operador | Significado | Exemplo |
|----------|-------------|---------|
| `=` | Igual a | `WHERE cor = 'Azul'` |
| `!=` ou `<>` | Diferente de | `WHERE status != 'Encontrado'` |
| `>` | Maior que | `WHERE peso > 5` |
| `<` | Menor que | `WHERE idade < 3` |

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 4: O Sumiço do Controle Remoto
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS objetos_sumidos;

CREATE TABLE objetos_sumidos (
    id INTEGER PRIMARY KEY,
    objeto TEXT,
    data_sumiço TEXT,
    ultimo_local TEXT,
    encontrado_em TEXT,
    status TEXT,
    principal_suspeito TEXT
);

-- Histórico de objetos desaparecidos na casa do Seu Agenor
INSERT INTO objetos_sumidos VALUES (1, 'Meia esquerda listrada', '2024-01-10', 'Varal', 'Caminha do Thor', 'Encontrado', 'Thor');
INSERT INTO objetos_sumidos VALUES (2, 'Dentadura de reserva', '2024-02-14', 'Criado-mudo', 'Jardim (enterrada)', 'Encontrado', 'Thor');
INSERT INTO objetos_sumidos VALUES (3, 'Óculos de leitura', '2024-03-05', 'Mesa da sala', 'Debaixo do sofá', 'Encontrado', 'Pedrinho');
INSERT INTO objetos_sumidos VALUES (4, 'Controle remoto', '2024-03-22', 'Mesa de centro', NULL, 'Desaparecido', 'Desconhecido');
INSERT INTO objetos_sumidos VALUES (5, 'Chaveiro do carro', '2024-01-28', 'Gancho da entrada', 'Dentro do sapato', 'Encontrado', 'Bolinha');
INSERT INTO objetos_sumidos VALUES (6, 'Colher de pau', '2024-02-20', 'Cozinha', 'Quintal (mordida)', 'Encontrado', 'Thor');
INSERT INTO objetos_sumidos VALUES (7, 'Chinelo direito', '2024-03-15', 'Pé da cama', 'Jardim (enterrado)', 'Encontrado', 'Thor');
```

---

**🎯 Missão:**
O controle remoto ainda está desaparecido! Use o `WHERE` para:
1. Encontrar o registro do **controle remoto** que está com status **'Desaparecido'**.
2. Depois, investigue: baseado no padrão dos outros objetos, quem é o **principal suspeito** mais frequente? (Dica: filtre por suspeito!)

---

**💡 Dica:**
> Primeiro, filtre os objetos onde o `status` é diferente de `'Encontrado'` — isso vai te mostrar o que ainda está sumido. Depois, filtre por `principal_suspeito = 'Thor'` para ver o padrão dele.

---

**✅ Script de Solução:**
```sql
-- 1. Qual objeto ainda está desaparecido?
SELECT * FROM objetos_sumidos
WHERE status = 'Desaparecido';

-- 2. Quais objetos o Thor já levou?
SELECT objeto, encontrado_em FROM objetos_sumidos
WHERE principal_suspeito = 'Thor';
```

**📋 Resultado Esperado (Query 1):**

| id | objeto | data_sumiço | ultimo_local | encontrado_em | status | principal_suspeito |
|----|--------|-------------|--------------|---------------|--------|--------------------|
| 4 | Controle remoto | 2024-03-22 | Mesa de centro | NULL | Desaparecido | Desconhecido |

**📋 Resultado Esperado (Query 2):**

| objeto | encontrado_em |
|--------|---------------|
| Meia esquerda listrada | Caminha do Thor |
| Dentadura de reserva | Jardim (enterrada) |
| Colher de pau | Quintal (mordida) |
| Chinelo direito | Jardim (enterrado) |

---

**🔎 Conclusão:**
> **Caso encerrado!** O principal suspeito é **Thor** — de novo! 🐕
>
> O padrão é claro: Thor já levou **4 dos 7 objetos** desaparecidos. E onde ele esconde as coisas? No **jardim** (enterrados) ou na **caminha** dele! O controle remoto provavelmente está em um desses dois lugares.
>
> *Seu Agenor corre até a caminha do Thor e levanta o colchãozinho. Lá está o controle remoto, coberto de baba. "ACHEI! SEU PESTINHA!" Thor abana o rabo freneticamente, como se estivesse sendo elogiado.*
>
> *O Detetive Bigode anota: "Thor tem um padrão: coleta objetos e enterra no jardim ou esconde na caminha. Perfil clássico de cleptomania canina. Curiosidade: dentadura de reserva no jardim é um novo nível de audácia."*
>
> 🐾 **Os pets do bairro não dão sossego, Detetive. E as coisas estão ficando estranhas...**
