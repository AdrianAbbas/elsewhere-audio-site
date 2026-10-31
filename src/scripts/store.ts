// The store hook. Every Buy / Add to cart / Download Lite button calls
// `onStoreAction` when clicked (through one delegated listener).
//
// While STORE.enabled is false, or the Moonbase script isn't loaded, it shows
// a polite "store opens soon" note instead. When Moonbase is enabled
// (see README → "Enabling Moonbase"), it calls the storefront API.
//
// TODO(moonbase): confirm the exact method names and arguments against
// Moonbase's storefront docs when connecting. The calls below follow the
// planned API: Moonbase.add_to_cart(productId) and Moonbase.checkout().
import { STORE } from '../config/store';

type StoreAction = 'checkout' | 'add-to-cart' | 'download';

interface MoonbaseStorefront {
  add_to_cart: (productId: string, options?: Record<string, unknown>) => unknown;
  checkout: (options?: Record<string, unknown>) => unknown;
}

declare global {
  interface Window { Moonbase?: MoonbaseStorefront }
}

export async function onStoreAction(action: StoreAction, productId: string, button: HTMLElement) {
  const moonbase = window.Moonbase;
  if (!STORE.enabled || !moonbase) {
    announce(button, 'The store opens soon. Thanks for your patience.');
    return;
  }
  switch (action) {
    case 'add-to-cart':
      await moonbase.add_to_cart(productId);
      break;
    case 'checkout':
      await moonbase.add_to_cart(productId);
      await moonbase.checkout();
      break;
    case 'download':
      // Free product: add it and check out (no payment needed) so the
      // customer receives a licence and download link from Moonbase.
      await moonbase.add_to_cart(productId);
      await moonbase.checkout();
      break;
  }
}

// One small live note per button, read out by screen readers.
function announce(button: HTMLElement, message: string) {
  let note = button.nextElementSibling as HTMLElement | null;
  if (!note?.matches('.store-note')) {
    note = document.createElement('span');
    note.className = 'store-note';
    note.setAttribute('role', 'status');
    button.after(note);
  }
  note.textContent = message;
}

// Modules run once per page, so this listener is only ever added once.
document.addEventListener('click', (e) => {
  const button = (e.target as Element).closest<HTMLElement>('[data-store-action]');
  if (!button) return;
  onStoreAction(button.dataset.storeAction as StoreAction, button.dataset.productId ?? '', button);
});

// The customer portal on /account. Moonbase renders it into the element
// marked [data-moonbase-account] once the store is enabled.
// TODO(moonbase): replace the call below with Moonbase's documented way to
// embed or open the customer portal (sign in, licences, downloads).
export function mountAccountPortal(el: HTMLElement) {
  const moonbase = window.Moonbase as (MoonbaseStorefront & { open_account?: (target?: HTMLElement) => unknown }) | undefined;
  if (!STORE.enabled || !moonbase?.open_account) return false;
  moonbase.open_account(el);
  el.dataset.mounted = 'true';
  return true;
}
