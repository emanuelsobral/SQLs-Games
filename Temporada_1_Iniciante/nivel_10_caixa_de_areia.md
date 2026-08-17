---
## 🐾 Nível 10: O Escândalo da Caixa de Areia
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Dona Clotilde está indignada: alguém está usando a caixa de areia dos gatos dela sem autorização! Ela mantém 3 caixas de areia (uma no banheiro, uma na lavanderia e uma no quintal), mas só seus 7 gatos têm "permissão oficial". Porém, nas últimas noites, caixas amanhecem mais sujas que o normal. A desconfiança é que gatos de fora — possivelmente o Capitão Frajola ou outros gatos de rua — estão invadindo a casa para usar as instalações sanitárias premium de Dona Clotilde. Ela instalou um "livro de registro" (sim, Dona Clotilde registra tudo) e quer saber: quais usos foram de gatos **não autorizados** OU aconteceram em **horários suspeitos** (depois das 23h)?

**🎬 Introdução:**
*O Detetive Bigode nunca pensou que investigaria uma caixa de areia, mas aqui está ele, agachado no banheiro da Dona Clotilde, examinando pegadas na areia com sua lupa. "Isso é humilhante", pensa, enquanto Dona Clotilde discursa atrás dele.*

*"Detetive, eu compro areia importada! IMPORTADA! Areia de bentonita com cristais de sílica e aroma de lavanda! E esses gatos de rua acham que podem entrar e usar de graça?!" Ela agita o registro: "Eu instalei um sensor de peso na entrada de cada caixa. Sei exatamente quem entrou, quando e em qual caixa!"*

*O Detetive suspira. "Dona Clotilde, a senhora instalou sensor de peso em caixas de areia de gato?" Ela responde sem piscar: "Segurança é segurança, Detetive."*

---

**🔍 Conceito SQL deste nível: `AND` e `OR` (Consolidação)**

Agora você vai combinar `AND` e `OR` na mesma query! Quando misturamos os dois, é importante usar **parênteses** para deixar claro a ordem das condições.

**Regra de precedência:**
- `AND` é avaliado **antes** de `OR` (como multiplicação antes de soma)
- Use **parênteses** para forçar a ordem que você quer

**Exemplo:**
```sql
-- ERRADO (ambíguo): gato que mora aqui OU qualquer um depois das 23h?
SELECT * FROM usos WHERE especie = 'Gato' AND autorizado = 'Não' OR horario > '23:00';

-- CORRETO (com parênteses): gatos não autorizados OU qualquer uso depois das 23h
SELECT * FROM usos WHERE (autorizado = 'Não') OR (horario > '23:00');
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 10: O Escândalo da Caixa de Areia
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS uso_caixa_areia;

CREATE TABLE uso_caixa_areia (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    dono TEXT,
    caixa_usada TEXT,
    horario TEXT,
    autorizado TEXT,
    peso_detectado_kg REAL,
    data TEXT
);

-- Registro dos últimos 3 dias
INSERT INTO uso_caixa_areia VALUES (1,  'Princesa', 'Dona Clotilde', 'Banheiro', '08:30', 'Sim', 4.1, '2024-03-20');
INSERT INTO uso_caixa_areia VALUES (2,  'Dudu', 'Dona Clotilde', 'Lavanderia', '14:00', 'Sim', 5.5, '2024-03-20');
INSERT INTO uso_caixa_areia VALUES (3,  'Capitão Frajola', 'Rua', 'Quintal', '23:45', 'Não', 5.0, '2024-03-20');
INSERT INTO uso_caixa_areia VALUES (4,  'Mimi', 'Dona Clotilde', 'Banheiro', '23:15', 'Sim', 3.2, '2024-03-20');
INSERT INTO uso_caixa_areia VALUES (5,  'Nestor', 'Dona Clotilde', 'Quintal', '16:00', 'Sim', 6.2, '2024-03-21');
INSERT INTO uso_caixa_areia VALUES (6,  'Bolinha', 'Detetive Bigode', 'Lavanderia', '01:30', 'Não', 7.8, '2024-03-21');
INSERT INTO uso_caixa_areia VALUES (7,  'Fifi', 'Dona Clotilde', 'Banheiro', '10:00', 'Sim', 3.8, '2024-03-21');
INSERT INTO uso_caixa_areia VALUES (8,  'Mingau', 'Ninguém', 'Quintal', '00:15', 'Não', 4.3, '2024-03-21');
INSERT INTO uso_caixa_areia VALUES (9,  'Lili', 'Dona Clotilde', 'Lavanderia', '22:00', 'Sim', 3.0, '2024-03-22');
INSERT INTO uso_caixa_areia VALUES (10, 'General Bigodão', 'Rua', 'Quintal', '02:00', 'Não', 6.5, '2024-03-22');
INSERT INTO uso_caixa_areia VALUES (11, 'Bebel', 'Dona Clotilde', 'Banheiro', '11:00', 'Sim', 3.5, '2024-03-22');
INSERT INTO uso_caixa_areia VALUES (12, 'Capitão Frajola', 'Rua', 'Lavanderia', '23:50', 'Não', 5.0, '2024-03-22');
```

