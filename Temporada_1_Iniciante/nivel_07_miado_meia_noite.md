---
## 🐾 Nível 7: O Miado da Meia-Noite
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Vários moradores do bairro estão reclamando de sons estranhos durante a madrugada. Seu Agenor (que não dorme bem) tem registrado todos os sons que ouve entre 23h e 5h da manhã há uma semana. Miados, latidos, barulhos de lata, passos no telhado — o bairro virou uma sinfonia noturna. A Associação de Moradores quer saber: quais sons são especificamente **miados** e de onde vêm? Porque se há gatos fazendo reuniões à noite, Dona Jurema quer convocar uma assembleia extraordinária.

**🎬 Introdução:**
*O Detetive Bigode se reúne com Seu Agenor na varanda. O velho tem olheiras fundas e uma caderneta cheia de anotações. "Detetive, eu não durmo há uma semana! Todo santo dia tem barulho! Miados, latidos, batidas, parece que os animais estão organizando um festival de música!" Ele empurra a caderneta para o Detetive. "Anotei TUDO. Horário, descrição, local, intensidade. Tá tudo aí."*

*O Detetive folheia as páginas. São dezenas de registros. "Seu Agenor, eu preciso filtrar só os miados. A Dona Jurema quer um relatório específico sobre atividade felina." Seu Agenor estreita os olhos: "Aqueles gatos estão tramando algo, Detetive. Eu SINTO."*

---

**🔍 Conceito SQL deste nível: `LIKE` e Curingas**

Às vezes você não sabe o valor exato que está procurando, mas sabe **parte** dele. O `LIKE` permite buscar por **padrões** em textos!

**Curingas (wildcards):**
| Curinga | Significado | Exemplo |
|---------|-------------|---------|
| `%` | Qualquer sequência de caracteres (0 ou mais) | `'%gato%'` encontra "gato preto", "o gato fugiu", "gatos" |
| `_` | Exatamente UM caractere | `'_ato'` encontra "gato", "pato", "rato" |

**Sintaxe:**
```sql
SELECT * FROM tabela WHERE coluna LIKE 'padrão';
```

**Exemplos:**
```sql
-- Encontrar descrições que contenham a palavra "miado"
SELECT * FROM sons WHERE descricao LIKE '%miado%';

-- Encontrar nomes que comecem com "Bo"
SELECT * FROM pets WHERE nome LIKE 'Bo%';

-- Encontrar nomes com exatamente 4 letras começando com "M"
SELECT * FROM pets WHERE nome LIKE 'M___';
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 7: O Miado da Meia-Noite
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS sons_noturnos;

CREATE TABLE sons_noturnos (
    id INTEGER PRIMARY KEY,
    data TEXT,
    horario TEXT,
    descricao TEXT,
    local_origem TEXT,
    intensidade TEXT
);

-- Uma semana de registros sonoros do Seu Agenor
INSERT INTO sons_noturnos VALUES (1,  '2024-03-18', '23:30', 'Latido forte e intermitente', 'Quintal do Pedrinho', 'Alta');
INSERT INTO sons_noturnos VALUES (2,  '2024-03-18', '01:15', 'Miado longo e agudo', 'Telhado da Dona Clotilde', 'Média');
INSERT INTO sons_noturnos VALUES (3,  '2024-03-19', '00:45', 'Barulho de lata caindo', 'Beco ao lado', 'Alta');
INSERT INTO sons_noturnos VALUES (4,  '2024-03-19', '02:00', 'Miado curto repetido 3 vezes', 'Muro do quintal', 'Baixa');
INSERT INTO sons_noturnos VALUES (5,  '2024-03-19', '03:30', 'Passos no telhado', 'Telhado do Seu Agenor', 'Baixa');
INSERT INTO sons_noturnos VALUES (6,  '2024-03-20', '00:10', 'Miado duplo em coro', 'Telhado da Dona Clotilde', 'Média');
INSERT INTO sons_noturnos VALUES (7,  '2024-03-20', '01:00', 'Cachorro choramingando', 'Quintal do Detetive', 'Baixa');
INSERT INTO sons_noturnos VALUES (8,  '2024-03-20', '02:45', 'Miado grave seguido de silêncio', 'Telhado da Dona Clotilde', 'Alta');
INSERT INTO sons_noturnos VALUES (9,  '2024-03-21', '04:00', 'Galos cantando (normal)', 'Sítio do fim da rua', 'Média');
INSERT INTO sons_noturnos VALUES (10, '2024-03-21', '01:30', 'Barulho de briga de gatos', 'Beco ao lado', 'Alta');
INSERT INTO sons_noturnos VALUES (11, '2024-03-22', '00:30', 'Miado melodioso como uma sereia felina', 'Telhado da Dona Clotilde', 'Média');
INSERT INTO sons_noturnos VALUES (12, '2024-03-22', '03:00', 'Porta batendo com o vento', 'Casa do Detetive', 'Baixa');
```

