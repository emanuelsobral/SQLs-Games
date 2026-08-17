---
## 🐾 Nível 38: Operação Pente Fino
**Nível de Dificuldade:** Avançado

**📜 Briefing:**
O Detetive recebeu dados de duas fontes: câmeras de segurança do petshop E relatórios dos vizinhos. Ambas registram movimentações suspeitas, mas em formatos diferentes. Ele precisa unir tudo em um dossiê único.

**🎬 Introdução:**
*"Duas fontes, um dossiê. Preciso combinar câmeras e relatos para ter o quadro completo."*

---

**🔍 Conceito SQL deste nível: `UNION` (Consolidação)**

Combinando UNION com ORDER BY, WHERE e funções de agregação para análise integrada.

---

**🛠️ Script de Setup do Ambiente (Rode isso no seu banco de dados primeiro!):**
```sql
DROP TABLE IF EXISTS camera_petshop;
DROP TABLE IF EXISTS relatos_vizinhos;

CREATE TABLE camera_petshop (
    id INTEGER PRIMARY KEY,
    data TEXT,
    horario TEXT,
    suspeito TEXT,
    acao TEXT
);

INSERT INTO camera_petshop VALUES (1, '2024-04-20', '23:00', 'Mingau', 'Entrou pela porta dos fundos');
INSERT INTO camera_petshop VALUES (2, '2024-04-20', '23:15', 'Mingau', 'Pegou 3 sachês de salmão');
INSERT INTO camera_petshop VALUES (3, '2024-04-21', '22:45', 'Capitão Frajola', 'Visto no telhado do petshop');
INSERT INTO camera_petshop VALUES (4, '2024-04-22', '23:30', 'Mingau', 'Entrou novamente');

CREATE TABLE relatos_vizinhos (
    id INTEGER PRIMARY KEY,
    data TEXT,
    horario TEXT,
    suspeito TEXT,
    acao TEXT
);

INSERT INTO relatos_vizinhos VALUES (1, '2024-04-20', '22:30', 'General Bigodão', 'Vigiando a esquina do petshop');
INSERT INTO relatos_vizinhos VALUES (2, '2024-04-20', '23:30', 'Foguete', 'Correndo pela rua com algo na boca');
INSERT INTO relatos_vizinhos VALUES (3, '2024-04-21', '23:00', 'Capitão Frajola', 'No telhado da Dona Clotilde com sachês');
INSERT INTO relatos_vizinhos VALUES (4, '2024-04-22', '00:00', 'Foguete', 'Saiu do bairro pelo muro norte');
```

---

**🎯 Missão:**
1. Una as duas fontes com `UNION ALL`, adicionando uma coluna indicando a fonte
2. Ordene cronologicamente para reconstruir a operação

---

**✅ Script de Solução:**
```sql
SELECT data, horario, suspeito, acao, 'Câmera petshop' AS fonte
FROM camera_petshop
UNION ALL
SELECT data, horario, suspeito, acao, 'Relato vizinho' AS fonte
FROM relatos_vizinhos
ORDER BY data, horario;
```

**📋 Resultado:**

| data | horario | suspeito | acao | fonte |
|------|---------|----------|------|-------|
| 2024-04-20 | 22:30 | General Bigodão | Vigiando a esquina do petshop | Relato vizinho |
| 2024-04-20 | 23:00 | Mingau | Entrou pela porta dos fundos | Câmera petshop |
| 2024-04-20 | 23:15 | Mingau | Pegou 3 sachês de salmão | Câmera petshop |
| 2024-04-20 | 23:30 | Foguete | Correndo pela rua com algo na boca | Relato vizinho |
| 2024-04-21 | 22:45 | Capitão Frajola | Visto no telhado do petshop | Câmera petshop |
| 2024-04-21 | 23:00 | Capitão Frajola | No telhado da Dona Clotilde com sachês | Relato vizinho |
| 2024-04-22 | 00:00 | Foguete | Saiu do bairro pelo muro norte | Relato vizinho |
| 2024-04-22 | 23:30 | Mingau | Entrou novamente | Câmera petshop |

---

**🔎 Conclusão:**
> A linha do tempo integrada é poderosa! No dia 20: General vigia (22:30) → Mingau entra e rouba (23:00-23:15) → Foguete leva embora (23:30). **30 minutos do início ao fim.** Operação cirúrgica.
>
> 🐾 **Duas fontes, uma verdade. A operação dura apenas 30 minutos por noite...**
