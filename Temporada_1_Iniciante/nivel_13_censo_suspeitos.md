---
## 🐾 Nível 13: O Censo dos Suspeitos
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Dona Jurema, presidente da Associação de Moradores, convocou uma reunião de emergência. Com tantos incidentes acontecendo — ração sumindo, sachês desaparecendo, vasos quebrando — ela exige dados concretos. "Quantos pets existem no bairro? Quantos têm acesso livre às casas? Quantos são gatos?" Ela quer estatísticas para apresentar na reunião. O Detetive Bigode fez um cadastro completo de todos os pets do bairro para gerar o relatório.

**🎬 Introdução:**
*A reunião da Associação de Moradores acontece no salão da igreja. Dona Jurema está no púlpito com um laser pointer e uma postura de CEO de multinacional. "Senhores e senhoras, estamos em CRISE. Os incidentes com animais domésticos aumentaram 300% neste mês!"*

*Seu Agenor levanta a mão: "QUATROCENTOS por cento, Jurema! Eu conto tudo da minha janela!" Dona Clotilde bufa: "Meus gatos não são o problema!" Pedrinho esconde Thor debaixo da cadeira.*

*O Detetive Bigode é chamado à frente: "Detetive, precisamos de NÚMEROS. Quantos animais, quantos com acesso livre, quantos gatos. Dados concretos!" O Detetive abre o notebook: "Eu fiz um censo. Vamos contar."*

---

**🔍 Conceito SQL deste nível: Funções de Agregação — `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`**

Funções de agregação calculam um **valor único** a partir de múltiplas linhas. São essenciais para estatísticas!

| Função | O que faz | Exemplo |
|--------|-----------|---------|
| `COUNT(*)` | Conta o número de linhas | `SELECT COUNT(*) FROM pets;` |
| `COUNT(coluna)` | Conta valores não-nulos da coluna | `SELECT COUNT(dono) FROM pets;` |
| `SUM(coluna)` | Soma os valores numéricos | `SELECT SUM(peso_kg) FROM pets;` |
| `AVG(coluna)` | Calcula a média | `SELECT AVG(peso_kg) FROM pets;` |
| `MIN(coluna)` | Retorna o menor valor | `SELECT MIN(peso_kg) FROM pets;` |
| `MAX(coluna)` | Retorna o maior valor | `SELECT MAX(peso_kg) FROM pets;` |

**Exemplos:**
```sql
-- Quantos pets existem?
SELECT COUNT(*) FROM pets;

-- Quantos gatos existem?
SELECT COUNT(*) FROM pets WHERE especie = 'Gato';

-- Qual o peso médio dos pets?
SELECT AVG(peso_kg) FROM pets;
```

> 💡 **Dica:** Funções de agregação podem ser combinadas com `WHERE` para contar/somar apenas registros filtrados!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 13: O Censo dos Suspeitos
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS cadastro_pets;

CREATE TABLE cadastro_pets (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    especie TEXT,
    raca TEXT,
    peso_kg REAL,
    idade_anos INTEGER,
    dono TEXT,
    tem_acesso_livre TEXT,
    registrado TEXT,
    incidentes_envolvido INTEGER
);

