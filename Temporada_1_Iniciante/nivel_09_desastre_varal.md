---
## 🐾 Nível 9: O Desastre do Varal
**Nível de Dificuldade:** Iniciante

**📜 Briefing:**
Seu Bartolomeu, o carteiro, chega à casa do Detetive Bigode com uma reclamação: as roupas do varal dele foram derrubadas no chão pela terceira vez esta semana. Mas desta vez, algumas peças estão rasgadas e outras têm marcas de dentes. Ele instalou uma câmera e registrou todos os pets que passaram pelo quintal no horário do incidente (entre 10h e 12h). Agora ele quer saber: qual pet estava no quintal E tem marcas de pano nos dentes?

**🎬 Introdução:**
*O Detetive Bigode inspeciona o varal do Seu Bartolomeu. Três camisas, duas toalhas e um par de meias jazem no chão enlameado. Uma das camisas tem um buraco em formato suspeitamente semelhante a uma mordida de cachorro.*

*"Olha isso, Detetive!" Seu Bartolomeu aponta para a camisa favorita dele — uma hawaiana de abacaxis que ele usa para entregar cartas nos dias de sol. "Quem mordeu minha havaiana vai me pagar!" O Detetive examina o buraco: "Hm, arcada dental grande. Não é gato. Mas preciso cruzar os dados da câmera antes de acusar alguém."*

---

**🔍 Conceito SQL deste nível: `AND` e `OR`**

Agora você vai aprender a **combinar múltiplas condições** no `WHERE`!

- `AND` = **ambas** as condições devem ser verdadeiras (mais restritivo)
- `OR` = **pelo menos uma** condição deve ser verdadeira (mais permissivo)

**Sintaxe:**
```sql
-- AND: ambas as condições devem ser verdadeiras
SELECT * FROM tabela WHERE condição1 AND condição2;

-- OR: pelo menos uma condição deve ser verdadeira
SELECT * FROM tabela WHERE condição1 OR condição2;
```

**Exemplos:**
```sql
-- Pets que estavam na cozinha E são gatos
SELECT * FROM pets WHERE local = 'Cozinha' AND especie = 'Gato';

-- Pets que são gatos OU que pesam mais de 10kg
SELECT * FROM pets WHERE especie = 'Gato' OR peso_kg > 10;
```

> ⚠️ **Cuidado:** `AND` é mais restritivo (reduz resultados), `OR` é mais permissivo (aumenta resultados). Não confunda!

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
-- =============================================
-- NÍVEL 9: O Desastre do Varal
-- Criação do cenário do crime
-- =============================================

DROP TABLE IF EXISTS registro_varal;

CREATE TABLE registro_varal (
    id INTEGER PRIMARY KEY,
    nome_pet TEXT,
    especie TEXT,
    dono TEXT,
    estava_no_quintal TEXT,
    horario_visto TEXT,
    tem_tecido_nos_dentes TEXT,
    tem_lama_nas_patas TEXT,
    comportamento TEXT
);

-- Registros da câmera do quintal do Seu Bartolomeu (10h-12h)
INSERT INTO registro_varal VALUES (1, 'Thor', 'Cachorro', 'Pedrinho', 'Sim', '10:15', 'Sim', 'Sim', 'Puxando camiseta do varal como cabo de guerra');
INSERT INTO registro_varal VALUES (2, 'Bolinha', 'Gato', 'Detetive Bigode', 'Sim', '11:00', 'Não', 'Não', 'Passou pelo quintal andando no muro, nem olhou pro varal');
INSERT INTO registro_varal VALUES (3, 'Salsicha', 'Cachorro', 'Pedrinho', 'Sim', '10:30', 'Não', 'Sim', 'Cavando um buraco perto do varal');
INSERT INTO registro_varal VALUES (4, 'Mingau', 'Gato', 'Ninguém', 'Sim', '11:30', 'Não', 'Não', 'Sentado na cerca observando tudo em silêncio');
INSERT INTO registro_varal VALUES (5, 'Capitão Frajola', 'Gato', 'Rua', 'Sim', '10:45', 'Sim', 'Não', 'Pendurado na corda do varal, balançando como acrobata');
INSERT INTO registro_varal VALUES (6, 'Princesa', 'Gata', 'Dona Clotilde', 'Não', NULL, 'Não', 'Não', 'Não foi vista no quintal');
INSERT INTO registro_varal VALUES (7, 'Pipoca', 'Hamster', 'Pedrinho', 'Não', NULL, 'Não', 'Não', 'Dentro da gaiola no quarto do Pedrinho');
```

---

**🎯 Missão:**
Use `AND` para encontrar o(s) culpado(s)! Você precisa cruzar duas evidências:
1. **Estava no quintal** (`estava_no_quintal = 'Sim'`)
2. **Tem tecido nos dentes** (`tem_tecido_nos_dentes = 'Sim'`)

Somente quem atende a **AMBAS** as condições é culpado!

---

**💡 Dica:**
> Use `WHERE estava_no_quintal = 'Sim' AND tem_tecido_nos_dentes = 'Sim'` para cruzar as duas evidências. Só vai sobrar quem realmente mordeu as roupas!

---

**✅ Script de Solução:**
```sql
-- Quem estava no quintal E tem tecido nos dentes?
SELECT nome_pet, especie, horario_visto, comportamento
FROM registro_varal
WHERE estava_no_quintal = 'Sim' AND tem_tecido_nos_dentes = 'Sim';
```

**📋 Resultado Esperado:**

| nome_pet | especie | horario_visto | comportamento |
|----------|---------|---------------|---------------|
| Thor | Cachorro | 10:15 | Puxando camiseta do varal como cabo de guerra |
| Capitão Frajola | Gato | 10:45 | Pendurado na corda do varal, balançando como acrobata |

---

**🔎 Conclusão:**
> **Caso encerrado!** Os culpados são **Thor** e **Capitão Frajola**! 🐕🐱
>
> **Thor** foi flagrado às 10:15 literalmente "puxando camiseta do varal como cabo de guerra" — com tecido nos dentes e lama nas patas. Ele é o responsável pelas roupas rasgadas e enlameadas.
>
> **Capitão Frajola** é a surpresa: um gato de rua que apareceu às 10:45 "pendurado na corda do varal, balançando como acrobata" — e com tecido nos dentes! Ele provavelmente se pendurou na corda e seu peso ajudou a derrubar o resto.
>
> Note que Bolinha e Mingau estavam no quintal, mas **não** têm tecido nos dentes — são inocentes. Salsicha tinha lama mas estava ocupado cavando, sem interesse no varal.
>
> *Seu Bartolomeu aponta para Thor: "Eu SABIA que era esse labrador!" Mas o Detetive levanta a mão: "Não tão rápido, Seu Bartolomeu. Ele teve um cúmplice — o Capitão Frajola." O carteiro arregala os olhos: "O gato de rua?! O que ele fazia no meu quintal?"*
>
> *Nota no caderninho: "CAPITÃO FRAJOLA — primeira aparição oficial nos registros! Gato de rua, sem dono, comportamento acrobático. Estava no quintal do Seu Bartolomeu 30 minutos depois do Thor. Coincidência ou coordenação? Este gato precisa ser investigado."*
>
> 🐾 **Capitão Frajola entra na história, Detetive. E algo nos diz que não é a última vez...**
