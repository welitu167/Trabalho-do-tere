# 🎨 CSS Melhorado com Imagens

## Imagens Integradas

### 1. Camisa (Roxo/Indigo)
```
Link: https://images.tcdn.com.br/img/img_prod/1205536/camisa_vasco_da_gama_i_2024_2025_kappa_masculina_original_631_1_769ab8914e20a519ab1820f2433c0ee8.jpg
Variável CSS: --img-camisa
```

**Onde aparece:**
- Background sutil no header (canto direito, opacity: 0.08)
- Banner destaque roxo com watermark (opacity: 0.15)

### 2. Caneca (Verde)
```
Link: https://images.tcdn.com.br/img/img_prod/1006590/caneca_porcelana_vasco_urban_360ml_2807_1_364ddf75e35185ae3978bcbdfec33486_20221214165715.jpg
Variável CSS: --img-caneca
```

**Onde aparece:**
- Background sutil na seção do carrinho (canto inferior esquerdo, opacity: 0.06)
- Banner alternativo verde com watermark (opacity: 0.15)

### 3. Boné (Laranja/Warning)
```
Link: https://static.ativaesportes.com.br/public/ativaesportes/imagens/produtos/bone-new-era-940-vasco-unissex-nei22bon161-c002-641d319563d20.jpg
Variável CSS: --img-bone
```

**Onde aparece:**
- Background sutil na seção de produtos (canto superior direito, opacity: 0.07)
- Banner alternativo laranja com watermark (opacity: 0.15)

## Efeitos Decorativos

### Header (Camisa)
```css
header::after {
  background: var(--img-camisa) no-repeat center/contain;
  opacity: 0.08;
}
```
- Imagem discreta no fundo
- Não interfere com conteúdo
- Elegante e profissional

### Carrinho (Caneca)
```css
#root > div:nth-of-type(5)::before {
  background: var(--img-caneca) no-repeat center/contain;
  opacity: 0.06;
}
```
- Watermark muito sutil
- Adiciona personalidade
- Tema coordenado

### Produtos (Boné)
```css
.container-produtos::after {
  background: var(--img-bone) no-repeat center/contain;
  opacity: 0.07;
}
```
- Decoração background dos cards
- Muito transparente para não distrair
- Toca o canto superior direito

## Banners Disponíveis

### Banner Roxo (Camisa)
```html
<div class="banner-destaque">
  <div class="banner-destaque-conteudo">
    <h2>✨ Bem-vindo à Loja Premium</h2>
    <p>Descubra camisetas de alta qualidade com os melhores preços</p>
  </div>
</div>
```

**Estilo:**
- Gradiente roxo/indigo
- Watermark de camisa
- Profissional

### Banner Verde (Caneca)
```html
<div class="banner-destaque banner-caneca">
  <div class="banner-destaque-conteudo">
    <h2>🎉 Ofertas Especiais</h2>
    <p>Confira nossas canecas e produtos exclusivos!</p>
  </div>
</div>
```

**Estilo:**
- Gradiente verde
- Watermark de caneca
- Vibrante e atrativo

### Banner Laranja (Boné)
```html
<div class="banner-destaque banner-bone">
  <div class="banner-destaque-conteudo">
    <h2>👒 Coleção de Acessórios</h2>
    <p>Bonés e mais! Complemente seu estilo!</p>
  </div>
</div>
```

**Estilo:**
- Gradiente laranja/amarelo
- Watermark de boné
- Energético e chamativo

## Customizações Rápidas

### Trocar Imagem da Camisa
```css
:root {
  --img-camisa: url('NOVO_LINK');
}
```

### Trocar Imagem da Caneca
```css
:root {
  --img-caneca: url('NOVO_LINK');
}
```

### Trocar Imagem do Boné
```css
:root {
  --img-bone: url('NOVO_LINK');
}
```

### Ajustar Opacidade
```css
header::after {
  opacity: 0.12; /* aumentar para mais visível */
}
```

## Build Info
✅ CSS: 8.93 kB (2.62 kB gzip)
✅ 3 imagens integradas
✅ 3 banners disponíveis
✅ Sem erros de compilação
✅ Totalmente responsivo
✅ Performance mantida

## Resultado Visual

### Desktop
- Header com camisa sutil no fundo
- Produtos com boné discretamente
- Carrinho com caneca personalizada
- Banners com gradientes e watermarks
- Cards de produtos bem espaçados
- Efeitos hover suaves

### Mobile
- Tudo responsivo e legível
- Imagens adaptam ao tamanho
- Sem overflow ou distorções
- Excelente UX

## Como Usar

1. **Adicionar um banner roxo (camisa):**
```tsx
<div className="banner-destaque">
  <div className="banner-destaque-conteudo">
    <h2>Título</h2>
    <p>Descrição</p>
  </div>
</div>
```

2. **Adicionar um banner verde (caneca):**
```tsx
<div className="banner-destaque banner-caneca">
  <div className="banner-destaque-conteudo">
    <h2>Título</h2>
    <p>Descrição</p>
  </div>
</div>
```

3. **Adicionar um banner laranja (boné):**
```tsx
<div className="banner-destaque banner-bone">
  <div className="banner-destaque-conteudo">
    <h2>Título</h2>
    <p>Descrição</p>
  </div>
</div>
```

4. **Adicionar mais imagens:**
- Adicione nova variável em `:root`
- Use em pseudo-elementos `::before` ou `::after`
- Customize opacidade conforme necessário
- Crie novas classes de banner se necessário

