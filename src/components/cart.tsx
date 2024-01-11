import { useStore } from "@nanostores/solid";
import { Show, createSignal } from "solid-js";
import { cart, removeItemFromCart, subTotal } from "../store/cart";
import styles from "./cart.module.css";
import { formatCurrency } from "../utils/utils";

const EmptyState = () => {
  return (
    <>
      <p class={styles.icon}>
        <span role="img" aria-label="hot dog">
          🌭
        </span>
      </p>
      <p>
        Your cart is empty! Adda sandwich kit or two and gice flavor a chance.
      </p>
    </>
  );
};

const CheckoutNotice = () => {
  return <p class={styles.notice}>Checkout is not implemented yet.</p>;
};

export const Cart = () => {
  const [showNotice, seShowNotice] = createSignal();
  const $subTotal = useStore(subTotal);
  const $cart = useStore(cart);

  return (
    <aside class={styles.cart}>
      <h2>Your Cart</h2>
      <Show when={Object.values($cart()).length > 0} fallback={<EmptyState />}>
        <ul class={styles.items}>
          {Object.values($cart()).map((entry: CartStore) => {
            if (!entry) {
              return null;
            }

            return (
              <li class={styles.item}>
                <span class={styles.quantity}>{entry.quantity}</span>
                <span class={styles.name}>{entry.item.title}</span>
                <span class={styles.remove}>
                  <button
                    title="remove item"
                    onClick={() => removeItemFromCart(entry.item.id)}
                  >
                    &times;
                  </button>
                  <span class={styles.price}>{entry.item.price}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div class={styles.details}>
          <p class={styles.subTotal}>
            <span class={styles.label}>Subtotal: </span>{" "}
            {formatCurrency($subTotal())}
          </p>
          <p class={styles.shipping}>
            <span class={styles.label}>Shipping: </span> <del>$10.00</del>
            <ins>FREE</ins>
          </p>
          <p class={styles.total}>
            <span class={styles.label}>Total: </span>{" "}
            {formatCurrency($subTotal())}
          </p>

          <p class={styles.checkout}>
            <button class="big-link" onClick={() => seShowNotice(true)}>
              Check Out
            </button>
          </p>
          <Show when={showNotice()}>
            <CheckoutNotice />
          </Show>
        </div>
      </Show>
    </aside>
  );
};
