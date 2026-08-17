---
## 🐾 Nível 12: O Sumiço dos Sachês de Salmão
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Após a descoberta da invasão da despensa, o Detetive Bigode resolve fazer um inventário completo do estoque de sachês. Dona Margarete, dona do petshop "Patinhas de Ouro", emprestou seu sistema de controle de estoque para comparar. O resultado é alarmante: sachês estão desaparecendo não só da casa do Detetive, mas de várias casas do bairro! Cada sachê tem um código, sabor, local onde estava guardado e status atual. Hora de descobrir quais sabores específicos estão sumindo e de quais locais.

**🎬 Introdução:**
*O Detetive Bigode espalha fichas de sachê pela mesa da cozinha. Cada ficha tem um código, sabor e status. Dona Margarete, a dona do petshop, olha por cima do ombro dele com preocupação.*

*"Detetive, eu vendo em média 50 sachês por semana neste bairro. Na última semana, vendi 50 mas recebi reclamações de que 15 'sumiram das prateleiras e despensas'. Isso não é normal." O Detetive arruma os óculos: "Dona Margarete, quais sabores estão sumindo?" Ela suspira: "Salmão, atum e frango. Os premium. Ninguém está roubando sachê de fígado."*

*"Interessante", anota o Detetive. "Os ladrões têm paladar refinado."*

---

**🔍 Conceito SQL deste nível: `BETWEEN` e `IN` (Consolidação)**

Você já aprendeu `BETWEEN` e `IN` no nível anterior. Agora vai combiná-los em um cenário mais complexo, com mais dados e filtros cruzados!

**Reforço:**
- `BETWEEN valor1 AND valor2` → intervalo (inclusive extremos)
- `IN (valor1, valor2, valor3)` → lista de valores específicos
- Podem ser combinados com `AND`/`OR`

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 12: O Sumiço dos Sachês de Salmão
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS estoque_saches;

CREATE TABLE estoque_saches (
    id INTEGER PRIMARY KEY,
    codigo TEXT,
    sabor TEXT,
    peso_gramas INTEGER,
    local_guardado TEXT,
    status TEXT,
    data_ultima_verificacao TEXT,
    observacao TEXT
);

-- Inventário completo de sachês do bairro
INSERT INTO estoque_saches VALUES (1,  'SAL-001', 'Salmão', 85, 'Despensa Detetive', 'Desaparecido', '2024-03-20', 'Sumiu na madrugada');
INSERT INTO estoque_saches VALUES (2,  'SAL-002', 'Salmão', 85, 'Despensa Detetive', 'Desaparecido', '2024-03-21', 'Sumiu na madrugada');
INSERT INTO estoque_saches VALUES (3,  'FRG-001', 'Frango', 85, 'Despensa Detetive', 'OK', '2024-03-23', NULL);
INSERT INTO estoque_saches VALUES (4,  'ATM-001', 'Atum', 85, 'Despensa Detetive', 'Desaparecido', '2024-03-22', 'Sachê de atum levado pelo Capitão Frajola');
INSERT INTO estoque_saches VALUES (5,  'SAL-003', 'Salmão', 85, 'Armário Dona Clotilde', 'Desaparecido', '2024-03-19', 'Prateleira arranhada');
INSERT INTO estoque_saches VALUES (6,  'SAL-004', 'Salmão', 85, 'Armário Dona Clotilde', 'Desaparecido', '2024-03-21', 'Marcas de dentes na embalagem vizinha');
INSERT INTO estoque_saches VALUES (7,  'FIG-001', 'Fígado', 85, 'Armário Dona Clotilde', 'OK', '2024-03-23', NULL);
INSERT INTO estoque_saches VALUES (8,  'FIG-002', 'Fígado', 85, 'Despensa Detetive', 'OK', '2024-03-23', NULL);
INSERT INTO estoque_saches VALUES (9,  'ATM-002', 'Atum', 85, 'Cozinha Pedrinho', 'Desaparecido', '2024-03-20', 'Pedrinho jurou que estava lá ontem');
INSERT INTO estoque_saches VALUES (10, 'SAL-005', 'Salmão', 85, 'Cozinha Pedrinho', 'Desaparecido', '2024-03-22', 'Embalagem encontrada no quintal, vazia');
INSERT INTO estoque_saches VALUES (11, 'FRG-002', 'Frango', 85, 'Armário Dona Clotilde', 'OK', '2024-03-23', NULL);
INSERT INTO estoque_saches VALUES (12, 'CRN-001', 'Carne', 85, 'Cozinha Pedrinho', 'OK', '2024-03-23', NULL);
INSERT INTO estoque_saches VALUES (13, 'SAL-006', 'Salmão', 85, 'Petshop Patinhas de Ouro', 'Desaparecido', '2024-03-18', 'Sumiu da prateleira da loja');
INSERT INTO estoque_saches VALUES (14, 'SAL-007', 'Salmão', 85, 'Petshop Patinhas de Ouro', 'Desaparecido', '2024-03-19', 'Sumiu da prateleira da loja');
INSERT INTO estoque_saches VALUES (15, 'ATM-003', 'Atum', 85, 'Petshop Patinhas de Ouro', 'OK', '2024-03-23', NULL);
```

---

**🎯 Missão:**
Investigue o sumiço de sachês no bairro:
1. Use `IN` para encontrar todos os sachês dos sabores **'Salmão'**, **'Atum'** e **'Frango'** que estão **'Desaparecido'**
2. Use `BETWEEN` para encontrar sachês que desapareceram entre as datas **'2024-03-19'** e **'2024-03-22'**

Cruze as informações: qual **sabor** é o mais visado? De quais **locais** os sachês somem?

---

**💡 Dica:**
> Query 1: `WHERE sabor IN ('Salmão', 'Atum', 'Frango') AND status = 'Desaparecido'`
> Query 2: `WHERE status = 'Desaparecido' AND data_ultima_verificacao BETWEEN '2024-03-19' AND '2024-03-22'`

---

**✅ Script de Solução:**
```sql
-- 1. Sachês premium que desapareceram
SELECT codigo, sabor, local_guardado, data_ultima_verificacao, observacao
FROM estoque_saches
WHERE sabor IN ('Salmão', 'Atum', 'Frango')
  AND status = 'Desaparecido';

