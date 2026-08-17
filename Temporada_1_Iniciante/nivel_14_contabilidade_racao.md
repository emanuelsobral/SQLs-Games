---
## 🐾 Nível 14: A Contabilidade da Ração
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Após o censo, o Detetive Bigode decide monitorar o consumo de ração no bairro durante uma semana. Cada dono anotou quanto de ração (em gramas) cada pet consumiu por dia. O objetivo é duplo: (1) descobrir qual pet consome mais do que deveria (possível evidência de que está comendo ração alheia) e (2) calcular o consumo total da semana para saber se o total bate com o estoque comprado. Spoiler: não vai bater.

**🎬 Introdução:**
*O Detetive Bigode distribui planilhas para todos os vizinhos: "Anotem TUDO que seus pets comerem esta semana. Cada grama conta." Dona Clotilde reclama: "Eu tenho SETE gatos, Detetive! Vou ficar o dia todo pesando ração?!" Pedrinho levanta a mão: "O Thor comeu meu dever de casa ontem. Anoto isso também?"*

*Uma semana depois, os dados estão compilados. O Detetive olha para os números e franze a testa: "Algo não bate. O consumo registrado é menor do que a ração comprada. Tem ração sumindo de algum lugar..."*

---

**🔍 Conceito SQL deste nível: Funções de Agregação (Consolidação)**

Agora você vai usar `SUM`, `AVG`, `MAX` e `MIN` em consultas mais complexas, combinadas com `WHERE` para análises segmentadas!

**Reforço:**
```sql
-- Soma do consumo de um pet específico
SELECT SUM(gramas) FROM consumo WHERE nome_pet = 'Bolinha';

-- Máximo consumo diário de qualquer pet
SELECT MAX(gramas) FROM consumo;

-- Mínimo consumo entre os gatos
SELECT MIN(gramas) FROM consumo WHERE especie = 'Gato';
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 14: A Contabilidade da Ração
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS consumo_racao;

CREATE TABLE consumo_racao (
    id INTEGER PRIMARY KEY,
    nome_pet TEXT,
    especie TEXT,
    dia_semana TEXT,
    gramas_consumidas INTEGER,
    tipo_racao TEXT,
    dono TEXT
);

-- Consumo semanal registrado (Segunda a Domingo)
INSERT INTO consumo_racao VALUES (1,  'Bolinha', 'Gato', 'Segunda', 120, 'Premium Frango', 'Detetive Bigode');
INSERT INTO consumo_racao VALUES (2,  'Bolinha', 'Gato', 'Terça', 135, 'Premium Frango', 'Detetive Bigode');
INSERT INTO consumo_racao VALUES (3,  'Bolinha', 'Gato', 'Quarta', 150, 'Premium Frango', 'Detetive Bigode');
INSERT INTO consumo_racao VALUES (4,  'Bolinha', 'Gato', 'Quinta', 140, 'Premium Frango', 'Detetive Bigode');
INSERT INTO consumo_racao VALUES (5,  'Bolinha', 'Gato', 'Sexta', 160, 'Premium Frango', 'Detetive Bigode');
INSERT INTO consumo_racao VALUES (6,  'Bolinha', 'Gato', 'Sábado', 180, 'Premium Frango', 'Detetive Bigode');
INSERT INTO consumo_racao VALUES (7,  'Bolinha', 'Gato', 'Domingo', 170, 'Premium Frango', 'Detetive Bigode');
INSERT INTO consumo_racao VALUES (8,  'Thor', 'Cachorro', 'Segunda', 450, 'Super Premium', 'Pedrinho');
INSERT INTO consumo_racao VALUES (9,  'Thor', 'Cachorro', 'Terça', 500, 'Super Premium', 'Pedrinho');
INSERT INTO consumo_racao VALUES (10, 'Thor', 'Cachorro', 'Quarta', 480, 'Super Premium', 'Pedrinho');
INSERT INTO consumo_racao VALUES (11, 'Thor', 'Cachorro', 'Quinta', 520, 'Super Premium', 'Pedrinho');
INSERT INTO consumo_racao VALUES (12, 'Thor', 'Cachorro', 'Sexta', 470, 'Super Premium', 'Pedrinho');
INSERT INTO consumo_racao VALUES (13, 'Thor', 'Cachorro', 'Sábado', 550, 'Super Premium', 'Pedrinho');
INSERT INTO consumo_racao VALUES (14, 'Thor', 'Cachorro', 'Domingo', 490, 'Super Premium', 'Pedrinho');
INSERT INTO consumo_racao VALUES (15, 'Princesa', 'Gato', 'Segunda', 60, 'Premium Salmão', 'Dona Clotilde');
INSERT INTO consumo_racao VALUES (16, 'Princesa', 'Gato', 'Terça', 55, 'Premium Salmão', 'Dona Clotilde');
INSERT INTO consumo_racao VALUES (17, 'Princesa', 'Gato', 'Quarta', 65, 'Premium Salmão', 'Dona Clotilde');
INSERT INTO consumo_racao VALUES (18, 'Princesa', 'Gato', 'Quinta', 50, 'Premium Salmão', 'Dona Clotilde');
INSERT INTO consumo_racao VALUES (19, 'Princesa', 'Gato', 'Sexta', 60, 'Premium Salmão', 'Dona Clotilde');
INSERT INTO consumo_racao VALUES (20, 'Princesa', 'Gato', 'Sábado', 55, 'Premium Salmão', 'Dona Clotilde');
INSERT INTO consumo_racao VALUES (21, 'Princesa', 'Gato', 'Domingo', 58, 'Premium Salmão', 'Dona Clotilde');
INSERT INTO consumo_racao VALUES (22, 'Salsicha', 'Cachorro', 'Segunda', 180, 'Standard', 'Pedrinho');
INSERT INTO consumo_racao VALUES (23, 'Salsicha', 'Cachorro', 'Terça', 175, 'Standard', 'Pedrinho');
INSERT INTO consumo_racao VALUES (24, 'Salsicha', 'Cachorro', 'Quarta', 190, 'Standard', 'Pedrinho');
INSERT INTO consumo_racao VALUES (25, 'Salsicha', 'Cachorro', 'Quinta', 170, 'Standard', 'Pedrinho');
INSERT INTO consumo_racao VALUES (26, 'Salsicha', 'Cachorro', 'Sexta', 185, 'Standard', 'Pedrinho');
INSERT INTO consumo_racao VALUES (27, 'Salsicha', 'Cachorro', 'Sábado', 195, 'Standard', 'Pedrinho');
INSERT INTO consumo_racao VALUES (28, 'Salsicha', 'Cachorro', 'Domingo', 180, 'Standard', 'Pedrinho');
```

