---
## 🐾 Nível 17: O Caso do Jardim Invadido
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Dona Jurema acordou furiosa: seus canteiros de flores foram destruídos durante a noite. Rosas pisoteadas, terra revirada e buracos cavados ao lado dos vasos. Ela suspeita de cachorros, mas quer provas. Felizmente, ela tem duas fontes de dados: registros de passeio dos pets do bairro (quem passeou perto da casa dela e em qual horário) e um registro dos danos encontrados (tipo de dano, tamanho das marcas). Cruzando essas tabelas, o Detetive pode descobrir quem passou pelo jardim e qual tipo de dano causou.

**🎬 Introdução:**
*O jardim da Dona Jurema parece um campo de batalha. Rosas decapitadas, terra revolvida e o gnomo de cerâmica está de lado com a cabeça suja de lama. "OLHA O MEU JARDIM, DETETIVE!", ela grita, apontando para um canteiro onde antes havia petúnias. Agora há apenas lama e pegadas.*

*"Dona Jurema, que tipo de pegadas são essas?" O Detetive se agacha. "Grandes... caninas. E aqui, menores... felinas? Teve trânsito variado aqui." Ele pega o celular: "A senhora tem os registros do app de monitoramento de passeios? E eu preciso cruzar com as marcas de dano."*

---

**🔍 Conceito SQL deste nível: `INNER JOIN` (Consolidação)**

Agora você vai usar `INNER JOIN` com mais confiança, combinando-o com `WHERE` para filtrar os resultados do cruzamento!

**Lembre-se:** O JOIN cruza as tabelas, e o WHERE filtra o resultado:
```sql
SELECT t1.col, t2.col
FROM tabela1 t1
INNER JOIN tabela2 t2 ON t1.chave = t2.chave
WHERE t1.coluna = 'valor';
```

> 💡 **Aliases curtos:** Use `t1`, `t2` ou letras como `p`, `d` para encurtar nomes de tabelas!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 17: O Caso do Jardim Invadido
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS passeios_noite;
DROP TABLE IF EXISTS danos_jardim;

-- Tabela 1: Registros de passeio na Rua dos Ipês (onde mora Dona Jurema)
CREATE TABLE passeios_noite (
    id INTEGER PRIMARY KEY,
    nome_pet TEXT,
    especie TEXT,
    dono TEXT,
    horario TEXT,
    local_passagem TEXT,
    comportamento TEXT
);

INSERT INTO passeios_noite VALUES (1, 'Thor', 'Cachorro', 'Pedrinho', '22:30', 'Calçada Dona Jurema', 'Puxando a guia em direção ao jardim');
INSERT INTO passeios_noite VALUES (2, 'Salsicha', 'Cachorro', 'Pedrinho', '22:30', 'Calçada Dona Jurema', 'Farejando o portão');
INSERT INTO passeios_noite VALUES (3, 'Capitão Frajola', 'Gato', 'Rua', '23:00', 'Muro Dona Jurema', 'Andando no muro, pulou para o jardim');
INSERT INTO passeios_noite VALUES (4, 'Tobias', 'Gato', 'Dona Jurema', '21:00', 'Jardim Dona Jurema', 'Passeio supervisionado, voltou pra dentro');
INSERT INTO passeios_noite VALUES (5, 'Bolinha', 'Gato', 'Detetive Bigode', '23:45', 'Rua dos Ipês', 'Visto passando mas não entrou no jardim');
INSERT INTO passeios_noite VALUES (6, 'Thor', 'Cachorro', 'Pedrinho', '02:00', 'Jardim Dona Jurema', 'Escapou de casa e foi encontrado no jardim');

-- Tabela 2: Danos encontrados no jardim pela manhã
CREATE TABLE danos_jardim (
    id INTEGER PRIMARY KEY,
    tipo_dano TEXT,
    local_dano TEXT,
    tamanho_marca_cm REAL,
    tipo_marca TEXT,
    suspeito_provavel TEXT
);

