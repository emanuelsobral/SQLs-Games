---
## 🐾 Nível 41: O Banco Suíço dos Gatos
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
O dossiê da rede tem dados incompletos: alguns membros têm campos vazios (NULL) em registros críticos — donos desconhecidos, endereços faltando, datas sem preenchimento. Para o relatório final, o Detetive precisa tratar esses NULLs, substituindo-os por valores legíveis como "Desconhecido" ou "Sem registro".

**🎬 Introdução:**
*"O relatório final não pode ter campos vazios", insiste Dona Jurema. "A prefeitura quer algo apresentável!" O Detetive examina os dados: "Tem muitos NULLs aqui. Vou usar COALESCE para preencher as lacunas com textos significativos."*

---

**🔍 Conceito SQL deste nível: `COALESCE` / `NULLIF`**

### `COALESCE(valor1, valor2, ...)`
Retorna o **primeiro valor não-NULL** da lista. Perfeito para substituir NULLs!

```sql
-- Se dono for NULL, mostra 'Sem dono'
SELECT nome, COALESCE(dono, 'Sem dono') AS dono FROM pets;

-- Encadear múltiplos fallbacks
SELECT COALESCE(apelido, nome, 'Anônimo') AS identificacao FROM pets;
```

### `NULLIF(valor1, valor2)`
Retorna NULL se os dois valores forem **iguais**. Útil para transformar valores "vazios" em NULL.

```sql
-- Se endereço for string vazia, transformar em NULL
SELECT NULLIF(endereco, '') AS endereco FROM pets;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS ficha_rede_completa;

CREATE TABLE ficha_rede_completa (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    apelido TEXT,
    dono TEXT,
    endereco TEXT,
    telefone_dono TEXT,
    data_primeiro_avistamento TEXT,
    funcao TEXT,
    observacao TEXT
);

INSERT INTO ficha_rede_completa VALUES (1, 'Capitão Frajola', 'O Chefão', NULL, NULL, NULL, '2024-03-28', 'Líder', 'Sem dono registrado');
INSERT INTO ficha_rede_completa VALUES (2, 'Mingau', NULL, NULL, NULL, NULL, '2024-03-18', 'Ladrão', NULL);
INSERT INTO ficha_rede_completa VALUES (3, 'Foguete', 'Flash felino', NULL, NULL, NULL, '2024-04-10', 'Entregador', NULL);
INSERT INTO ficha_rede_completa VALUES (4, 'General Bigodão', 'O General', NULL, NULL, NULL, '2024-03-22', 'Sentinela', 'Veterano de rua');
INSERT INTO ficha_rede_completa VALUES (5, 'Nestor', NULL, 'Dona Clotilde', 'Rua das Acácias, 38', '(11) 9999-1111', '2024-03-15', 'Infiltrado', NULL);
INSERT INTO ficha_rede_completa VALUES (6, 'Princesa', 'A Rainha', 'Dona Clotilde', 'Rua das Acácias, 38', '(11) 9999-1111', '2024-03-10', 'Supervisora', '');
INSERT INTO ficha_rede_completa VALUES (7, 'Duquesa', NULL, 'Dona Margarete', 'Rua dos Ipês, 15', '(11) 9999-2222', '2024-03-27', 'Facilitadora', NULL);
INSERT INTO ficha_rede_completa VALUES (8, 'Bolinha', 'Barrigudo', 'Detetive Bigode', 'Rua das Acácias, 42', '(11) 9999-3333', '2024-03-18', 'Colaborador', '');
INSERT INTO ficha_rede_completa VALUES (9, 'Sombra', NULL, NULL, NULL, NULL, '2024-04-01', 'Recruta', NULL);
INSERT INTO ficha_rede_completa VALUES (10, 'Trovão', NULL, NULL, NULL, NULL, '2024-04-03', 'Recruta', NULL);
```

---

**🎯 Missão:**
Crie um relatório apresentável substituindo todos os NULLs e strings vazias:
- `apelido` NULL → `'Sem apelido'`
- `dono` NULL → `'Sem dono'`
- `endereco` NULL → `'Endereço desconhecido'`
- `telefone_dono` NULL → `'Sem contato'`
- `observacao` NULL ou vazia → `'Nenhuma observação'`

---

**✅ Script de Solução:**
```sql
SELECT 
    nome,
    COALESCE(apelido, 'Sem apelido') AS apelido,
    COALESCE(dono, 'Sem dono') AS responsavel,
    COALESCE(endereco, 'Endereço desconhecido') AS endereco,
    COALESCE(telefone_dono, 'Sem contato') AS contato,
    funcao,
    COALESCE(NULLIF(observacao, ''), 'Nenhuma observação') AS observacao
FROM ficha_rede_completa
ORDER BY id;
```

**📋 Resultado:**

| nome | apelido | responsavel | endereco | contato | funcao | observacao |
|------|---------|-------------|----------|---------|--------|-----------|
| Capitão Frajola | O Chefão | Sem dono | Endereço desconhecido | Sem contato | Líder | Sem dono registrado |
| Mingau | Sem apelido | Sem dono | Endereço desconhecido | Sem contato | Ladrão | Nenhuma observação |
| Foguete | Flash felino | Sem dono | Endereço desconhecido | Sem contato | Entregador | Nenhuma observação |
| General Bigodão | O General | Sem dono | Endereço desconhecido | Sem contato | Sentinela | Veterano de rua |
| Nestor | Sem apelido | Dona Clotilde | Rua das Acácias, 38 | (11) 9999-1111 | Infiltrado | Nenhuma observação |
| Princesa | A Rainha | Dona Clotilde | Rua das Acácias, 38 | (11) 9999-1111 | Supervisora | Nenhuma observação |
| Duquesa | Sem apelido | Dona Margarete | Rua dos Ipês, 15 | (11) 9999-2222 | Facilitadora | Nenhuma observação |
| Bolinha | Barrigudo | Detetive Bigode | Rua das Acácias, 42 | (11) 9999-3333 | Colaborador | Nenhuma observação |
| Sombra | Sem apelido | Sem dono | Endereço desconhecido | Sem contato | Recruta | Nenhuma observação |
| Trovão | Sem apelido | Sem dono | Endereço desconhecido | Sem contato | Recruta | Nenhuma observação |

---

**🔎 Conclusão:**
> Relatório limpo e apresentável! Note o uso de `NULLIF` para tratar strings vazias de Princesa e Bolinha (que tinham `''` em vez de NULL na observação). 5 dos 10 membros são "Sem dono" — a metade da rede é incontrolável.
>
> 🐾 **Dados limpos, Detetive. A apresentação na prefeitura vai ser impactante...**
