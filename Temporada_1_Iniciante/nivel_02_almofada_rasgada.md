---
## 🐾 Nível 2: O Mistério da Almofada Rasgada
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Pedrinho liga desesperado: a almofada favorita da avó dele — uma peça artesanal bordada à mão com a frase "Lar Doce Lar" — foi completamente destroçada. Há pedaços de espuma e tecido espalhados pela sala inteira. Cinco pets tinham acesso à sala naquela manhã. A avó chega do bingo às 18h. O relógio está correndo.

**🎬 Introdução:**
*O Detetive Bigode chega à casa do Pedrinho e congela na porta. A cena é de guerra: flocos de espuma decoram o chão como neve de Natal em pleno julho. Retalhos de tecido bordado pendem do abajur. No canto da sala, Thor, o labrador dourado de 35 quilos, tenta se esconder atrás de um vaso de planta que tem um terço do seu tamanho.*

*"Thor faz cara de paisagem", anota o Detetive no caderninho. "Comportamento clássico de quem não quer ser interrogado." Pedrinho puxa sua manga: "Detetive, a vovó vai me matar! Descubra quem foi, por favor!" O Detetive ajusta a lupa. "Calma, garoto. Os dados nunca mentem."*

---

**🔍 Conceito SQL deste nível: `SELECT * FROM` (Consolidação)**

Você já aprendeu o `SELECT * FROM` no nível anterior. Agora vai usá-lo novamente em um cenário diferente para consolidar o conhecimento!

Lembre-se:
- `SELECT *` = mostra todas as colunas
- `FROM nome_tabela` = indica qual tabela consultar
- Sempre termine com `;`

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 2: O Mistério da Almofada Rasgada
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS evidencias_almofada;

CREATE TABLE evidencias_almofada (
    id INTEGER PRIMARY KEY,
    nome_pet TEXT,
    especie TEXT,
    estava_na_sala TEXT,
    hora_entrada TEXT,
    hora_saida TEXT,
    tem_espuma_no_pelo TEXT,
    tem_tecido_na_boca TEXT,
    observacao TEXT
);

-- Registro dos pets e evidências coletadas
INSERT INTO evidencias_almofada VALUES (1, 'Thor', 'Cachorro', 'Sim', '08:00', '11:30', 'Sim', 'Sim', 'Encontrado tentando se esconder atrás do vaso');
INSERT INTO evidencias_almofada VALUES (2, 'Bolinha', 'Gato', 'Sim', '09:15', '09:20', 'Não', 'Não', 'Entrou, olhou a bagunça com desdém e saiu');
INSERT INTO evidencias_almofada VALUES (3, 'Princesa', 'Gata', 'Não', NULL, NULL, 'Não', 'Não', 'No segundo andar o dia todo, julgando todos');
INSERT INTO evidencias_almofada VALUES (4, 'Salsicha', 'Cachorro', 'Sim', '07:30', '07:45', 'Não', 'Não', 'Passeou pela sala de manhã cedo e saiu antes do estrago');
INSERT INTO evidencias_almofada VALUES (5, 'Pipoca', 'Hamster', 'Sim', '10:00', '10:05', 'Sim', 'Não', 'Encontrada DENTRO da espuma da almofada, tremendo de medo');
```

---

**🎯 Missão:**
Pedrinho precisa de respostas antes das 18h! **Consulte todas as evidências coletadas** na sala do crime para identificar o destruidor de almofadas.

Analise: Quem ficou mais tempo na sala? Quem tem espuma no pelo? Quem tem tecido na boca?

---

**💡 Dica:**
> Use o mesmo comando que você aprendeu no Nível 1 para ver **todas** as evidências da tabela `evidencias_almofada`. A resposta está nos dados!

---

**✅ Script de Solução:**
```sql
-- Veja todas as evidências do caso da almofada
SELECT * FROM evidencias_almofada;
```

**📋 Resultado Esperado:**

| id | nome_pet | especie | estava_na_sala | hora_entrada | hora_saida | tem_espuma_no_pelo | tem_tecido_na_boca | observacao |
|----|----------|---------|----------------|--------------|------------|--------------------|--------------------|-----------|
| 1 | Thor | Cachorro | Sim | 08:00 | 11:30 | Sim | Sim | Encontrado tentando se esconder atrás do vaso |
| 2 | Bolinha | Gato | Sim | 09:15 | 09:20 | Não | Não | Entrou, olhou a bagunça com desdém e saiu |
| 3 | Princesa | Gata | Não | NULL | NULL | Não | Não | No segundo andar o dia todo, julgando todos |
| 4 | Salsicha | Cachorro | Sim | 07:30 | 07:45 | Não | Não | Passeou pela sala de manhã cedo e saiu antes do estrago |
| 5 | Pipoca | Hamster | Sim | 10:00 | 10:05 | Sim | Não | Encontrada DENTRO da espuma da almofada, tremendo de medo |

---

**🔎 Conclusão:**
> **Caso encerrado!** O destruidor é o **Thor**! 🐕
>
> As provas são irrefutáveis:
> - **Tempo na cena:** Thor ficou na sala das 08:00 às 11:30 — **3 horas e meia!** Tempo mais que suficiente para uma destruição completa.
> - **Espuma no pelo:** Sim ✅
> - **Tecido na boca:** Sim ✅ — Foi literalmente pego com a boca na botija (ou no tecido).
> - **Comportamento:** Tentando se esconder atrás de um vaso ridiculamente pequeno.
>
> Pipoca tinha espuma, mas coitada — ela é uma **vítima colateral**. Foi encontrada DENTRO da espuma, tremendo. Bolinha entrou, julgou a cena e saiu (comportamento muito de gato). Salsicha saiu cedo demais. Princesa nem desceu do segundo andar.
>
> *Pedrinho suspira aliviado: "Eu sabia! Thor, seu arteiro!" Thor abana o rabo, sem nenhum remorso. O Detetive Bigode anota: "Thor — destruidor serial. Almofadas, sapatos, o que vier. Nota: verificar se há conexão com o caso da ração do Bolinha... Ambos estavam na cozinha naquela madrugada."*
>
> 🐾 **Um padrão começa a surgir, Detetive...**
