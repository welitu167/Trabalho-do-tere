# C6(2) - Botão "Editar" com Validação ADMIN

## Descrição
Implementado um botão **"Editar"** que permite aos administradores abrir um formulário modal com os dados do produto preenchidos. O formulário permite alterar:
- Nome
- Preço  
- Descrição
- URL da Foto
- Categoria (novo campo opcional)

Apenas usuários com tipo `ADMIN` podem editar produtos.

## Localização no código

### Frontend (`src/App.tsx`)
- **Tipo de produto**: Adicionado campo opcional `categoria?: string` ao `ProdutoType`
- **Validação de admin**: Função `iniciarEdicao()` agora verifica se `tipo === 'ADMIN'` antes de abrir o modal
- **Formulário de criação**: Adicionado campo de entrada para categoria
- **Formulário de edição**: Adicionado campo de entrada para categoria com valor pré-preenchido
- **Função de salvamento**: `salvarEdicao()` agora inclui categoria nos dados enviados ao backend

### Backend (`src/produtos/produto.controller.ts`)
- **Interface Produto**: Adicionado campo opcional `categoria?: string`
- Controllers (`adicionar`, `atualizar`) já aceitam qualquer campo extra no body, incluindo categoria

## Como funciona

### Fluxo de edição
1. Admin clica no botão **"Editar"** ao lado do produto
2. Sistema valida se `tipo === 'ADMIN'`
   - Se não for admin, exibe alerta: "Apenas administradores podem editar produtos"
   - Se for admin, abre o modal com formulário
3. Modal exibe formulário com todos os campos preenchidos com os dados atuais
4. Admin pode alterar qualquer campo (incluindo categoria)
5. Admin clica em "Salvar"
6. Sistema envia PUT request para `/produtos/:id` com os dados atualizados
7. Produto na lista é atualizado imediatamente
8. Modal é fechado

## Proteção

- ✅ **Botão visível apenas para ADMINs**: O botão "Editar" só aparece se `tipo === 'ADMIN'`
- ✅ **Validação adicional ao abrir modal**: Função `iniciarEdicao()` verifica novamente se é admin antes de abrir
- ✅ **Backend protegido**: Rota `PUT /produtos/:id` usa middleware `adminAuth` que valida o token JWT
- ✅ **Alerta preventivo**: Se não-admin tentar clicar, recebe mensagem clara

## Campos disponíveis para edição

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Nome | string | ✅ Sim | Nome do produto |
| Preço | number | ✅ Sim | Preço em reais (> 0) |
| Descrição | string | ✅ Sim | Descrição do produto |
| URL Foto | string | ✅ Sim | URL da imagem do produto |
| Categoria | string | ❌ Não | Categoria do produto (novo) |

## Código-chave

### Validação de admin ao abrir modal
```typescript
function iniciarEdicao(produto:ProdutoType){
  if(tipo !== 'ADMIN'){
    alert('Apenas administradores podem editar produtos')
    return
  }
  setEditing(produto)
}
```

### Salvamento com categoria
```typescript
function salvarEdicao(event: React.FormEvent<HTMLFormElement>){
  event.preventDefault()
  if(!editing) return
  const formData = new FormData(event.currentTarget)
  const nome = formData.get('nome')
  const preco = Number(formData.get('preco'))
  const descricao = formData.get('descricao')
  const urlfoto = formData.get('urlfoto')
  const categoria = formData.get('categoria')
  api.put(`/produtos/${editing._id}`, { 
    nome, preco, descricao, urlfoto, 
    categoria: categoria || undefined 
  })
    .then(r=>{
      setProdutos(produtos.map(p=> p._id === editing._id ? r.data : p))
      setEditing(null)
    })
    .catch(showError)
}
```

### Modal com formulário
```tsx
{editing && (
  <div style={{position:'fixed', left:0, right:0, top:0, bottom:0, background:'rgba(0,0,0,0.3)'}}>
    <div style={{background:'#fff', padding:20, maxWidth:600, margin:'40px auto'}}>
      <h3>Editando: {editing.nome}</h3>
      <form onSubmit={salvarEdicao}>
        <input name="nome" defaultValue={editing.nome} />
        <input name="preco" defaultValue={editing.preco} />
        <input name="descricao" defaultValue={editing.descricao} />
        <input name="urlfoto" defaultValue={editing.urlfoto} />
        <input name="categoria" defaultValue={editing.categoria || ''} placeholder='Categoria (opcional)' />
        <button type='submit'>Salvar</button>
        <button type='button' onClick={()=> setEditing(null)}>Cancelar</button>
      </form>
    </div>
  </div>
)}
```

## Testes

### Teste local
1. Fazer login como admin (admin@local / admin123)
2. Clicar em "Editar" ao lado de um produto
3. Alterar campos (incluindo categoria)
4. Clicar em "Salvar"
5. Verificar se o produto foi atualizado na lista

### Teste de segurança
1. Fazer login como usuário comum
2. Verificar que o botão "Editar" NÃO aparece
3. Se tentar acessar manualmente (DevTools), verá alerta: "Apenas administradores podem editar produtos"

## Status
✅ Frontend: Botão e validação implementados, compilado sem erros
✅ Backend: Interface Produto atualizado com categoria opcional
✅ Proteção: Validação de admin em frontend + backend com `adminAuth` middleware
✅ Campo categoria: Adicionado como opcional em criar e editar