---

**🎯 Missão:**
Seu Agenor registrou muitos sons, mas Dona Jurema quer saber apenas sobre os **miados**! Use `LIKE` para filtrar todos os registros que contenham a palavra **"miado"** (ou **"Miado"**) na descrição.

Descubra: De **onde** vêm a maioria dos miados? Há um padrão de localização?

---

**💡 Dica:**
> Use `WHERE descricao LIKE '%iado%'` para capturar tanto "Miado" (com M maiúsculo) quanto "miado" (minúsculo). O `%` antes e depois garante que a palavra pode estar em qualquer parte da descrição.

---

**✅ Script de Solução:**
```sql
-- Filtrar todos os registros que contenham "miado" ou "Miado" na descrição
SELECT data, horario, descricao, local_origem
FROM sons_noturnos
WHERE descricao LIKE '%iado%';
```

**📋 Resultado Esperado:**

| data | horario | descricao | local_origem |
|------|---------|-----------|--------------|
| 2024-03-18 | 01:15 | Miado longo e agudo | Telhado da Dona Clotilde |
| 2024-03-19 | 02:00 | Miado curto repetido 3 vezes | Muro do quintal |
| 2024-03-20 | 00:10 | Miado duplo em coro | Telhado da Dona Clotilde |
| 2024-03-20 | 02:45 | Miado grave seguido de silêncio | Telhado da Dona Clotilde |
| 2024-03-22 | 00:30 | Miado melodioso como uma sereia felina | Telhado da Dona Clotilde |

---

**🔎 Conclusão:**
> **Caso encerrado!** Os miados vêm majoritariamente do **Telhado da Dona Clotilde**! 🏠🐱
>
> De 5 registros de miados:
> - **4** vêm do **Telhado da Dona Clotilde** (nos dias 18, 20 e 22)
> - **1** vem do **Muro do quintal** (dia 19, como se fosse um "posto avançado")
>
> O padrão é claro: o telhado da Dona Clotilde é um **ponto de encontro noturno para gatos**. Os miados variam de "longo e agudo" a "duplo em coro" e até "melodioso como uma sereia felina" — sugerindo que **múltiplos gatos** se reúnem lá.
>
> *Seu Agenor bate na mesa: "EU SABIA! Reuniões secretas no telhado! É uma conspiração felina!" O Detetive tenta acalmar: "Seu Agenor, talvez sejam só gatos sendo gatos..." Mas por dentro, o Detetive anota: "Reuniões regulares. Sempre no telhado da Clotilde. Sempre entre 00h e 03h. Investigar mais a fundo."*
>
> *Nota especial: o "Miado grave seguido de silêncio" às 02:45 do dia 20 é particularmente suspeito. Parece um sinal — um comando para os outros pararem de miar. Quem dá ordens a gatos?*
>
> 🐾 **O telhado da Dona Clotilde esconde segredos, Detetive. E os gatos não estão só miando...**
