---
## 🐾 Nível 19: O Correio Felino
**Nível de Dificuldade:** Intermediário

**📜 Briefing:**
Seu Bartolomeu, o carteiro, descobriu algo estranho: bilhetinhos enrolados estão aparecendo dentro de coleiras de gatos do bairro. Ele encontrou 3 bilhetes até agora, todos com mensagens codificadas. O Detetive montou uma lista de "mensagens recebidas" com o nome do gato destinatário. Mas ele quer saber: quais gatos do cadastro **NÃO receberam** mensagem? Se há um sistema de correio felino, os que ficaram de fora podem ser "desconectados" da rede — ou a exclusão pode ser intencional.

**🎬 Introdução:**
*Seu Bartolomeu coloca 3 bilhetinhos amassados na mesa do Detetive. "Encontrei dentro das coleiras enquanto entregava cartas. Este aqui estava na coleira do Nestor, este na da Duquesa e este na do Bolinha." O Detetive desdobra os bilhetes:*

*Bilhete 1 (Nestor): "Reunião confirmada. Trazer sachê."*
*Bilhete 2 (Duquesa): "Porta 3 às 23h. Código: miau."*
*Bilhete 3 (Bolinha): "Obrigado pela colaboração. Continue vigilante."*

*"Isso é um sistema de comunicação!", exclama o Detetive. "Mas quem ENVIA as mensagens? E por que alguns gatos receberam e outros não?"*

---

**🔍 Conceito SQL deste nível: `LEFT JOIN` (Consolidação)**

Agora vamos usar o `LEFT JOIN` ao contrário: em vez de procurar o que NÃO tem correspondência na tabela da direita, vamos partir do cadastro completo e verificar quem NÃO recebeu mensagem.

**Dica:** A tabela "completa" (de onde queremos TODOS os registros) deve ficar à **esquerda** do LEFT JOIN.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 19: O Correio Felino
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS mensagens_coleira;
DROP TABLE IF EXISTS gatos_bairro;

-- Tabela DIREITA: Mensagens encontradas nas coleiras
CREATE TABLE mensagens_coleira (
    id INTEGER PRIMARY KEY,
    destinatario TEXT,
    conteudo TEXT,
    data_encontrada TEXT,
    encontrada_por TEXT
);

INSERT INTO mensagens_coleira VALUES (1, 'Nestor', 'Reunião confirmada. Trazer sachê.', '2024-04-05', 'Seu Bartolomeu');
INSERT INTO mensagens_coleira VALUES (2, 'Duquesa', 'Porta 3 às 23h. Código: miau.', '2024-04-06', 'Seu Bartolomeu');
INSERT INTO mensagens_coleira VALUES (3, 'Bolinha', 'Obrigado pela colaboração. Continue vigilante.', '2024-04-06', 'Detetive Bigode');
INSERT INTO mensagens_coleira VALUES (4, 'Princesa', 'Supervisão do setor 2 aprovada.', '2024-04-07', 'Dona Clotilde');
INSERT INTO mensagens_coleira VALUES (5, 'Foguete', 'Entrega às 00h. Rota norte.', '2024-04-07', 'Seu Agenor');

-- Tabela ESQUERDA: Todos os gatos registrados no bairro
CREATE TABLE gatos_bairro (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    dono TEXT,
    tem_coleira TEXT
);

INSERT INTO gatos_bairro VALUES (1, 'Bolinha', 'Detetive Bigode', 'Sim');
INSERT INTO gatos_bairro VALUES (2, 'Princesa', 'Dona Clotilde', 'Sim');
INSERT INTO gatos_bairro VALUES (3, 'Nestor', 'Dona Clotilde', 'Sim');
INSERT INTO gatos_bairro VALUES (4, 'Mingau', NULL, 'Não');
INSERT INTO gatos_bairro VALUES (5, 'Capitão Frajola', NULL, 'Não');
INSERT INTO gatos_bairro VALUES (6, 'General Bigodão', NULL, 'Não');
INSERT INTO gatos_bairro VALUES (7, 'Foguete', NULL, 'Sim');
INSERT INTO gatos_bairro VALUES (8, 'Duquesa', 'Dona Margarete', 'Sim');
INSERT INTO gatos_bairro VALUES (9, 'Mimi', 'Dona Clotilde', 'Sim');
INSERT INTO gatos_bairro VALUES (10, 'Tobias', 'Dona Jurema', 'Sim');
INSERT INTO gatos_bairro VALUES (11, 'Dudu', 'Dona Clotilde', 'Sim');
```

---

**🎯 Missão:**
1. Use `LEFT JOIN` partindo da tabela `gatos_bairro` para ver quais gatos receberam mensagem e quais não
2. Filtre para encontrar os gatos que **NÃO receberam** nenhuma mensagem
3. Entre os que NÃO receberam: separe os que **têm coleira** (poderiam ter recebido) dos que **não têm** (e portanto não poderiam receber por coleira)

---

**💡 Dica:**
> `FROM gatos_bairro g LEFT JOIN mensagens_coleira m ON g.nome = m.destinatario` — depois `WHERE m.destinatario IS NULL`.

---

**✅ Script de Solução:**
```sql
-- 1. Visão completa: quem recebeu e quem não recebeu
SELECT 
    g.nome,
    g.dono,
    g.tem_coleira,
    m.conteudo AS mensagem_recebida
FROM gatos_bairro g
LEFT JOIN mensagens_coleira m ON g.nome = m.destinatario;

-- 2. Gatos que NÃO receberam mensagem
SELECT 
    g.nome,
    g.dono,
    g.tem_coleira
FROM gatos_bairro g
LEFT JOIN mensagens_coleira m ON g.nome = m.destinatario
WHERE m.destinatario IS NULL;
```

**📋 Resultado Esperado (Query 2 — Sem mensagem):**

| nome | dono | tem_coleira |
|------|------|-------------|
| Mingau | NULL | Não |
| Capitão Frajola | NULL | Não |
| General Bigodão | NULL | Não |
| Mimi | Dona Clotilde | Sim |
| Tobias | Dona Jurema | Sim |
| Dudu | Dona Clotilde | Sim |

---

**🔎 Conclusão:**
> **Caso encerrado!** O sistema de correio revela a hierarquia! 📬🐱
>
> **Quem RECEBEU mensagem** (membros ativos da rede):
> - Nestor, Duquesa, Bolinha, Princesa, Foguete — todos com instruções específicas!
>
> **Quem NÃO recebeu:**
> - **Capitão Frajola, Mingau, General Bigodão** — sem coleira! Eles não recebem mensagens porque são os **EMISSORES**, não destinatários. São a liderança!
> - **Mimi, Tobias, Dudu** — têm coleira mas não receberam. São civis inocentes, fora da rede.
>
> *O Detetive arruma as peças: "O Capitão Frajola não recebe mensagens porque ele ENVIA. Mingau é o agente de campo — recebe ordens verbalmente. General Bigodão é o sentinela — não precisa de bilhete, só precisa saber vigiar. Os bilhetes são para os operativos de segundo escalão."*
>
> *"E a mensagem da Duquesa: 'Porta 3 às 23h. Código: miau.' Porta 3 do petshop? Ela está abrindo o petshop para os ladrões!"*
>
> 🐾 **O sistema de comunicação foi decifrado, Detetive. Agora sabemos quem manda e quem obedece...**