-- Censo completo de pets do bairro
INSERT INTO cadastro_pets VALUES (1,  'Bolinha', 'Gato', 'SRD', 7.8, 5, 'Detetive Bigode', 'Sim', 'Sim', 4);
INSERT INTO cadastro_pets VALUES (2,  'Thor', 'Cachorro', 'Labrador', 32.0, 3, 'Pedrinho', 'Sim', 'Sim', 5);
INSERT INTO cadastro_pets VALUES (3,  'Princesa', 'Gato', 'Persa', 4.1, 4, 'Dona Clotilde', 'Sim', 'Sim', 3);
INSERT INTO cadastro_pets VALUES (4,  'Mingau', 'Gato', 'SRD', 4.3, 2, NULL, 'Sim', 'Não', 3);
INSERT INTO cadastro_pets VALUES (5,  'Salsicha', 'Cachorro', 'Dachshund', 5.2, 6, 'Pedrinho', 'Sim', 'Sim', 1);
INSERT INTO cadastro_pets VALUES (6,  'Capitão Frajola', 'Gato', 'SRD', 5.0, 4, NULL, 'Sim', 'Não', 3);
INSERT INTO cadastro_pets VALUES (7,  'Pipoca', 'Hamster', 'Sírio', 0.12, 1, 'Pedrinho', 'Não', 'Sim', 1);
INSERT INTO cadastro_pets VALUES (8,  'Mimi', 'Gato', 'SRD', 3.2, 7, 'Dona Clotilde', 'Sim', 'Sim', 0);
INSERT INTO cadastro_pets VALUES (9,  'Nestor', 'Gato', 'SRD', 6.2, 5, 'Dona Clotilde', 'Sim', 'Sim', 3);
INSERT INTO cadastro_pets VALUES (10, 'Duquesa', 'Gato', 'Siamês', 3.9, 3, 'Dona Margarete', 'Sim', 'Sim', 0);
INSERT INTO cadastro_pets VALUES (11, 'General Bigodão', 'Gato', 'SRD', 6.5, 8, NULL, 'Sim', 'Não', 1);
INSERT INTO cadastro_pets VALUES (12, 'Foguete', 'Gato', 'SRD', 3.8, 2, NULL, 'Sim', 'Não', 0);
INSERT INTO cadastro_pets VALUES (13, 'Dudu', 'Gato', 'SRD', 5.5, 6, 'Dona Clotilde', 'Sim', 'Sim', 0);
INSERT INTO cadastro_pets VALUES (14, 'Fifi', 'Gato', 'SRD', 3.8, 4, 'Dona Clotilde', 'Sim', 'Sim', 1);
INSERT INTO cadastro_pets VALUES (15, 'Lili', 'Gato', 'SRD', 3.0, 3, 'Dona Clotilde', 'Sim', 'Sim', 0);
INSERT INTO cadastro_pets VALUES (16, 'Bebel', 'Gato', 'SRD', 3.5, 2, 'Dona Clotilde', 'Sim', 'Sim', 1);
INSERT INTO cadastro_pets VALUES (17, 'Tobias', 'Gato', 'Maine Coon', 8.0, 5, 'Dona Jurema', 'Não', 'Sim', 0);
```

---

**🎯 Missão:**
Dona Jurema quer o relatório para a reunião. Calcule:
1. **Total de pets** no bairro
2. **Total de gatos** no bairro
3. **Quantos pets** têm acesso livre
4. **Quantos pets** NÃO são registrados (donos de rua)
5. **Peso médio** dos gatos do bairro
6. **Total de incidentes** envolvendo todos os pets

---

**💡 Dica:**
> Use `COUNT(*)` com `WHERE` para cada filtro diferente. Para o peso médio, use `AVG(peso_kg)`. Para o total de incidentes, use `SUM(incidentes_envolvido)`.

---

**✅ Script de Solução:**
```sql
-- 1. Total de pets no bairro
SELECT COUNT(*) AS total_pets FROM cadastro_pets;

-- 2. Total de gatos
SELECT COUNT(*) AS total_gatos FROM cadastro_pets WHERE especie = 'Gato';

-- 3. Pets com acesso livre
SELECT COUNT(*) AS pets_acesso_livre FROM cadastro_pets WHERE tem_acesso_livre = 'Sim';

-- 4. Pets sem registro (sem dono)
SELECT COUNT(*) AS pets_sem_registro FROM cadastro_pets WHERE registrado = 'Não';

-- 5. Peso médio dos gatos
SELECT AVG(peso_kg) AS peso_medio_gatos FROM cadastro_pets WHERE especie = 'Gato';

-- 6. Total de incidentes
SELECT SUM(incidentes_envolvido) AS total_incidentes FROM cadastro_pets;
```

**📋 Resultados Esperados:**

| Consulta | Resultado |
|----------|-----------|
| Total de pets | **17** |
| Total de gatos | **14** |
| Pets com acesso livre | **16** |
| Pets sem registro | **4** |
| Peso médio dos gatos | **~4.76 kg** |
| Total de incidentes | **26** |

---

**🔎 Conclusão:**
> **Censo concluído!** Os números são reveladores! 📊
>
> **Dados para a reunião:**
> - O bairro tem **17 pets**, dos quais **14 são gatos** (82%!) — maioria absoluta felina
> - **16 de 17** têm acesso livre às ruas — quase todos circulam sem controle!
> - **4 gatos** não são registrados: **Mingau, Capitão Frajola, General Bigodão e Foguete** — todos sem dono oficial
> - **26 incidentes** registrados no total — quase 2 por animal!
>
> *Dona Jurema bate o martelo na mesa: "DEZESSEIS animais com acesso livre?! E QUATRO gatos de rua sem dono? Como vamos controlar isso?" Dona Clotilde protesta: "Meus 7 gatos são registrados e educados!" Seu Agenor resmunga: "Educados? ELES USAM MINHA CALÇADA COMO BANHEIRO!"*
>
> *O Detetive Bigode anota: "Os 4 gatos sem dono (Mingau, Capitão Frajola, General Bigodão, Foguete) têm acesso total ao bairro. Destes, Capitão Frajola e Mingau já apareceram em MÚLTIPLOS casos. Foguete ainda não apareceu em nenhum incidente — mas está registrado como sem dono. O que Foguete faz? Quem é Foguete?"*
>
> 🐾 **Os números não mentem, Detetive. E Foguete, o gato fantasma, ainda vai dar o que falar...**
