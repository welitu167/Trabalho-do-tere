import usuarioController from "../usuarios/usuario.controller.js";
import produtoController from "../produtos/produto.controller.js";
import carrinhoController from "../carrinho/carrinho.controller.js";
import { Router } from "express";
import Auth from '../middleware/auth.js'
import { adminAuth } from '../middleware/adm.js'

const rotasAutenticadas = Router();

// Rotas de usuários
rotasAutenticadas.get("/usuarios", Auth, usuarioController.listar);
// admin delete user
rotasAutenticadas.delete("/usuarios/:id", Auth, adminAuth, usuarioController.remover);
// admin explicit routes (aliases) for clarity
rotasAutenticadas.delete('/admin/usuario/:id', Auth, adminAuth, usuarioController.remover);
// admin list all carts
rotasAutenticadas.get('/admin/carrinhos', Auth, adminAuth, carrinhoController.listarTodos);

// ============================================
// ROTAS DE PRODUTOS
// ============================================
// USER: Pode apenas LISTAR (GET)
// ADMIN: Pode CRIAR (POST), EDITAR (PUT), DELETAR (DELETE)
// ============================================

// Listar produtos (USER e ADMIN)
rotasAutenticadas.get("/produtos", Auth, produtoController.listar);

// Criar produto (ADMIN apenas)
rotasAutenticadas.post("/produtos", Auth, adminAuth, produtoController.adicionar);

// Editar produto (ADMIN apenas)
rotasAutenticadas.put('/produtos/:id', Auth, adminAuth, produtoController.atualizar);

// Deletar produto (ADMIN apenas)
rotasAutenticadas.delete('/produtos/:id', Auth, adminAuth, produtoController.remover);

// ============================================
// ROTAS DE CARRINHO (USER e ADMIN)
// ============================================

// Adicionar item ao carrinho
rotasAutenticadas.post("/adicionarItem", Auth, carrinhoController.adicionarItem);

// Obter carrinho do usuário atual
rotasAutenticadas.get("/carrinho", Auth, carrinhoController.listar);

// Atualizar quantidade de item no carrinho
rotasAutenticadas.put('/carrinho/:produtoId/quantidade', Auth, carrinhoController.atualizarQuantidade);
rotasAutenticadas.patch('/carrinho/quantidade', Auth, carrinhoController.atualizarQuantidade);

// Remover item do carrinho
rotasAutenticadas.delete('/carrinho/item', Auth, carrinhoController.removerItem);
rotasAutenticadas.delete('/carrinho/:itemId', Auth, carrinhoController.removerItem);

// Esvaziar carrinho
rotasAutenticadas.delete('/carrinho', Auth, carrinhoController.remover);

// Admin: Remover carrinho de qualquer usuário
rotasAutenticadas.delete('/admin/carrinho/:id', Auth, adminAuth, carrinhoController.remover);

export default rotasAutenticadas;