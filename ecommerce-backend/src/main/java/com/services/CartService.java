package com.services;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Cart;
import com.domain.CartItem;
import com.domain.Order;
import com.domain.OrderItem;
import com.domain.Product;
import com.enums.OrderStatus;
import com.exceptions.CartNotFoundException;
import com.exceptions.UserUnauthorizedException;
import com.exceptions.InsufficientStockException;
import com.exceptions.ProductNotFoundException;
import com.repositories.CartItemRepository;
import com.repositories.CartRepository;
import com.repositories.ClientRepository;
import com.repositories.OrderRepository;
import com.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private OrderRepository orderRepository;

	public void addItemToCart(Long clientId, Long productId, int quantity) {
		clientRepository.findById(clientId)
				.orElseThrow(() -> new UserUnauthorizedException("Cliente não encontrado"));

		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho do cliente não encontrado"));

		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));

		CartItem existsItemToCart = cart.getCartItems().stream()
				.filter(item -> item.getProduct().getId().equals(productId)).findFirst().orElse(null);

		BigDecimal totalPrice = BigDecimal.ZERO;

		if (existsItemToCart != null) {
			if (quantity <= product.getQuantity()) {
				existsItemToCart.setQuantity(quantity);
			} else {
				throw new InsufficientStockException("Quantidade não disponível em estoque");
			}
			totalPrice = existsItemToCart.getUnitPrice().multiply(BigDecimal.valueOf(quantity));

			existsItemToCart.setTotalPrice(totalPrice);
		} else {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);

			if (quantity <= product.getQuantity()) {
				cartItem.setQuantity(quantity);
			} else {
				throw new InsufficientStockException("Quantidade não disponível em estoque");
			}

			cartItem.setUnitPrice(product.getPrice());
			totalPrice = cartItem.getUnitPrice().multiply(BigDecimal.valueOf(quantity));

			cartItem.setTotalPrice(totalPrice);

			cart.getCartItems().add(cartItem);
		}

		cartRepository.save(cart);
	}

	public Cart findByClientId(Long clientId) {
		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho não encontrado"));
		return cart;
	}

	@Transactional
	public Cart removeProductByCartItems(Long clientId, Long productId) {
		cartItemRepository.deleteByProductId(productId);
		return findByClientId(clientId);
	}

	/* ADICIONADO */
	@Transactional
	public Cart updateItemFromCart(Long clientId, Long productId, int quantity) {
		// Validação: A quantidade precisa ser maior que zero
		if (quantity < 1) {
			throw new IllegalArgumentException("A quantidade deve ser pelo menos 1");
		}

		// Encontrar o carrinho do cliente
		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho não encontrado para o cliente"));

		// Encontrar o item no carrinho
		CartItem cartItem = cartItemRepository.findByCartClientIdAndProductId(clientId, productId)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado no carrinho"));

		// Obter informações do produto
		Product product = cartItem.getProduct();

		// Validação: Verificar se a quantidade desejada está dentro do estoque
		// disponível
		if (quantity > product.getQuantity()) {
			throw new InsufficientStockException("Estoque insuficiente para o produto: " + product.getProductName());
		}

		// Atualizar a quantidade do item no carrinho
		cartItem.setQuantity(quantity);

		// Atualizar o preço total do item
		BigDecimal itemTotalPrice = product.getPrice().multiply(BigDecimal.valueOf(quantity));
		cartItem.setTotalPrice(itemTotalPrice);

		cartItemRepository.save(cartItem);

		// Atualizar o total do carrinho
		BigDecimal totalCartPrice = cart.getCartItems().stream()
				.map(CartItem::getTotalPrice)
				.reduce(BigDecimal.ZERO, BigDecimal::add);

		cartItem.setTotalPrice(totalCartPrice);
		cartRepository.save(cart);

		// Retornar o carrinho atualizado
		return cart;
	}

	@Transactional
	public void buyItemsFromCart(Long clientId) {
		clientRepository.findById(clientId)
				.orElseThrow(() -> new UserUnauthorizedException("Cliente não encontrado"));

		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho não encontrado"));

		Order order = new Order();
		order.setClient(cart.getClient());
		order.setDate(new Date());
		order.setOrderStatus(OrderStatus.SOLICITADO);

		BigDecimal totalValue = BigDecimal.ZERO;
		for (CartItem cartItem : cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setProduct(cartItem.getProduct());

			Product product = productRepository.findById(cartItem.getProduct().getId())
					.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));

			if (cartItem.getQuantity() <= product.getQuantity()) {
				orderItem.setQuantity(cartItem.getQuantity());
			} else {
				throw new InsufficientStockException("Quantidade não disponível em estoque");
			}

			orderItem.setUnitPrice(cartItem.getUnitPrice());
			orderItem.setTotalPrice(cartItem.getTotalPrice());
			orderItem.setOrder(order);

			order.getOrderItems().add(orderItem);

			totalValue = totalValue.add(cartItem.getTotalPrice());
		}

		order.setTotalValue(totalValue);

		orderRepository.save(order);

		for (CartItem cartItem : cart.getCartItems()) {
			Product updateProduct = productRepository.findById(cartItem.getProduct().getId())
					.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));
			updateProduct.setQuantity(updateProduct.getQuantity() - cartItem.getQuantity());
			productRepository.save(updateProduct);
		}

		cartItemRepository.deleteAllByCartId(cart.getId());
	}

	public void updateItemQuantity(Long id, Long productId, int quantity) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'updateItemQuantity'");
	}
}
