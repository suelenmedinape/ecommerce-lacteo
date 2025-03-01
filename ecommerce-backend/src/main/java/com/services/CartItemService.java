package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.CartItem;
import com.repositories.CartItemRepository;

@Service
public class CartItemService {

	@Autowired
	private CartItemRepository cartItemRepository;

	public void updateItemQuantity(Long clientId, Long productId, int quantity) {
		CartItem cartItem = cartItemRepository.findByCartClientIdAndProductId(clientId, productId)
			.orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));
	
		cartItem.setQuantity(quantity);
		cartItemRepository.save(cartItem);
	}
	
} 