---

**🎯 Missão:**
Gere o relatório financeiro da ração:
1. **Consumo total** da semana (todos os pets juntos)
2. **Consumo total do Bolinha** (ele é suspeito de comer demais)
3. **Consumo médio diário** do Bolinha (um gato de 7,8 kg deveria comer ~60g/dia)
4. **Maior consumo diário** registrado entre TODOS os gatos (especie = 'Gato')
5. **Menor consumo diário** registrado no bairro inteiro

---

**💡 Dica:**
> Combine funções de agregação com `WHERE` para filtrar. Ex: `SELECT AVG(gramas_consumidas) FROM consumo_racao WHERE nome_pet = 'Bolinha';`

---

**✅ Script de Solução:**
```sql
-- 1. Consumo total da semana
SELECT SUM(gramas_consumidas) AS total_semana_gramas FROM consumo_racao;

-- 2. Consumo total do Bolinha na semana
SELECT SUM(gramas_consumidas) AS total_bolinha FROM consumo_racao WHERE nome_pet = 'Bolinha';

-- 3. Consumo médio diário do Bolinha
SELECT AVG(gramas_consumidas) AS media_diaria_bolinha FROM consumo_racao WHERE nome_pet = 'Bolinha';

-- 4. Maior consumo diário entre os GATOS
SELECT MAX(gramas_consumidas) AS max_consumo_gato FROM consumo_racao WHERE especie = 'Gato';

-- 5. Menor consumo diário do bairro
SELECT MIN(gramas_consumidas) AS min_consumo FROM consumo_racao;
```

**📋 Resultados Esperados:**

| Consulta | Resultado |
|----------|-----------|
| Total da semana | **6,307 gramas** (≈6,3 kg) |
| Total do Bolinha | **1,055 gramas** |
| Média diária Bolinha | **~150,7 gramas** |
| Maior consumo diário (gatos) | **180 gramas** (Bolinha, Sábado!) |
| Menor consumo diário (todos) | **50 gramas** (Princesa, Quinta) |

---

**🔎 Conclusão:**
> **Contabilidade concluída!** Os números são ESCANDALOSOS! 📊🍽️
>
> **O caso Bolinha:**
> - Um gato saudável de 4-5 kg deve comer **~60g/dia**. Bolinha pesa 7,8 kg e come em média **150,7g/dia** — **mais que o DOBRO** do recomendável!
> - No sábado, Bolinha comeu **180g** — o RECORDE entre todos os gatos!
> - Consumo semanal de Bolinha: **1.055g** (mais de 1 kg de ração em uma semana!)
> - Comparação: Princesa come em média ~57g/dia — dentro do normal.
>
> **O grande mistério:** O total registrado é 6.307g. Os donos compraram 8.000g de ração na semana. Isso significa que **1.693g de ração estão DESAPARECIDAS** — quase 1,7 kg sem explicação! Essa ração está indo para os gatos de rua? Para o "depósito" misterioso?
>
> *O Detetive Bigode calcula: "Bolinha come demais, mas mesmo assim sobram 1,7 kg sem destino. Essa ração está alimentando o Capitão Frajola, o Mingau, o General Bigodão e o Foguete. Mas como? Alguém está facilitando o acesso deles."*
>
> *Nota no caderninho: "Bolinha come 2,5x mais que um gato normal. Ele PRECISA de dieta, mas não agora — agora ele é uma testemunha importante. Se Bolinha fica na cozinha de madrugada comendo, ele VÊ quem entra e sai. Interrogar Bolinha. (Nota: gatos não falam. Consultar dados da câmera.)"*
>
> 🐾 **Quase 2 kg de ração sumindo por semana. Os números confirmam: há uma rede de alimentação clandestina no bairro...**
