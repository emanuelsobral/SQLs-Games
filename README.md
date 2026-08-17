# 🐾 Detetive de Quintal: Divisão de Casos Bobos

> *"Em cada tigela vazia, uma pista. Em cada sofá rasgado, um mistério. Em cada sachê desaparecido... uma conspiração."*
> — Detetive Bigode, Investigador Autointitulado de Bairro

---

## 🎮 O que é este jogo?

**Detetive de Quintal** é um jogo textual e interativo onde você aprende **SQL** resolvendo os mistérios mais absurdos e hilários de um bairro cheio de pets traquinas, vizinhos fofoqueiros e conspirações envolvendo sachês de salmão.

Você é o **Detetive Bigode**, um investigador autointitulado que usa o poder dos bancos de dados para cruzar evidências e resolver casos que vão desde *"quem comeu minha ração?"* até desvendar o maior esquema de desvio de petiscos que o bairro já viu.

---

## 🎯 Como Jogar

1. **Escolha um nível** na ordem (a história é progressiva e interconectada!)
2. **Leia o Briefing** para entender o caso
3. **Rode o Script de Setup** no seu banco de dados para criar as tabelas do cenário
4. **Leia o Conceito SQL** para aprender o comando do nível
5. **Tente resolver a Missão** escrevendo sua própria query SQL
6. **Compare com a Solução** quando terminar (sem espiar antes! 🙈)

### ⚠️ Regras Importantes
- Você só precisa usar comandos **SELECT** (consulta). Nunca será necessário alterar ou deletar dados.
- Os **Scripts de Setup** criam e populam as tabelas — rode-os primeiro!
- **Tente resolver sozinho** antes de ver a solução!
- A história é **progressiva**. Jogue na ordem para entender a trama!

---

## 🗄️ Qual banco de dados usar?

Os scripts são compatíveis com **SQLite**, o banco mais acessível para iniciantes. Opções:

| Ferramenta | Tipo | Link |
|---|---|---|
| **DB Browser for SQLite** | Interface gráfica (desktop) | [sqlitebrowser.org](https://sqlitebrowser.org/) |
| **SQLite Online** | Direto no navegador | [sqliteonline.com](https://sqliteonline.com/) |
| **Terminal** | Linha de comando | `sqlite3 detetive.db` |

---

## 📺 Temporadas

### 🏠 Temporada 1 — Mistérios Domésticos (Níveis 1-15)
*Dificuldade: Iniciante*

Pequenos incidentes na casa do Detetive Bigode e vizinhos imediatos. Ração desaparecida, almofadas rasgadas, pegadas misteriosas e o começo de algo maior...

**Conceitos SQL:** `SELECT *`, `WHERE`, `ORDER BY`, `LIKE`, `AND/OR`, `BETWEEN/IN`, `COUNT/SUM/AVG`

### 🏘️ Temporada 2 — Intrigas de Bairro (Níveis 16-30)
*Dificuldade: Intermediário*

A investigação se expande para a vizinhança! Reuniões secretas de gatos no telhado, guerras por caixas de papelão e um petshop com estoque misteriosamente baixo.

**Conceitos SQL:** `INNER JOIN`, `LEFT JOIN`, `GROUP BY`, `HAVING`, `DISTINCT`, `Aliases (AS)`, `Subqueries`

### 🕵️ Temporada 3 — O Grande Esquema (Níveis 31-45)
*Dificuldade: Avançado*

A caçada ao líder do esquema de desvio de sachês! Hierarquias felinas, redes de entrega clandestinas, identidades falsas e o confronto final com o Chefão.

**Conceitos SQL:** `Subqueries correlacionadas`, `Múltiplos JOINs`, `CASE WHEN`, `UNION`, `EXISTS`, `COALESCE`, `CTEs (WITH)`

---

## 🎭 Elenco de Personagens

### 👤 Protagonista
| Personagem | Descrição |
|---|---|
| **Detetive Bigode** | Você! Investigador de bairro com lupa de brinquedo e caderninho SQL. |

### 🏠 Vizinhos
| Personagem | Descrição |
|---|---|
| **Dona Clotilde** | Aposentada dona de 7 gatos. Reclama de tudo, mas adora uma fofoca. |
| **Seu Agenor** | Aposentado que monitora a rua inteira da janela. Testemunha ocular profissional. |
| **Pedrinho** | Criança do bairro, dono do Thor. Mestre em criar confusão. |
| **Seu Bartolomeu** | Carteiro do bairro. Sabe de tudo que acontece em cada casa. |
| **Dona Margarete** | Dona do petshop "Patinhas de Ouro". Vítima do Grande Esquema. |
| **Dona Jurema** | Presidente da Associação de Moradores. Organiza reuniões de crise. |

### 🐾 Animais (Os Verdadeiros Protagonistas)
| Personagem | Espécie | Descrição |
|---|---|---|
| **Bolinha** | Gato gordo laranja | Preguiçoso, mas sempre na cena do crime. Álibi: *"estava dormindo"*. |
| **Thor** | Labrador dourado | Destruidor profissional de objetos. |
| **Princesa** | Gata persa branca | Metida e manipuladora. Dona Clotilde jura que é inocente. |
| **Mingau** | Gato preto | Misterioso, aparece e desaparece. O "agente secreto" do bairro. |
| **Capitão Frajola** | Gato malhado | Líder carismático. Mestre em abrir portas. Principal suspeito. |
| **Salsicha** | Dachshund | O "informante". Late para tudo, testemunha ocular perpétua. |
| **Duquesa** | Gata siamesa | Gata da Dona Margarete. Guarda do petshop... possivelmente corrompida. |
| **Pipoca** | Hamster | Vive escapando da gaiola. Causa pânico desproporcional. |
| **General Bigodão** | Gato de rua | Veterano de rua. Líder de uma gangue de gatos. |
| **Foguete** | Gato rajado | O mais rápido do bairro. Entregador do esquema de sachês. |

---

## 📂 Estrutura dos Arquivos

```
SQLs Games/
├── README.md                          ← Você está aqui!
├── Temporada_1_Iniciante/
│   ├── nivel_01_pote_de_racao.md
│   ├── nivel_02_almofada_rasgada.md
│   ├── ...
│   └── nivel_15_grande_apagao.md
├── Temporada_2_Intermediario/
│   ├── nivel_16_reuniao_telhado.md
│   ├── ...
│   └── nivel_30_deposito_secreto.md
└── Temporada_3_Avancado/
    ├── nivel_31_cadeia_comando.md
    ├── ...
    └── nivel_45_grande_esquema.md
```

---

*Bons casos, Detetive! Que suas queries sempre retornem o culpado. 🔍🐾*
