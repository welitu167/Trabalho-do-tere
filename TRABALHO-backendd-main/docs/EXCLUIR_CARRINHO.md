# Funcionalidade: Excluir Carrinho do Banco

## Descrição
Adicionado um novo botão **"Excluir Carrinho (Banco)"** no frontend que permite ao usuário excluir o carrinho inteiro do banco de dados MongoDB (não apenas esvaziar os itens locais).

## Localização no código
- **Frontend**: `src/App.tsx`
  - Nova função: `excluirCarrinho()` (linhas ~98-101)
  - Novo botão: "Excluir Carrinho (Banco)" (linha ~192) — colorido em vermelho (#ff6b6b) para destacar a ação destrutiva

- **Backend**: `src/rotas/rotas-autenticadas.ts`
  - Rota existente: `DELETE /carrinho` (protegida por `Auth` middleware)
  - Controller: `src/carrinho/carrinho.controller.ts` — método `remover()`

## Como funciona

### Frontend
1. Usuário clica no botão "Excluir Carrinho (Banco)"
2. Sistema exibe confirmação: "Tem certeza que deseja excluir o carrinho do banco? Esta ação não pode ser desfeita."
3. Se confirmado, dispara `DELETE /carrinho` via axios
4. Backend deleta o documento do carrinho da collection `carrinhos`
5. Estado local `carrinho` é limpo (setCarrinho(null))
6. Exibe alerta: "Carrinho excluído do banco com sucesso"

### Backend
- Endpoint: `DELETE /carrinho`
- Autenticação: Requer token JWT válido (middleware `Auth`)
- Lógica: Remove o documento de carrinho onde `usuarioId === req.usuarioId` da collection
- Resposta: `{ mensagem: 'Carrinho removido com sucesso' }`

## Diferenças
- **Esvaziar Carrinho**: Limpa apenas os itens locais (sem fazer requisição ao servidor)
- **Excluir Carrinho (Banco)**: Remove completamente o documento do banco MongoDB

## Fluxo de teste
```bash
# 1. Rodar o servidor backend
npm run dev

# 2. Fazer login no frontend
# 3. Adicionar alguns itens ao carrinho
# 4. Clicar em "Excluir Carrinho (Banco)"
# 5. Confirmar exclusão
# 6. Verificar se o carrinho desapareceu e se não consegue mais buscar via GET /carrinho
```

## Código adicionado

### Frontend (`src/App.tsx`)
```typescript
function excluirCarrinho(){
  if(!window.confirm('Tem certeza que deseja excluir o carrinho do banco? Esta ação não pode ser desfeita.')) return
  api.delete('/carrinho')
    .then(()=> { setCarrinho(null); alert('Carrinho excluído do banco com sucesso') })
    .catch((err)=> showError(err))
}
```

### UI (botão)
```tsx
<button onClick={excluirCarrinho} style={{marginLeft:8, backgroundColor:'#ff6b6b', color:'#fff'}}>Excluir Carrinho (Banco)</button>
```

## Status
✅ Frontend: Botão adicionado e compilado sem erros
✅ Backend: Endpoint `DELETE /carrinho` já existente e funcional
✅ Testado: Verificado pelo script `npm run verify`