-- 2. Sachês que sumiram na janela de tempo suspeita
SELECT codigo, sabor, local_guardado, data_ultima_verificacao
FROM estoque_saches
WHERE status = 'Desaparecido'
  AND data_ultima_verificacao BETWEEN '2024-03-19' AND '2024-03-22';
```

**📋 Resultado Esperado (Query 1 — Premium desaparecidos):**

| codigo | sabor | local_guardado | data_ultima_verificacao | observacao |
|--------|-------|----------------|------------------------|-----------|
| SAL-001 | Salmão | Despensa Detetive | 2024-03-20 | Sumiu na madrugada |
| SAL-002 | Salmão | Despensa Detetive | 2024-03-21 | Sumiu na madrugada |
| ATM-001 | Atum | Despensa Detetive | 2024-03-22 | Sachê de atum levado pelo Capitão Frajola |
| SAL-003 | Salmão | Armário Dona Clotilde | 2024-03-19 | Prateleira arranhada |
| SAL-004 | Salmão | Armário Dona Clotilde | 2024-03-21 | Marcas de dentes na embalagem vizinha |
| ATM-002 | Atum | Cozinha Pedrinho | 2024-03-20 | Pedrinho jurou que estava lá ontem |
| SAL-005 | Salmão | Cozinha Pedrinho | 2024-03-22 | Embalagem encontrada no quintal, vazia |
| SAL-006 | Salmão | Petshop Patinhas de Ouro | 2024-03-18 | Sumiu da prateleira da loja |
| SAL-007 | Salmão | Petshop Patinhas de Ouro | 2024-03-19 | Sumiu da prateleira da loja |

**📋 Resultado Esperado (Query 2 — Janela de tempo):**

| codigo | sabor | local_guardado | data_ultima_verificacao |
|--------|-------|----------------|------------------------|
| SAL-001 | Salmão | Despensa Detetive | 2024-03-20 |
| SAL-002 | Salmão | Despensa Detetive | 2024-03-21 |
| ATM-001 | Atum | Despensa Detetive | 2024-03-22 |
| SAL-003 | Salmão | Armário Dona Clotilde | 2024-03-19 |
| SAL-004 | Salmão | Armário Dona Clotilde | 2024-03-21 |
| ATM-002 | Atum | Cozinha Pedrinho | 2024-03-20 |
| SAL-005 | Salmão | Cozinha Pedrinho | 2024-03-22 |
| SAL-007 | Salmão | Petshop Patinhas de Ouro | 2024-03-19 |

---

**🔎 Conclusão:**
> **Caso encerrado — parcialmente!** O quadro é alarmante! 📊🐱
>
> **Estatísticas do desastre:**
> - **9 sachês** desaparecidos no total
> - **7 são de SALMÃO** — o sabor mais visado, disparado!
> - **2 de Atum** — segundo alvo
> - **0 de Fígado e 0 de Frango** desapareceram — os ladrões são seletivos!
>
> **De onde somem:**
> - Despensa do Detetive: 3 sachês
> - Armário da Dona Clotilde: 2 sachês
> - Cozinha do Pedrinho: 2 sachês
> - **PETSHOP**: 2 sachês!! (Somem direto da LOJA!)
>
> *Dona Margarete fica pálida: "Estão roubando do meu petshop também?! Eu achei que tinha errado a contagem!" O Detetive Bigode bate a mão na mesa: "Dona Margarete, isso não é um gato roubando um petisco. É uma OPERAÇÃO. Sachês somem das casas, somem da loja, e TODOS são de salmão ou atum. Alguém está estocando isso em algum lugar."*
>
> *Nota no caderninho com TRÊS estrelas: "★★★ SACHÊS DE SALMÃO — alvo principal. Roubados de MÚLTIPLOS locais do bairro, inclusive do petshop. Confirmado: Capitão Frajola flagrado levando sachê de atum (Nível 11). Mingau flagrado com sachês de salmão. Vulto não identificado nos demais roubos. TODOS acontecem de madrugada. PARA ONDE ESTÃO LEVANDO OS SACHÊS?"*
>
> 🐾 **A trama engrossa, Detetive. Alguém está organizando um roubo em escala de bairro. E os números não mentem...**
