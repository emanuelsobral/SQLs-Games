---
## 🐾 Nível 35: Os Disfarces do Mingau
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
Mingau, o gato preto misterioso, tem sido avistado em vários locais com descrições diferentes. Às vezes com coleira azul, às vezes sem coleira, às vezes com um sino. O Detetive suspeita que ele usa "disfarces". Para classificar as aparições, ele precisa do `CASE WHEN` — criando categorias baseadas em condições.

**🎬 Introdução:**
*"Mingau nunca aparece igual", nota o Detetive analisando fotos. "Com coleira, sem coleira, com sino, com laço... Ele muda a aparência propositalmente? Preciso classificar cada aparição por 'nível de disfarce'."*

---

**🔍 Conceito SQL deste nível: `CASE WHEN`**

O `CASE WHEN` é como um "SE/ENTÃO" dentro do SQL. Cria uma nova coluna com valores baseados em condições!

```sql
SELECT nome,
    CASE 
        WHEN peso > 7 THEN 'Gordo'
        WHEN peso > 4 THEN 'Normal'
        ELSE 'Magro'
    END AS classificacao
FROM pets;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS aparicoes_mingau;

CREATE TABLE aparicoes_mingau (
    id INTEGER PRIMARY KEY,
    data TEXT,
    horario TEXT,
    local_visto TEXT,
    com_coleira TEXT,
    cor_coleira TEXT,
    com_sino TEXT,
    descricao_adicional TEXT
);

INSERT INTO aparicoes_mingau VALUES (1, '2024-04-15', '23:00', 'Petshop', 'Sim', 'Azul', 'Não', 'Parecia um gato doméstico normal');
INSERT INTO aparicoes_mingau VALUES (2, '2024-04-16', '02:00', 'Despensa Detetive', 'Não', NULL, 'Não', 'Completamente sem acessórios');
INSERT INTO aparicoes_mingau VALUES (3, '2024-04-17', '14:00', 'Praça Central', 'Sim', 'Vermelha', 'Sim', 'Parecia perdido, pedindo carinho');
INSERT INTO aparicoes_mingau VALUES (4, '2024-04-18', '00:30', 'Telhado Dona Clotilde', 'Não', NULL, 'Não', 'Silencioso e rápido');
INSERT INTO aparicoes_mingau VALUES (5, '2024-04-19', '10:00', 'Calçada Dona Jurema', 'Sim', 'Rosa', 'Sim', 'Parecendo gato de madame');
INSERT INTO aparicoes_mingau VALUES (6, '2024-04-20', '01:00', 'Galpão abandonado', 'Não', NULL, 'Não', 'Totalmente camuflado no escuro');
INSERT INTO aparicoes_mingau VALUES (7, '2024-04-21', '16:00', 'Petshop (dentro)', 'Sim', 'Azul', 'Sim', 'Dona Margarete achou que era gato de cliente');
```

---

**🎯 Missão:**
Classifique cada aparição de Mingau:
- Se `com_coleira = 'Sim' AND com_sino = 'Sim'` → **'Disfarce completo'**
- Se `com_coleira = 'Sim' AND com_sino = 'Não'` → **'Disfarce parcial'**
- Se `com_coleira = 'Não'` → **'Modo operacional'**

---

**✅ Script de Solução:**
```sql
SELECT 
    data,
    horario,
    local_visto,
    CASE 
        WHEN com_coleira = 'Sim' AND com_sino = 'Sim' THEN 'Disfarce completo'
        WHEN com_coleira = 'Sim' AND com_sino = 'Não' THEN 'Disfarce parcial'
        WHEN com_coleira = 'Não' THEN 'Modo operacional'
    END AS nivel_disfarce,
    descricao_adicional
FROM aparicoes_mingau
ORDER BY data;
```

**📋 Resultado:**

| data | horario | local_visto | nivel_disfarce | descricao_adicional |
|------|---------|-------------|---------------|---------------------|
| 2024-04-15 | 23:00 | Petshop | Disfarce parcial | Parecia um gato doméstico normal |
| 2024-04-16 | 02:00 | Despensa Detetive | Modo operacional | Completamente sem acessórios |
| 2024-04-17 | 14:00 | Praça Central | Disfarce completo | Parecia perdido, pedindo carinho |
| 2024-04-18 | 00:30 | Telhado Dona Clotilde | Modo operacional | Silencioso e rápido |
| 2024-04-19 | 10:00 | Calçada Dona Jurema | Disfarce completo | Parecendo gato de madame |
| 2024-04-20 | 01:00 | Galpão abandonado | Modo operacional | Totalmente camuflado no escuro |
| 2024-04-21 | 16:00 | Petshop (dentro) | Disfarce completo | Dona Margarete achou que era gato de cliente |

---

**🔎 Conclusão:**
> O padrão é claro: **Modo operacional** (sem acessórios) à noite para missões. **Disfarce completo** (coleira + sino) de dia em locais públicos para parecer inofensivo. Mingau é um verdadeiro **agente duplo**!
>
> *"Ele entrou no petshop de DIA com disfarce completo e a Dona Margarete nem reconheceu!"*
>
> 🐾 **Mingau é o mestre do disfarce, Detetive...**
