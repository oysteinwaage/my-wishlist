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