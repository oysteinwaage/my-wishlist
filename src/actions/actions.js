export const TEST_ACTION = 'TEST_ACTION';
export function testAction(email, navn) {
  return {
    type: TEST_ACTION,
    data: {
      email,
      navn,
    },
  };
}

export const BRUKER_LOGGET_INN = 'BRUKER_LOGGET_INN';
export function brukerLoggetInn(bruker) {
  return {
    type: BRUKER_LOGGET_INN,
    data: {
      bruker: bruker.user,
    },
  };
}

export const MOTTA_MIN_ONSKELISTE = 'MOTTA_MIN_ONSKELISTE';
export function mottaMinOnskeliste(nyListe) {
  return {
    type: MOTTA_MIN_ONSKELISTE,
    nyListe,
  };
}

export const TOGGLE_LENKE_DIALOG = 'TOGGLE_LENKE_DIALOG';
export function toggleLenkeDialog(index) {
  return {
    type: TOGGLE_LENKE_DIALOG,
    index,
  };
}

export const ENDRE_HEADER_TEKST = 'ENDRE_HEADER_TEKST';
export function endreHeaderTekst(nyTekst) {
  return {
    type: ENDRE_HEADER_TEKST,
    nyTekst,
  };
}