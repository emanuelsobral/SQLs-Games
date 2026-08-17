---
## 🐾 Nível 37: As Duas Listas
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
Dona Margarete tem uma lista de "clientes VIP" do petshop (gatos cujos donos compram muito). O Detetive tem a lista de suspeitos da rede. Ele quer combinar as duas listas para ter uma visão unificada — todos os gatos relevantes em um só resultado.

**🎬 Introdução:**
*"Duas listas, uma verdade", diz o Detetive. "Preciso juntar clientes VIP com suspeitos. Se um nome aparece nas DUAS listas, é duplamente relevante. Mas primeiro, preciso ver TODOS os nomes."*

---

**🔍 Conceito SQL deste nível: `UNION` / `UNION ALL`**

`UNION` combina resultados de duas queries em uma lista só!
- `UNION` → remove duplicatas automaticamente
- `UNION ALL` → mantém duplicatas

```sql
SELECT nome, 'VIP' AS origem FROM clientes_vip
UNION
SELECT nome, 'Suspeito' AS origem FROM suspeitos;
```

> ⚠️ As queries devem ter o **mesmo número de colunas** e **tipos compatíveis**!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS clientes_vip_petshop;
DROP TABLE IF EXISTS lista_suspeitos;

CREATE TABLE clientes_vip_petshop (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    dono TEXT,
    gasto_mensal REAL
);

INSERT INTO clientes_vip_petshop VALUES (1, 'Princesa', 'Dona Clotilde', 180.00);
INSERT INTO clientes_vip_petshop VALUES (2, 'Tobias', 'Dona Jurema', 150.00);
INSERT INTO clientes_vip_petshop VALUES (3, 'Bolinha', 'Detetive Bigode', 120.00);
INSERT INTO clientes_vip_petshop VALUES (4, 'Duquesa', 'Dona Margarete', 200.00);
INSERT INTO clientes_vip_petshop VALUES (5, 'Mimi', 'Dona Clotilde', 90.00);

CREATE TABLE lista_suspeitos (
    id INTEGER PRIMARY KEY,
    nome_gato TEXT,
    funcao_na_rede TEXT,
    nivel_risco TEXT
);

INSERT INTO lista_suspeitos VALUES (1, 'Capitão Frajola', 'Líder', 'Crítico');
INSERT INTO lista_suspeitos VALUES (2, 'Mingau', 'Ladrão', 'Crítico');
INSERT INTO lista_suspeitos VALUES (3, 'Foguete', 'Entregador', 'Médio');
INSERT INTO lista_suspeitos VALUES (4, 'Princesa', 'Supervisora', 'Médio');
INSERT INTO lista_suspeitos VALUES (5, 'Duquesa', 'Facilitadora', 'Médio');
INSERT INTO lista_suspeitos VALUES (6, 'Nestor', 'Infiltrado', 'Alto');
```

---

**🎯 Missão:**
1. Use `UNION` para criar uma lista unificada de TODOS os gatos (VIP + suspeitos), marcando a origem
2. Identifique os que aparecem em **AMBAS** as listas

---

**✅ Script de Solução:**
```sql
-- 1. Lista unificada com UNION ALL (para ver duplicatas)
SELECT nome_gato, 'Cliente VIP' AS categoria FROM clientes_vip_petshop
UNION ALL
SELECT nome_gato, 'Suspeito' AS categoria FROM lista_suspeitos
ORDER BY nome_gato;

-- 2. Quem aparece em AMBAS as listas?
SELECT nome_gato, 'Cliente VIP' AS categoria FROM clientes_vip_petshop
WHERE nome_gato IN (SELECT nome_gato FROM lista_suspeitos);
```

**📋 Resultado (UNION ALL):**

| nome_gato | categoria |
|-----------|-----------|
| Bolinha | Cliente VIP |
| Capitão Frajola | Suspeito |
| Duquesa | Cliente VIP |
| Duquesa | Suspeito |
| Foguete | Suspeito |
| Mimi | Cliente VIP |
| Mingau | Suspeito |
| Nestor | Suspeito |
| Princesa | Cliente VIP |
| Princesa | Suspeito |
| Tobias | Cliente VIP |

**📋 Em ambas as listas:**

| nome_gato | categoria |
|-----------|-----------|
| Duquesa | Cliente VIP |
| Princesa | Cliente VIP |

---

**🔎 Conclusão:**
> **Princesa** e **Duquesa** são VIPs do petshop E suspeitas na rede! Princesa (R$180/mês) é a cliente mais gastadora da Dona Clotilde — e supervisora da rede. Duquesa (R$200/mês!) é a maior VIP — e facilitadora!
>
> *"As infiltradas são as melhores clientes. Ninguém suspeita de quem compra mais."*
>
> 🐾 **A linha entre cliente e criminoso é tênue, Detetive...**
