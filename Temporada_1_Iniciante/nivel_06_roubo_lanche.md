---
## 🐾 Nível 6: O Roubo do Lanche da Tarde
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Dona Clotilde preparou uma bandeja com 7 petiscos gourmet para seus gatos: bifinhos de frango, palitinhos de carne e bolinhas de atum. Ela deixou a bandeja na mesa da cozinha às 14h e foi atender o telefone. Quando voltou às 14h25, a bandeja estava vazia. VAZIA. Sete petiscos evaporaram em 25 minutos. Felizmente, a câmera da cozinha (sim, Dona Clotilde tem câmera na cozinha para vigiar a geladeira) registrou toda a movimentação. Resta saber quem comeu o quê e em que ordem.

**🎬 Introdução:**
*O Detetive Bigode chega à cozinha de Dona Clotilde. A bandeja de alumínio reflete a luz fluorescente — completamente limpa, como se tivesse sido lambida. "FOI UM ASSALTO ORGANIZADO, DETETIVE!", grita Dona Clotilde, abanando um pano de prato como se fosse uma bandeira de rendição. "Sete petiscos de uma vez! Isso não é coisa de um gato só!"*

*O Detetive inspeciona a bandeja. Há minúsculas marcas de dentes e língua em padrões diferentes. "Dona Clotilde, a senhora tem razão. Isso foi uma operação coordenada." Ele acessa as gravações e monta a linha do tempo. "Vamos ver quem chegou por último — o último a comer é sempre o mais suspeito de ter planejado o timing."*

---

**🔍 Conceito SQL deste nível: `ORDER BY` (Consolidação)**

Você já aprendeu `ORDER BY` no nível anterior. Agora vai usá-lo com `DESC` para ver os dados do **mais recente para o mais antigo** — útil quando você quer saber quem agiu por último!

Lembre-se:
- `ORDER BY coluna ASC` → Crescente (padrão)
- `ORDER BY coluna DESC` → Decrescente

Você também pode ordenar por **múltiplas colunas**:
```sql
SELECT * FROM tabela ORDER BY coluna1 DESC, coluna2 ASC;
```

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 6: O Roubo do Lanche da Tarde
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS registro_cozinha;

CREATE TABLE registro_cozinha (
    id INTEGER PRIMARY KEY,
    nome_pet TEXT,
    horario TEXT,
    acao TEXT,
    petisco_alvo TEXT,
    foi_bem_sucedido TEXT
);

-- Gravações da câmera da cozinha entre 14h00 e 14h25
INSERT INTO registro_cozinha VALUES (1, 'Fifi', '14:03', 'Pulou na mesa', 'Bolinha de atum', 'Sim');
INSERT INTO registro_cozinha VALUES (2, 'Nestor', '14:18', 'Empurrou petisco da mesa para o chão', 'Bifinho de frango', 'Sim');
INSERT INTO registro_cozinha VALUES (3, 'Princesa', '14:07', 'Pegou delicadamente com a pata', 'Bolinha de atum', 'Sim');
INSERT INTO registro_cozinha VALUES (4, 'Dudu', '14:21', 'Subiu na cadeira e alcançou a mesa', 'Palitinho de carne', 'Sim');
INSERT INTO registro_cozinha VALUES (5, 'Mimi', '14:10', 'Arrastou petisco até a borda', 'Bifinho de frango', 'Sim');
INSERT INTO registro_cozinha VALUES (6, 'Bebel', '14:12', 'Derrubou petisco e fugiu com ele', 'Palitinho de carne', 'Sim');
INSERT INTO registro_cozinha VALUES (7, 'Lili', '14:15', 'Comeu direto na bandeja sem cerimônia', 'Bifinho de frango', 'Sim');
INSERT INTO registro_cozinha VALUES (8, 'Nestor', '14:23', 'Voltou para pegar o último petisco', 'Bolinha de atum', 'Sim');
```

---

**🎯 Missão:**
Reconstrua a linha do tempo do assalto à bandeja de petiscos! Ordene os registros do **mais recente para o mais antigo** (`DESC`) para descobrir:
1. **Quem foi o último** a atacar a bandeja? (O possível "mentor" da operação)
2. **Quem foi o primeiro?** (O "abridor de caminhos")

---

**💡 Dica:**
> Ordene a tabela `registro_cozinha` pela coluna `horario` em ordem **decrescente** (`DESC`). O primeiro resultado será o último a agir!

---

**✅ Script de Solução:**
```sql
-- Linha do tempo do assalto, do mais recente ao mais antigo
SELECT horario, nome_pet, acao, petisco_alvo
FROM registro_cozinha
ORDER BY horario DESC;
```

**📋 Resultado Esperado:**

| horario | nome_pet | acao | petisco_alvo |
|---------|----------|------|--------------|
| 14:23 | Nestor | Voltou para pegar o último petisco | Bolinha de atum |
| 14:21 | Dudu | Subiu na cadeira e alcançou a mesa | Palitinho de carne |
| 14:18 | Nestor | Empurrou petisco da mesa para o chão | Bifinho de frango |
| 14:15 | Lili | Comeu direto na bandeja sem cerimônia | Bifinho de frango |
| 14:12 | Bebel | Derrubou petisco e fugiu com ele | Palitinho de carne |
| 14:10 | Mimi | Arrastou petisco até a borda | Bifinho de frango |
| 14:07 | Princesa | Pegou delicadamente com a pata | Bolinha de atum |
| 14:03 | Fifi | Pulou na mesa | Bolinha de atum |

---

**🔎 Conclusão:**
> **Caso encerrado!** O assalto foi uma **operação coordenada** dos 7 gatos da Dona Clotilde! 🐱🐱🐱🐱🐱🐱🐱
>
> **Linha do tempo do crime:**
> - **14:03** — **Fifi** abriu o caminho, pulando na mesa primeiro (a batedora)
> - **14:07** — **Princesa** pegou "delicadamente" um petisco (com classe, como sempre)
> - **14:10 → 14:15** — **Mimi**, **Bebel** e **Lili** atacaram em sequência rápida
> - **14:18 → 14:23** — **Nestor** apareceu DUAS VEZES! Pegou um, saiu, e voltou para pegar o último!
>
> **Nestor** é o mais suspeito: ele foi o **último** a agir (14:23) e é o único que voltou para uma segunda rodada. Perfil de quem sabia que havia tempo de sobra.
>
> *Dona Clotilde se senta, derrotada: "Todos os sete... Eu criei uma quadrilha." O Detetive consola: "São gatos, Dona Clotilde. Organização é o que eles fazem de melhor." Nestor lambe a pata, sem um pingo de remorso.*
>
> *Nota no caderninho: "Nestor — possível líder operacional. Voltou para o segundo ataque. Fifi — batedora. Princesa — participação elegante mas presente. IMPORTANTE: esse nível de coordenação entre 7 gatos é incomum. Há um estrategista por trás?"*
>
> 🐾 **Sete gatos agindo em coordenação? Isso não é coincidência, Detetive...**