INSERT INTO danos_jardim VALUES (1, 'Canteiro destruído', 'Canteiro de rosas', 12.0, 'Canina grande', 'Thor');
INSERT INTO danos_jardim VALUES (2, 'Buraco cavado', 'Ao lado do vaso de azaleias', 12.0, 'Canina grande', 'Thor');
INSERT INTO danos_jardim VALUES (3, 'Planta arrancada', 'Canteiro de petúnias', 4.0, 'Felina', 'Capitão Frajola');
INSERT INTO danos_jardim VALUES (4, 'Gnomo derrubado', 'Centro do jardim', 12.0, 'Canina grande', 'Thor');
INSERT INTO danos_jardim VALUES (5, 'Marcas de garra no tronco', 'Árvore de jabuticaba', 4.0, 'Felina', 'Capitão Frajola');
INSERT INTO danos_jardim VALUES (6, 'Buraco pequeno', 'Perto da cerca', 5.5, 'Canina pequena', 'Salsicha');
```

---

**🎯 Missão:**
Use `INNER JOIN` para cruzar os registros de passeio com os danos no jardim. A coluna em comum é o `nome_pet` (passeios) e `suspeito_provavel` (danos).

Adicione um `WHERE` para filtrar apenas os pets que **realmente entraram no jardim** (excluir quem só passou pela calçada).

---

**💡 Dica:**
> JOIN: `ON p.nome_pet = d.suspeito_provavel`
> WHERE: filtre por `local_passagem` que contenha 'Jardim' usando LIKE, ou filtre registros onde o pet realmente causou dano.

---

**✅ Script de Solução:**
```sql
-- Cruzar passeios com danos para confirmar culpados
SELECT 
    p.nome_pet,
    p.horario AS hora_passagem,
    p.comportamento,
    d.tipo_dano,
    d.local_dano,
    d.tipo_marca
FROM passeios_noite p
INNER JOIN danos_jardim d ON p.nome_pet = d.suspeito_provavel
WHERE p.local_passagem LIKE '%Jardim%' 
   OR p.comportamento LIKE '%jardim%'
ORDER BY p.horario;
```

**📋 Resultado Esperado:**

| nome_pet | hora_passagem | comportamento | tipo_dano | local_dano | tipo_marca |
|----------|---------------|---------------|-----------|------------|------------|
| Capitão Frajola | 23:00 | Andando no muro, pulou para o jardim | Planta arrancada | Canteiro de petúnias | Felina |
| Capitão Frajola | 23:00 | Andando no muro, pulou para o jardim | Marcas de garra no tronco | Árvore de jabuticaba | Felina |
| Thor | 02:00 | Escapou de casa e foi encontrado no jardim | Canteiro destruído | Canteiro de rosas | Canina grande |
| Thor | 02:00 | Escapou de casa e foi encontrado no jardim | Buraco cavado | Ao lado do vaso de azaleias | Canina grande |
| Thor | 02:00 | Escapou de casa e foi encontrado no jardim | Gnomo derrubado | Centro do jardim | Canina grande |

---

**🔎 Conclusão:**
> **Caso encerrado!** Dois culpados confirmados pelo cruzamento de dados! 🌺💥
>
> **Thor** (02:00) — Escapou de casa e causou **3 danos**: canteiro destruído, buraco cavado e gnomo derrubado. Destruição clássica de labrador.
>
> **Capitão Frajola** (23:00) — Pulou o muro e causou **2 danos**: planta arrancada e marcas de garra na árvore.
>
> Note que **Salsicha** tem um buraco "canino pequeno" atribuído a ele, mas no registro de passeio ele só "farejou o portão" da calçada — evidência circunstancial, não confirmada pelo cruzamento.
>
> *Dona Jurema aponta para o Detetive: "Eu quero indenização! O gnomo custou R$89!" O Detetive anota: "Capitão Frajola estava no jardim da Dona Jurema 2 horas ANTES de aparecer no telhado da Dona Clotilde. Ele está fazendo 'rondas' pelo bairro antes das reuniões."*
>
> 🐾 **O Capitão Frajola patrulha o bairro como um general, Detetive. A rede se expande...**