---

**🎯 Missão:**
Dona Clotilde quer um relatório de **usos suspeitos**. Encontre todos os registros onde:
- O uso foi **não autorizado** (`autorizado = 'Não'`)
- **OU** aconteceu depois das **23:00** (`horario > '23:00'`)

Isso vai capturar tanto os invasores quanto qualquer atividade noturna tardia (mesmo de gatos autorizados).

---

**💡 Dica:**
> Use `OR` para combinar as duas condições: `WHERE autorizado = 'Não' OR horario > '23:00'`. Lembre-se: `OR` retorna linhas que satisfaçam **qualquer uma** das condições.

---

**✅ Script de Solução:**
```sql
-- Usos não autorizados OU em horários suspeitos (depois das 23h)
SELECT nome_gato, dono, caixa_usada, horario, autorizado, data
FROM uso_caixa_areia
WHERE autorizado = 'Não' OR horario > '23:00';
```

**📋 Resultado Esperado:**

| nome_gato | dono | caixa_usada | horario | autorizado | data |
|-----------|------|-------------|---------|------------|------|
| Capitão Frajola | Rua | Quintal | 23:45 | Não | 2024-03-20 |
| Mimi | Dona Clotilde | Banheiro | 23:15 | Sim | 2024-03-20 |
| Bolinha | Detetive Bigode | Lavanderia | 01:30 | Não | 2024-03-21 |
| Mingau | Ninguém | Quintal | 00:15 | Não | 2024-03-21 |
| General Bigodão | Rua | Quintal | 02:00 | Não | 2024-03-22 |
| Capitão Frajola | Rua | Lavanderia | 23:50 | Não | 2024-03-22 |

---

**🔎 Conclusão:**
> **Caso encerrado!** Há uma **invasão sistemática** da casa da Dona Clotilde! 🐱🚽
>
> **Invasores identificados:**
> - **Capitão Frajola** — aparece DUAS vezes (dias 20 e 22), sempre depois das 23h. No dia 20 usou a caixa do quintal; no dia 22, a da lavanderia (entrou mais fundo na casa!).
> - **Bolinha** — o gato do Detetive Bigode! Às 01:30 da manhã na lavanderia. Traidor.
> - **Mingau** — o fantasma, às 00:15 no quintal.
> - **General Bigodão** — gato de rua, às 02:00 no quintal. Primeiro registro oficial desse personagem!
>
> **Nota sobre Mimi:** ela é autorizada, mas apareceu às 23:15. Comportamento fora do padrão? Ou estava "vigiando" a entrada dos outros?
>
> *Dona Clotilde quase desmaia: "O BOLINHA? O gato do SENHOR está usando MINHA areia importada?!" O Detetive fica vermelho: "Dona Clotilde, eu... não sabia que o Bolinha saía de casa à noite." Ela estreita os olhos: "Pois agora o senhor sabe."*
>
> *Nota no caderninho: "GENERAL BIGODÃO — gato de rua grande (6,5 kg), sem dono. Invasor noturno. CAPITÃO FRAJOLA — escalou da caixa do quintal para a lavanderia em dois dias. Está ficando mais ousado. Padrão: os gatos de rua usam as instalações da Dona Clotilde como 'banheiro público premium'. Mas por que só à noite?"*
>
> 🐾 **Os gatos de rua conhecem a casa da Dona Clotilde por dentro, Detetive. E o Capitão Frajola está cada vez mais presente...**
