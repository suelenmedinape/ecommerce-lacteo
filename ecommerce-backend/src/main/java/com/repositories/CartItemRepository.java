package com.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.domain.CartItem;

import jakarta.transaction.Transactional;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	void deleteByProductId(Long productId);
 
	@Modifying
	@Transactional
	@Query("DELETE FROM CartItem c WHERE c.cart.id = :cartId")
	void deleteAllByCartId(@Param("cartId") Long cartId);

	Optional<CartItem> findByCartClientIdAndProductId(Long clientId, Long productId);

	// Add this method to update quantity
    @Modifying
    @Transactional
    @Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.cart.id = :cartId AND c.product.id = :productId")
    int updateQuantity(@Param("cartId") Long cartId, @Param("productId") Long productId, @Param("quantity") int quantity);
}
