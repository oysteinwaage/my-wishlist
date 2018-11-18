export const BRUKER_LOGGET_INN = 'BRUKER_LOGGET_INN';
export function brukerLoggetInn(user) {
  return {
    type: BRUKER_LOGGET_INN,
    user,
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

export const TOGGLE_VIS_OPPRETT_BRUKER = 'TOGGLE_VIS_OPPRETT_BRUKER';
export function toggleVisOpprettBruker() {
  return {
    type: TOGGLE_VIS_OPPRETT_BRUKER,
  };
}