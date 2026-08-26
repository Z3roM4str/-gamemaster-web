'use client';

import { useMemo, useSyncExternalStore } from 'react';
import type { Game } from '@/app/data/catalog';
import { buildQuoteMessage, toWhatsApp } from '@/lib/contact';

type SelectedGame = Pick<Game, 'id' | 'title' | 'platform'>;

type ExperienceState = {
  selectedGames: SelectedGame[];
  interest: string;
  previewSlug: string | null;
};

const initialState: ExperienceState = {
  selectedGames: [],
  interest: '',
  previewSlug: null,
};

let currentState = initialState;
const listeners = new Set<() => void>();

function emit(nextState: ExperienceState) {
  currentState = nextState;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentState;
}

function getServerSnapshot() {
  return initialState;
}

function setInterest(interest: string) {
  emit({ ...currentState, interest });
}

function toggleGame(game: SelectedGame) {
  const selected = currentState.selectedGames.some((item) => item.id === game.id);
  emit({
    ...currentState,
    selectedGames: selected
      ? currentState.selectedGames.filter((item) => item.id !== game.id)
      : [...currentState.selectedGames, game],
  });
}

function removeGame(id: string) {
  emit({ ...currentState, selectedGames: currentState.selectedGames.filter((item) => item.id !== id) });
}

function openPreview(previewSlug: string) {
  emit({ ...currentState, previewSlug });
}

function closePreview() {
  emit({ ...currentState, previewSlug: null });
}

export function useExperience() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const quoteMessage = useMemo(
    () => buildQuoteMessage(state.interest, state.selectedGames.map((game) => game.title)),
    [state.interest, state.selectedGames],
  );

  return {
    ...state,
    selectedCount: state.selectedGames.length,
    quoteMessage,
    whatsappUrl: toWhatsApp(quoteMessage),
    setInterest,
    toggleGame,
    removeGame,
    isSelected: (id: string) => state.selectedGames.some((game) => game.id === id),
    openPreview,
    closePreview,
  };
}
